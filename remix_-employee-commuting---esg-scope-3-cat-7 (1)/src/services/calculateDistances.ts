import dotenv from "dotenv";
dotenv.config(); // Loads .env into process.env

import { MongoClient } from "mongodb";

interface SubArea {
  subArea: string;
  lat: number;
  lng: number;
}

const OSRM_CAR = "http://localhost:5002";
const OSRM_FOOT = "http://localhost:5001";
const WALK_MAX_KM = 3; // adjust based on your answer above

async function getOsrmDistanceKm(
  baseUrl: string,
  from: SubArea,
  to: SubArea
): Promise<number | null> {
  const url = `${baseUrl}/route/v1/driving/${from.lng},${from.lat};${to.lng},${to.lat}?overview=false`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.code !== "Ok") return null;
    return data.routes[0].distance / 1000;
  } catch (err) {
    console.error(`OSRM error for ${from.subArea} -> ${to.subArea}:`, err);
    return null;
  }
}

async function buildDistanceTable() {
  const client = new MongoClient(process.env.MONGO_URL!);
  await client.connect();
  const db = client.db("employeescommuting");

  const subAreas: SubArea[] = (await db
    .collection("subAreas")
    .find({})
    .toArray()) as any;

  const distanceCollection = db.collection("subAreaDistances");

  for (let i = 0; i < subAreas.length; i++) {
    for (let j = 0; j < subAreas.length; j++) {
      const from = subAreas[i];
      const to = subAreas[j];

      let carKm: number | null;
      let walkKm: number | null;

      if (i === j) {
        carKm = 0;
        walkKm = 0; // or a nominal value, e.g. 0.5, if you prefer
      } else {
        [carKm, walkKm] = await Promise.all([
          getOsrmDistanceKm(OSRM_CAR, from, to),
          getOsrmDistanceKm(OSRM_FOOT, from, to),
        ]);
        if (walkKm !== null && walkKm > WALK_MAX_KM) {
          walkKm = null; // unrealistic walking distance, exclude as a mode
        }
      }

      await distanceCollection.updateOne(
        { fromArea: from.subArea, toArea: to.subArea },
        { $set: { "distanceKm.car": carKm, "distanceKm.walk": walkKm } },
        { upsert: true }
      );

      console.log(`${from.subArea} -> ${to.subArea}: car=${carKm}km, walk=${walkKm}km`);
    }
  }

  console.log("Done.");
  await client.close();
}

buildDistanceTable();