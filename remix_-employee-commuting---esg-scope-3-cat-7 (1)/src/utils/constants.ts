import React from 'react';
import { DistrictConfig, GeodataItem, CustomWorkSite } from '../types';

export interface AreaInfo {
  name: string;
  nameZH: string;
  fullName: string;
  district: string;
  region: string;
}

export interface AreaDistrictGroup {
  district: string;
  areas: AreaInfo[];
}

export interface AreaRegionGroup {
  region: string;
  districts: AreaDistrictGroup[];
}

export const AREA_HIERARCHY: AreaRegionGroup[] = [
  {
    region: "Hong Kong Island (香港島)",
    districts: [
      {
        district: "Central & Western (中西區)",
        areas: [
          { name: "Central", nameZH: "中環", fullName: "Central (中環)", district: "Central & Western (中西區)", region: "Hong Kong Island (香港島)" },
          { name: "Admiralty", nameZH: "金鐘", fullName: "Admiralty (金鐘)", district: "Central & Western (中西區)", region: "Hong Kong Island (香港島)" },
          { name: "Sheung Wan", nameZH: "上環", fullName: "Sheung Wan (上環)", district: "Central & Western (中西區)", region: "Hong Kong Island (香港島)" },
          { name: "Sai Ying Pun", nameZH: "西營盤", fullName: "Sai Ying Pun (西營盤)", district: "Central & Western (中西區)", region: "Hong Kong Island (香港島)" },
          { name: "Kennedy Town", nameZH: "堅尼地城", fullName: "Kennedy Town (堅尼地城)", district: "Central & Western (中西區)", region: "Hong Kong Island (香港島)" },
          { name: "Mid-Levels", nameZH: "半山", fullName: "Mid-Levels (半山)", district: "Central & Western (中西區)", region: "Hong Kong Island (香港島)" },
          { name: "The Peak", nameZH: "山頂", fullName: "The Peak (山頂)", district: "Central & Western (中西區)", region: "Hong Kong Island (香港島)" },
        ]
      },
      {
        district: "Wan Chai (灣仔區)",
        areas: [
          { name: "Wan Chai", nameZH: "灣仔", fullName: "Wan Chai (灣仔)", district: "Wan Chai (灣仔區)", region: "Hong Kong Island (香港島)" },
          { name: "Causeway Bay", nameZH: "銅鑼灣", fullName: "Causeway Bay (銅鑼灣)", district: "Wan Chai (灣仔區)", region: "Hong Kong Island (香港島)" },
          { name: "Happy Valley", nameZH: "跑馬地", fullName: "Happy Valley (跑馬地)", district: "Wan Chai (灣仔區)", region: "Hong Kong Island (香港島)" },
          { name: "Tai Hang", nameZH: "大坑", fullName: "Tai Hang (大坑)", district: "Wan Chai (灣仔區)", region: "Hong Kong Island (香港島)" },
        ]
      },
      {
        district: "Eastern (東區)",
        areas: [
          { name: "North Point", nameZH: "北角", fullName: "North Point (北角)", district: "Eastern (東區)", region: "Hong Kong Island (香港島)" },
          { name: "Quarry Bay", nameZH: "鰂魚涌", fullName: "Quarry Bay (鰂魚涌)", district: "Eastern (東區)", region: "Hong Kong Island (香港島)" },
          { name: "Tai Koo", nameZH: "太古", fullName: "Tai Koo (太古)", district: "Eastern (東區)", region: "Hong Kong Island (香港島)" },
          { name: "Sai Wan Ho", nameZH: "西灣河", fullName: "Sai Wan Ho (西灣河)", district: "Eastern (東區)", region: "Hong Kong Island (香港島)" },
          { name: "Shau Kei Wan", nameZH: "筲箕灣", fullName: "Shau Kei Wan (筲箕灣)", district: "Eastern (東區)", region: "Hong Kong Island (香港島)" },
          { name: "Chai Wan", nameZH: "柴灣", fullName: "Chai Wan (柴灣)", district: "Eastern (東區)", region: "Hong Kong Island (香港島)" },
          { name: "Siu Sai Wan", nameZH: "小西灣", fullName: "Siu Sai Wan (小西灣)", district: "Eastern (東區)", region: "Hong Kong Island (香港島)" },
        ]
      },
      {
        district: "Southern (南區)",
        areas: [
          { name: "Aberdeen", nameZH: "香港仔", fullName: "Aberdeen (香港仔)", district: "Southern (南區)", region: "Hong Kong Island (香港島)" },
          { name: "Wong Chuk Hang", nameZH: "黃竹坑", fullName: "Wong Chuk Hang (黃竹坑)", district: "Southern (南區)", region: "Hong Kong Island (香港島)" },
          { name: "Ap Lei Chau", nameZH: "鴨脷洲", fullName: "Ap Lei Chau (鴨脷洲)", district: "Southern (南區)", region: "Hong Kong Island (香港島)" },
          { name: "Pok Fu Lam", nameZH: "薄扶林", fullName: "Pok Fu Lam (薄扶林)", district: "Southern (南區)", region: "Hong Kong Island (香港島)" },
          { name: "Repulse Bay", nameZH: "淺水灣", fullName: "Repulse Bay (淺水灣)", district: "Southern (南區)", region: "Hong Kong Island (香港島)" },
          { name: "Stanley", nameZH: "赤柱", fullName: "Stanley (赤柱)", district: "Southern (南區)", region: "Hong Kong Island (香港島)" },
        ]
      }
    ]
  },
  {
    region: "Kowloon (九龍)",
    districts: [
      {
        district: "Yau Tsim Mong (油尖旺區)",
        areas: [
          { name: "Tsim Sha Tsui", nameZH: "尖沙咀", fullName: "Tsim Sha Tsui (尖沙咀)", district: "Yau Tsim Mong (油尖旺區)", region: "Kowloon (九龍)" },
          { name: "Jordan", nameZH: "佐敦", fullName: "Jordan (佐敦)", district: "Yau Tsim Mong (油尖旺區)", region: "Kowloon (九龍)" },
          { name: "Yau Ma Tei", nameZH: "油麻地", fullName: "Yau Ma Tei (油麻地)", district: "Yau Tsim Mong (油尖旺區)", region: "Kowloon (九龍)" },
          { name: "Mong Kok", nameZH: "旺角", fullName: "Mong Kok (旺角)", district: "Yau Tsim Mong (油尖旺區)", region: "Kowloon (九龍)" },
          { name: "Tai Kok Tsui", nameZH: "大角咀", fullName: "Tai Kok Tsui (大角咀)", district: "Yau Tsim Mong (油尖旺區)", region: "Kowloon (九龍)" },
        ]
      },
      {
        district: "Sham Shui Po (深水埗區)",
        areas: [
          { name: "Sham Shui Po", nameZH: "深水埗", fullName: "Sham Shui Po (深水埗)", district: "Sham Shui Po (深水埗區)", region: "Kowloon (九龍)" },
          { name: "Cheung Sha Wan", nameZH: "長沙灣", fullName: "Cheung Sha Wan (長沙灣)", district: "Sham Shui Po (深水埗區)", region: "Kowloon (九龍)" },
          { name: "Lai Chi Kok", nameZH: "荔枝角", fullName: "Lai Chi Kok (荔枝角)", district: "Sham Shui Po (深水埗區)", region: "Kowloon (九龍)" },
          { name: "Mei Foo", nameZH: "美孚", fullName: "Mei Foo (美孚)", district: "Sham Shui Po (深水埗區)", region: "Kowloon (九龍)" },
          { name: "Shek Kip Mei", nameZH: "石硤尾", fullName: "Shek Kip Mei (石硤尾)", district: "Sham Shui Po (深水埗區)", region: "Kowloon (九龍)" },
        ]
      },
      {
        district: "Kowloon City (九龍城區)",
        areas: [
          { name: "Hung Hom", nameZH: "紅磡", fullName: "Hung Hom (紅磡)", district: "Kowloon City (九龍城區)", region: "Kowloon (九龍)" },
          { name: "Whampoa", nameZH: "黃埔", fullName: "Whampoa (黃埔)", district: "Kowloon City (九龍城區)", region: "Kowloon (九龍)" },
          { name: "Ho Man Tin", nameZH: "何文田", fullName: "Ho Man Tin (何文田)", district: "Kowloon City (九龍城區)", region: "Kowloon (九龍)" },
          { name: "To Kwa Wan", nameZH: "土瓜灣", fullName: "To Kwa Wan (土瓜灣)", district: "Kowloon City (九龍城區)", region: "Kowloon (九龍)" },
          { name: "Kai Tak", nameZH: "啟德", fullName: "Kai Tak (啟德)", district: "Kowloon City (九龍城區)", region: "Kowloon (九龍)" },
          { name: "Kowloon Tong", nameZH: "九龍塘", fullName: "Kowloon Tong (九龍塘)", district: "Kowloon City (九龍城區)", region: "Kowloon (九龍)" },
          { name: "Kowloon City", nameZH: "九龍城", fullName: "Kowloon City (九龍城)", district: "Kowloon City (九龍城區)", region: "Kowloon (九龍)" },
        ]
      },
      {
        district: "Wong Tai Sin (黃大仙區)",
        areas: [
          { name: "Wong Tai Sin", nameZH: "黃大仙", fullName: "Wong Tai Sin (黃大仙)", district: "Wong Tai Sin (黃大仙區)", region: "Kowloon (九龍)" },
          { name: "Diamond Hill", nameZH: "鑽石山", fullName: "Diamond Hill (鑽石山)", district: "Wong Tai Sin (黃大仙區)", region: "Kowloon (九龍)" },
          { name: "Choi Hung", nameZH: "彩虹", fullName: "Choi Hung (彩虹)", district: "Wong Tai Sin (黃大仙區)", region: "Kowloon (九龍)" },
          { name: "Lok Fu", nameZH: "樂富", fullName: "Lok Fu (樂富)", district: "Wong Tai Sin (黃大仙區)", region: "Kowloon (九龍)" },
          { name: "Tsz Wan Shan", nameZH: "慈雲山", fullName: "Tsz Wan Shan (慈雲山)", district: "Wong Tai Sin (黃大仙區)", region: "Kowloon (九龍)" },
        ]
      },
      {
        district: "Kwun Tong (觀塘區)",
        areas: [
          { name: "Kwun Tong", nameZH: "觀塘", fullName: "Kwun Tong (觀塘)", district: "Kwun Tong (觀塘區)", region: "Kowloon (九龍)" },
          { name: "Kowloon Bay", nameZH: "九龍灣", fullName: "Kowloon Bay (九龍灣)", district: "Kwun Tong (觀塘區)", region: "Kowloon (九龍)" },
          { name: "Ngau Tau Kok", nameZH: "牛頭角", fullName: "Ngau Tau Kok (牛頭角)", district: "Kwun Tong (觀塘區)", region: "Kowloon (九龍)" },
          { name: "Lam Tin", nameZH: "藍田", fullName: "Lam Tin (藍田)", district: "Kwun Tong (觀塘區)", region: "Kowloon (九龍)" },
          { name: "Yau Tong", nameZH: "油塘", fullName: "Yau Tong (油塘)", district: "Kwun Tong (觀塘區)", region: "Kowloon (九龍)" },
          { name: "Sau Mau Ping", nameZH: "秀茂坪", fullName: "Sau Mau Ping (秀茂坪)", district: "Kwun Tong (觀塘區)", region: "Kowloon (九龍)" },
        ]
      }
    ]
  },
  {
    region: "New Territories (新界)",
    districts: [
      {
        district: "Kwai Tsing (葵青區)",
        areas: [
          { name: "Kwai Chung", nameZH: "葵涌", fullName: "Kwai Chung (葵涌)", district: "Kwai Tsing (葵青區)", region: "New Territories (新界)" },
          { name: "Tsing Yi", nameZH: "青衣", fullName: "Tsing Yi (青衣)", district: "Kwai Tsing (葵青區)", region: "New Territories (新界)" },
          { name: "Lai King", nameZH: "荔景", fullName: "Lai King (荔景)", district: "Kwai Tsing (葵青區)", region: "New Territories (新界)" },
        ]
      },
      {
        district: "Tsuen Wan (荃灣區)",
        areas: [
          { name: "Tsuen Wan", nameZH: "荃灣", fullName: "Tsuen Wan (荃灣)", district: "Tsuen Wan (荃灣區)", region: "New Territories (新界)" },
          { name: "Sham Tseng", nameZH: "深井", fullName: "Sham Tseng (深井)", district: "Tsuen Wan (荃灣區)", region: "New Territories (新界)" },
          { name: "Ma Wan", nameZH: "馬灣", fullName: "Ma Wan (馬灣)", district: "Tsuen Wan (荃灣區)", region: "New Territories (新界)" },
        ]
      },
      {
        district: "Sha Tin (沙田區)",
        areas: [
          { name: "Sha Tin", nameZH: "沙田", fullName: "Sha Tin (沙田)", district: "Sha Tin (沙田區)", region: "New Territories (新界)" },
          { name: "Tai Wai", nameZH: "大圍", fullName: "Tai Wai (大圍)", district: "Sha Tin (沙田區)", region: "New Territories (新界)" },
          { name: "Fo Tan", nameZH: "火炭", fullName: "Fo Tan (火炭)", district: "Sha Tin (沙田區)", region: "New Territories (新界)" },
          { name: "Shek Mun", nameZH: "石門", fullName: "Shek Mun (石門)", district: "Sha Tin (沙田區)", region: "New Territories (新界)" },
          { name: "Ma Liu Shui", nameZH: "馬料水", fullName: "Ma Liu Shui (馬料水)", district: "Sha Tin (沙田區)", region: "New Territories (新界)" },
        ]
      },
      {
        district: "Tai Po (大埔區)",
        areas: [
          { name: "Tai Po", nameZH: "大埔", fullName: "Tai Po (大埔)", district: "Tai Po (大埔區)", region: "New Territories (新界)" },
          { name: "Tai Wo", nameZH: "太和", fullName: "Tai Wo (太和)", district: "Tai Po (大埔區)", region: "New Territories (新界)" },
          { name: "Pak Shek Kok", nameZH: "白石角", fullName: "Pak Shek Kok (白石角)", district: "Tai Po (大埔區)", region: "New Territories (新界)" },
        ]
      },
      {
        district: "North District (北區)",
        areas: [
          { name: "Fanling", nameZH: "粉嶺", fullName: "Fanling (粉嶺)", district: "North District (北區)", region: "New Territories (新界)" },
          { name: "Sheung Shui", nameZH: "上水", fullName: "Sheung Shui (上水)", district: "North District (北區)", region: "New Territories (新界)" },
          { name: "Sha Tau Kok", nameZH: "沙頭角", fullName: "Sha Tau Kok (沙頭角)", district: "North District (北區)", region: "New Territories (新界)" },
        ]
      },
      {
        district: "Yuen Long (元朗區)",
        areas: [
          { name: "Yuen Long", nameZH: "元朗", fullName: "Yuen Long (元朗)", district: "Yuen Long (元朗區)", region: "New Territories (新界)" },
          { name: "Tin Shui Wai", nameZH: "天水圍", fullName: "Tin Shui Wai (天水圍)", district: "Yuen Long (元朗區)", region: "New Territories (新界)" },
          { name: "Hung Shui Kiu", nameZH: "洪水橋", fullName: "Hung Shui Kiu (洪水橋)", district: "Yuen Long (元朗區)", region: "New Territories (新界)" },
          { name: "Kam Tin", nameZH: "錦田", fullName: "Kam Tin (錦田)", district: "Yuen Long (元朗區)", region: "New Territories (新界)" },
        ]
      },
      {
        district: "Tuen Mun (屯門區)",
        areas: [
          { name: "Tuen Mun", nameZH: "屯門", fullName: "Tuen Mun (屯門)", district: "Tuen Mun (屯門區)", region: "New Territories (新界)" },
          { name: "Siu Hong", nameZH: "兆康", fullName: "Siu Hong (兆康)", district: "Tuen Mun (屯門區)", region: "New Territories (新界)" },
          { name: "Gold Coast", nameZH: "黃金海岸", fullName: "Gold Coast (黃金海岸)", district: "Tuen Mun (屯門區)", region: "New Territories (新界)" },
        ]
      },
      {
        district: "Sai Kung (西貢區)",
        areas: [
          { name: "Sai Kung", nameZH: "西貢", fullName: "Sai Kung (西貢)", district: "Sai Kung (西貢區)", region: "New Territories (新界)" },
          { name: "Tseung Kwan O", nameZH: "將軍澳", fullName: "Tseung Kwan O (將軍澳)", district: "Sai Kung (西貢區)", region: "New Territories (新界)" },
          { name: "Hang Hau", nameZH: "坑口", fullName: "Hang Hau (坑口)", district: "Sai Kung (西貢區)", region: "New Territories (新界)" },
          { name: "Po Lam", nameZH: "寶琳", fullName: "Po Lam (寶琳)", district: "Sai Kung (西貢區)", region: "New Territories (新界)" },
          { name: "LOHAS Park", nameZH: "日出康城", fullName: "LOHAS Park (日出康城)", district: "Sai Kung (西貢區)", region: "New Territories (新界)" },
          { name: "Tiu Keng Leng", nameZH: "調景嶺", fullName: "Tiu Keng Leng (調景嶺)", district: "Sai Kung (西貢區)", region: "New Territories (新界)" },
          { name: "Clear Water Bay", nameZH: "清水灣", fullName: "Clear Water Bay (清水灣)", district: "Sai Kung (西貢區)", region: "New Territories (新界)" },
        ]
      },
      {
        district: "Islands (離島區)",
        areas: [
          { name: "Tung Chung", nameZH: "東涌", fullName: "Tung Chung (東涌)", district: "Lantau Island (大嶼山)", region: "New Territories (新界)" },
          { name: "Airport", nameZH: "香港國際機場", fullName: "Airport (香港國際機場)", district: "Lantau Island (大嶼山)", region: "New Territories (新界)" },
          { name: "Discovery Bay", nameZH: "愉景灣", fullName: "Discovery Bay (愉景灣)", district: "Lantau Island (大嶼山)", region: "New Territories (新界)" },
          { name: "Disneyland", nameZH: "香港迪士尼", fullName: "Disneyland (香港迪士尼)", district: "Lantau Island (大嶼山)", region: "New Territories (新界)" },
          { name: "Mui Wo", nameZH: "梅窩", fullName: "Mui Wo (梅窩)", district: "Lantau Island (大嶼山)", region: "New Territories (新界)" },
          { name: "Tai O", nameZH: "大澳", fullName: "Tai O (大澳)", district: "Lantau Island (大嶼山)", region: "New Territories (新界)" },
          { name: "Cheung Chau", nameZH: "長洲", fullName: "Cheung Chau (長洲)", district: "Outlying Islands (離島)", region: "New Territories (新界)" },
          { name: "Peng Chau", nameZH: "坪洲", fullName: "Peng Chau (坪洲)", district: "Outlying Islands (離島)", region: "New Territories (新界)" },
          { name: "Lamma Island", nameZH: "南丫島", fullName: "Lamma Island (南丫島)", district: "Outlying Islands (離島)", region: "New Territories (新界)" },
        ]
      }
    ]
  }
];

/**
 * Regional Transport Mode Allocation Ratios:
 * - Hong Kong Island: 70% MTR, 27% Bus, 3% Private Car
 * - New Territories (NT): 40% MTR, 57% Bus, 3% Private Car
 * - Kowloon: 60% MTR, 37% Bus, 3% Private Car
 * - Walk rule: If distance <= 1.2 km, assume Walk (100%)
 */
export const REGIONAL_TRANSPORT_RATIOS = {
  HK_Island: { MTR: 0.70, Bus: 0.27, 'Private Car': 0.03 },
  NT: { MTR: 0.40, Bus: 0.57, 'Private Car': 0.03 },
  Kowloon: { MTR: 0.60, Bus: 0.37, 'Private Car': 0.03 }
};

export function getRegionForArea(areaName: string): 'HK_Island' | 'Kowloon' | 'NT' {
  if (!areaName) return 'Kowloon';
  const lower = areaName.toLowerCase();

  for (const regionGroup of AREA_HIERARCHY) {
    for (const districtGroup of regionGroup.districts) {
      for (const area of districtGroup.areas) {
        if (
          area.fullName.toLowerCase().includes(lower) ||
          area.name.toLowerCase().includes(lower) ||
          lower.includes(area.name.toLowerCase())
        ) {
          if (regionGroup.region.includes('Hong Kong Island')) return 'HK_Island';
          if (regionGroup.region.includes('Kowloon')) return 'Kowloon';
          if (regionGroup.region.includes('New Territories')) return 'NT';
        }
      }
    }
  }

  if (
    lower.includes('hong kong island') ||
    lower.includes('central') ||
    lower.includes('wan chai') ||
    lower.includes('eastern') ||
    lower.includes('southern') ||
    lower.includes('quarry bay') ||
    lower.includes('causeway') ||
    lower.includes('north point') ||
    lower.includes('chai wan')
  ) {
    return 'HK_Island';
  }

  if (
    lower.includes('nt') ||
    lower.includes('territories') ||
    lower.includes('sha tin') ||
    lower.includes('tai po') ||
    lower.includes('yuen long') ||
    lower.includes('tuen mun') ||
    lower.includes('tsuen wan') ||
    lower.includes('kwai') ||
    lower.includes('sai kung') ||
    lower.includes('islands') ||
    lower.includes('tung chung')
  ) {
    return 'NT';
  }

  return 'Kowloon';
}

export function getAllocatedTransportMode(
  distanceKm: number,
  areaName: string,
  randomSeed?: number
): 'MTR' | 'Bus' | 'Private Car' | 'Walk' {
  // If distance is within 1.2 km, assume walk
  if (distanceKm <= 1.2) {
    return 'Walk';
  }

  const region = getRegionForArea(areaName);
  const ratios = REGIONAL_TRANSPORT_RATIOS[region];
  const rand = randomSeed !== undefined ? randomSeed : Math.random();

  if (rand < ratios.MTR) {
    return 'MTR';
  } else if (rand < ratios.MTR + ratios.Bus) {
    return 'Bus';
  } else {
    return 'Private Car';
  }
}

export function renderAreaSelectOptions(includeAllOption = false, allLabel = "All Areas") {
  const options: React.ReactNode[] = [];
  if (includeAllOption) {
    options.push(React.createElement("option", { key: "ALL", value: "ALL" }, allLabel));
  }
  AREA_HIERARCHY.forEach((regionGroup) => {
    regionGroup.districts.forEach((districtGroup) => {
      const areaOptions = districtGroup.areas.map((area) =>
        React.createElement("option", { key: area.fullName, value: area.fullName }, area.fullName)
      );
      options.push(
        React.createElement(
          "optgroup",
          {
            key: `${regionGroup.region}-${districtGroup.district}`,
            label: `${regionGroup.region} — ${districtGroup.district}`
          },
          areaOptions
        )
      );
    });
  });
  return options;
}

export const MONTHS_LIST = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const MONTH_ABBRS: Record<string, string> = {
  "January": "Jan",
  "February": "Feb",
  "March": "Mar",
  "April": "Apr",
  "May": "May",
  "June": "Jun",
  "July": "Jul",
  "August": "Aug",
  "September": "Sep",
  "October": "Oct",
  "November": "Nov",
  "December": "Dec"
};

export function formatSelectedMonths(selectedMonths: string[]): string {
  if (!selectedMonths || selectedMonths.length === 0) return '';
  if (selectedMonths.length === 12) return 'Full Year';

  const indices = selectedMonths
    .map(m => MONTHS_LIST.indexOf(m))
    .filter(idx => idx !== -1)
    .sort((a, b) => a - b);

  if (indices.length === 0) return '';
  if (indices.length === 12) return 'Full Year';

  const ranges: { start: number; end: number }[] = [];
  let currentStart = indices[0];
  let currentEnd = indices[0];

  for (let i = 1; i < indices.length; i++) {
    if (indices[i] === currentEnd + 1) {
      currentEnd = indices[i];
    } else {
      ranges.push({ start: currentStart, end: currentEnd });
      currentStart = indices[i];
      currentEnd = indices[i];
    }
  }
  ranges.push({ start: currentStart, end: currentEnd });

  return ranges.map(r => {
    const startName = MONTH_ABBRS[MONTHS_LIST[r.start]] || MONTHS_LIST[r.start];
    if (r.start === r.end) {
      return startName;
    }
    const endName = MONTH_ABBRS[MONTHS_LIST[r.end]] || MONTHS_LIST[r.end];
    return `${startName}–${endName}`;
  }).join(', ');
}

export const DEFAULT_WORKING_DAYS_OFFICE: Record<string, number> = {
  "January": 22,
  "February": 18,
  "March": 21,
  "April": 19,
  "May": 21,
  "June": 21,
  "July": 22,
  "August": 22,
  "September": 21,
  "October": 21,
  "November": 21,
  "December": 21
};

export const DEFAULT_WORKING_DAYS_FRONTLINE: Record<string, number> = {
  "January": 26,
  "February": 22,
  "March": 25,
  "April": 23,
  "May": 25,
  "June": 25,
  "July": 26,
  "August": 26,
  "September": 25,
  "October": 25,
  "November": 25,
  "December": 25
};

export const DEFAULT_EMISSION_FACTORS: Record<string, number> = {
  'Private Car': 143.2,
  'MTR': 12.4,
  'Bus': 18.5,
  'Walk': 0.0
};

export const DEFAULT_CUSTOM_SITES: CustomWorkSite[] = [
  { id: "SITE-QB", name: "Quarry Bay Office", district: "Quarry Bay (鰂魚涌)", lat: 22.2854, lng: 114.2128, staffCount: 200, visible: true, siteCode: "SITE-01" },
  { id: "SITE-KT", name: "Kwun Tong Office", district: "Kwun Tong (觀塘)", lat: 22.3134, lng: 114.2238, staffCount: 100, visible: true, siteCode: "SITE-02" },
  { id: "SITE-CKC", name: "Cheung Kong Centre", district: "Central (中環)", lat: 22.2799, lng: 114.1603, staffCount: 100, visible: true, siteCode: "SITE-03" },
  { id: "SITE-AH", name: "HKL - Alexandra House", district: "Central (中環)", lat: 22.2817, lng: 114.1586, staffCount: 100, visible: true, siteCode: "SITE-04" },
  { id: "SITE-LM", name: "HKL - Landmark", district: "Central (中環)", lat: 22.2814, lng: 114.1584, staffCount: 100, visible: true, siteCode: "SITE-05" },
  { id: "SITE-ES", name: "HKL - Exchange Square", district: "Central (中環)", lat: 22.2840, lng: 114.1581, staffCount: 100, visible: true, siteCode: "SITE-06" },
  { id: "SITE-GEC", name: "Wharf - Great Eagle Centre", district: "Wan Chai (灣仔)", lat: 22.2804, lng: 114.1751, staffCount: 100, visible: true, siteCode: "SITE-07" },
  { id: "SITE-LP", name: "Wharf - Langham Place", district: "Mong Kok (旺角)", lat: 22.3191, lng: 114.1685, staffCount: 100, visible: true, siteCode: "SITE-08" },
  { id: "SITE-TGR", name: "Wharf - Three Garden Road", district: "Central (中環)", lat: 22.2789, lng: 114.1611, staffCount: 100, visible: true, siteCode: "SITE-09" },
  { id: "SITE-UCH", name: "United Christian Hospital", district: "Kwun Tong (觀塘)", lat: 22.3223, lng: 114.2281, staffCount: 100, visible: true, siteCode: "SITE-10" },
  { id: "SITE-CUMC", name: "Chinese University Medical Centre (CUMC)", district: "Sha Tin (沙田)", lat: 22.4143, lng: 114.2109, staffCount: 100, visible: true, siteCode: "SITE-11" },
  { id: "SITE-TKOH", name: "Tseung Kwan O Hospital", district: "Tseung Kwan O (將軍澳)", lat: 22.3168, lng: 114.2676, staffCount: 100, visible: true, siteCode: "SITE-12" },
  { id: "SITE-YCH", name: "Yan Chai Hospital", district: "Lai Chi Kok (荔枝角)", lat: 22.3372, lng: 114.1190, staffCount: 100, visible: true, siteCode: "SITE-13" },
  { id: "SITE-PMH", name: "Princess Margaret Hospital", district: "Kwai Chung (葵涌)", lat: 22.3421, lng: 114.1351, staffCount: 100, visible: true, siteCode: "SITE-14" },
  { id: "SITE-PAM1", name: "PAM 1", district: "Tuen Mun (屯門)", lat: 22.399, lng: 113.975, staffCount: 100, visible: true, siteCode: "SITE-15" },
  { id: "SITE-PAM2", name: "PAM 2", district: "Tuen Mun (屯門)", lat: 22.398, lng: 113.976, staffCount: 100, visible: true, siteCode: "SITE-16" },
  { id: "SITE-PAM3", name: "PAM 3", district: "Tuen Mun (屯門)", lat: 22.397, lng: 113.977, staffCount: 100, visible: true, siteCode: "SITE-17" }
];

export function getHighestSiteCodeNumber(sites: CustomWorkSite[]): number {
  let max = 0;
  sites.forEach(site => {
    const codeStr = site.siteCode || site.id || '';
    const match = codeStr.match(/SITE-(\d+)/i) || codeStr.match(/(\d+)/);
    if (match) {
      const val = parseInt(match[1], 10);
      if (!isNaN(val) && val > max) {
        max = val;
      }
    }
  });
  return max;
}

export function generateSiteCode(num: number): string {
  return `SITE-${num.toString().padStart(2, '0')}`;
}

export const OFFICE_PRESETS = [
  {
    name: "Quarry Bay Office", 
    lat: 22.2854, 
    lng: 114.2128,
    keywords: ["quarry bay", "qb", "taikoo", "headquarter", "hq", "鰂魚涌"]
  },
  {
    name: "Kwun Tong Office", 
    lat: 22.3134, 
    lng: 114.2238,
    keywords: ["kwun tong", "kt", "觀塘"]
  }
];

export const DISTRICT_DATA: Record<string, DistrictConfig> = {
  // --- HONG KONG ISLAND ---
  // Central & Western
  "Central (中環)": {
    name: "Central", nameZH: "中環", lat: 22.2820, lng: 114.1582, radius: 1.2,
    estatesPub: ["Central Urban HOS Quarters"],
    estatesPri: ["Regent Height", "Centrium Residence", "Garden Terrace", "SOHO Residences", "Centrestage"],
    employees: 350, pubRatio: 0.05
  },
  "Central": {
    name: "Central", nameZH: "中環", lat: 22.2820, lng: 114.1582, radius: 1.2,
    estatesPub: ["Central Urban HOS Quarters"],
    estatesPri: ["Regent Height", "Centrium Residence", "Garden Terrace", "SOHO Residences", "Centrestage"],
    employees: 350, pubRatio: 0.05
  },
  "Admiralty (金鐘)": {
    name: "Admiralty", nameZH: "金鐘", lat: 22.2790, lng: 114.1650, radius: 1.0,
    estatesPub: ["Admiralty Quarters"],
    estatesPri: ["Pacific Place Apartments", "Star Street Residences", "Admiralty Centre Suites"],
    employees: 180, pubRatio: 0.02
  },
  "Admiralty": {
    name: "Admiralty", nameZH: "金鐘", lat: 22.2790, lng: 114.1650, radius: 1.0,
    estatesPub: ["Admiralty Quarters"],
    estatesPri: ["Pacific Place Apartments", "Star Street Residences", "Admiralty Centre Suites"],
    employees: 180, pubRatio: 0.02
  },
  "Sheung Wan (上環)": {
    name: "Sheung Wan", nameZH: "上環", lat: 22.2860, lng: 114.1510, radius: 1.1,
    estatesPub: ["Sheung Wan HOS"],
    estatesPri: ["Grand Millennium Plaza", "Hollywood Terrace", "Queen's Terrace", "Centre Point", "The Warren"],
    employees: 280, pubRatio: 0.10
  },
  "Sheung Wan": {
    name: "Sheung Wan", nameZH: "上環", lat: 22.2860, lng: 114.1510, radius: 1.1,
    estatesPub: ["Sheung Wan HOS"],
    estatesPri: ["Grand Millennium Plaza", "Hollywood Terrace", "Queen's Terrace", "Centre Point", "The Warren"],
    employees: 280, pubRatio: 0.10
  },
  "Sai Ying Pun (西營盤)": {
    name: "Sai Ying Pun", nameZH: "西營盤", lat: 22.2865, lng: 114.1415, radius: 1.2,
    estatesPub: ["Sai Ying Pun Estate"],
    estatesPri: ["Island Crest", "Upton", "Kensington Hill", "Soho 189", "The Harbourside SYP"],
    employees: 310, pubRatio: 0.20
  },
  "Sai Ying Pun": {
    name: "Sai Ying Pun", nameZH: "西營盤", lat: 22.2865, lng: 114.1415, radius: 1.2,
    estatesPub: ["Sai Ying Pun Estate"],
    estatesPri: ["Island Crest", "Upton", "Kensington Hill", "Soho 189", "The Harbourside SYP"],
    employees: 310, pubRatio: 0.20
  },
  "Kennedy Town (堅尼地城)": {
    name: "Kennedy Town", nameZH: "堅尼地城", lat: 22.2815, lng: 114.1285, radius: 1.3,
    estatesPub: ["Kwun Lung Lau"],
    estatesPri: ["The Merton", "Imperial Kennedy", "Cadogan", "Manhattan Heights", "University Heights"],
    employees: 390, pubRatio: 0.35
  },
  "Kennedy Town": {
    name: "Kennedy Town", nameZH: "堅尼地城", lat: 22.2815, lng: 114.1285, radius: 1.3,
    estatesPub: ["Kwun Lung Lau"],
    estatesPri: ["The Merton", "Imperial Kennedy", "Cadogan", "Manhattan Heights", "University Heights"],
    employees: 390, pubRatio: 0.35
  },
  "Mid-Levels (半山)": {
    name: "Mid-Levels", nameZH: "半山", lat: 22.2770, lng: 114.1500, radius: 1.8,
    estatesPub: ["Mid-Levels Housing"],
    estatesPri: ["Robinson Place", "Tregunter Towers", "Dynasty Court", "Tavistock", "Clovelly Court"],
    employees: 220, pubRatio: 0.02
  },
  "Mid-Levels": {
    name: "Mid-Levels", nameZH: "半山", lat: 22.2770, lng: 114.1500, radius: 1.8,
    estatesPub: ["Mid-Levels Housing"],
    estatesPri: ["Robinson Place", "Tregunter Towers", "Dynasty Court", "Tavistock", "Clovelly Court"],
    employees: 220, pubRatio: 0.02
  },
  "The Peak (山頂)": {
    name: "The Peak", nameZH: "山頂", lat: 22.2710, lng: 114.1490, radius: 2.0,
    estatesPub: ["Peak Police Quarters"],
    estatesPri: ["Mount Nicholson", "OPUS Hong Kong", "Peak Galleria Villas", "Severn 8"],
    employees: 60, pubRatio: 0.01
  },
  "The Peak": {
    name: "The Peak", nameZH: "山頂", lat: 22.2710, lng: 114.1490, radius: 2.0,
    estatesPub: ["Peak Police Quarters"],
    estatesPri: ["Mount Nicholson", "OPUS Hong Kong", "Peak Galleria Villas", "Severn 8"],
    employees: 60, pubRatio: 0.01
  },

  // Wan Chai
  "Wan Chai (灣仔)": {
    name: "Wan Chai", nameZH: "灣仔", lat: 22.2760, lng: 114.1730, radius: 1.2,
    estatesPub: ["Wan Chai Urban HOS"],
    estatesPri: ["Xiu Hua Court", "The Avenue", "Star Street Precinct", "Zenith", "J Senses"],
    employees: 320, pubRatio: 0.05
  },
  "Wan Chai": {
    name: "Wan Chai", nameZH: "灣仔", lat: 22.2760, lng: 114.1730, radius: 1.2,
    estatesPub: ["Wan Chai Urban HOS"],
    estatesPri: ["Xiu Hua Court", "The Avenue", "Star Street Precinct", "Zenith", "J Senses"],
    employees: 320, pubRatio: 0.05
  },
  "Causeway Bay (銅鑼灣)": {
    name: "Causeway Bay", nameZH: "銅鑼灣", lat: 22.2800, lng: 114.1850, radius: 1.1,
    estatesPub: ["Causeway Bay HOS"],
    estatesPri: ["Pearl City Mansion", "Park Towers", "Illumination Terrace", "Villa Elizabeth"],
    employees: 290, pubRatio: 0.05
  },
  "Causeway Bay": {
    name: "Causeway Bay", nameZH: "銅鑼灣", lat: 22.2800, lng: 114.1850, radius: 1.1,
    estatesPub: ["Causeway Bay HOS"],
    estatesPri: ["Pearl City Mansion", "Park Towers", "Illumination Terrace", "Villa Elizabeth"],
    employees: 290, pubRatio: 0.05
  },
  "Happy Valley (跑馬地)": {
    name: "Happy Valley", nameZH: "跑馬地", lat: 22.2700, lng: 114.1840, radius: 1.4,
    estatesPub: ["Happy Valley Quarters"],
    estatesPri: ["Blue Pool Court", "Broadview Villa", "Leighton Hill", "Happy Heights"],
    employees: 190, pubRatio: 0.02
  },
  "Happy Valley": {
    name: "Happy Valley", nameZH: "跑馬地", lat: 22.2700, lng: 114.1840, radius: 1.4,
    estatesPub: ["Happy Valley Quarters"],
    estatesPri: ["Blue Pool Court", "Broadview Villa", "Leighton Hill", "Happy Heights"],
    employees: 190, pubRatio: 0.02
  },
  "Tai Hang (大坑)": {
    name: "Tai Hang", nameZH: "大坑", lat: 22.2775, lng: 114.1920, radius: 1.2,
    estatesPub: ["Lai Tak Tsuen"],
    estatesPri: ["The Illumination", "Warren Park", "Warrenwoods", "The Pavilia Hill"],
    employees: 210, pubRatio: 0.35
  },
  "Tai Hang": {
    name: "Tai Hang", nameZH: "大坑", lat: 22.2775, lng: 114.1920, radius: 1.2,
    estatesPub: ["Lai Tak Tsuen"],
    estatesPri: ["The Illumination", "Warren Park", "Warrenwoods", "The Pavilia Hill"],
    employees: 210, pubRatio: 0.35
  },

  // Eastern
  "North Point (北角)": {
    name: "North Point", nameZH: "北角", lat: 22.2905, lng: 114.1985, radius: 1.3,
    estatesPub: ["Healthy Village"],
    estatesPri: ["City Garden", "Provident Centre", "Fleur Pavilia", "Harbour East", "Island Place"],
    employees: 480, pubRatio: 0.15
  },
  "North Point": {
    name: "North Point", nameZH: "北角", lat: 22.2905, lng: 114.1985, radius: 1.3,
    estatesPub: ["Healthy Village"],
    estatesPri: ["City Garden", "Provident Centre", "Fleur Pavilia", "Harbour East", "Island Place"],
    employees: 480, pubRatio: 0.15
  },
  "Quarry Bay (鰂魚涌)": {
    name: "Quarry Bay", nameZH: "鰂魚涌", lat: 22.2854, lng: 114.2128, radius: 1.4,
    estatesPub: ["Model Housing Estate"],
    estatesPri: ["Taikoo Shing", "Kornhill", "Mount Parker Residences", "The Orchards", "Westlands Court"],
    employees: 520, pubRatio: 0.10
  },
  "Quarry Bay": {
    name: "Quarry Bay", nameZH: "鰂魚涌", lat: 22.2854, lng: 114.2128, radius: 1.4,
    estatesPub: ["Model Housing Estate"],
    estatesPri: ["Taikoo Shing", "Kornhill", "Mount Parker Residences", "The Orchards", "Westlands Court"],
    employees: 520, pubRatio: 0.10
  },
  "Tai Koo (太古)": {
    name: "Tai Koo", nameZH: "太古", lat: 22.2850, lng: 114.2170, radius: 1.1,
    estatesPub: ["Kornhill HOS"],
    estatesPri: ["Taikoo Shing Horizon", "Kornhill Garden", "Nan Fung Sun Chuen"],
    employees: 410, pubRatio: 0.10
  },
  "Tai Koo": {
    name: "Tai Koo", nameZH: "太古", lat: 22.2850, lng: 114.2170, radius: 1.1,
    estatesPub: ["Kornhill HOS"],
    estatesPri: ["Taikoo Shing Horizon", "Kornhill Garden", "Nan Fung Sun Chuen"],
    employees: 410, pubRatio: 0.10
  },
  "Sai Wan Ho (西灣河)": {
    name: "Sai Wan Ho", nameZH: "西灣河", lat: 22.2820, lng: 114.2220, radius: 1.2,
    estatesPub: ["Hing Tung Estate"],
    estatesPri: ["Grand Promenade", "Les Saisons", "Felicity Garden", "Tung Hei Court"],
    employees: 360, pubRatio: 0.30
  },
  "Sai Wan Ho": {
    name: "Sai Wan Ho", nameZH: "西灣河", lat: 22.2820, lng: 114.2220, radius: 1.2,
    estatesPub: ["Hing Tung Estate"],
    estatesPri: ["Grand Promenade", "Les Saisons", "Felicity Garden", "Tung Hei Court"],
    employees: 360, pubRatio: 0.30
  },
  "Shau Kei Wan (筲箕灣)": {
    name: "Shau Kei Wan", nameZH: "筲箕灣", lat: 22.2790, lng: 114.2290, radius: 1.3,
    estatesPub: ["Yiu Tung Estate", "Oi Tung Estate", "Ming Wah Dai Ha"],
    estatesPri: ["Perfect Mount Gardens", "Island Resort SKW", "Lime Habitat"],
    employees: 430, pubRatio: 0.55
  },
  "Shau Kei Wan": {
    name: "Shau Kei Wan", nameZH: "筲箕灣", lat: 22.2790, lng: 114.2290, radius: 1.3,
    estatesPub: ["Yiu Tung Estate", "Oi Tung Estate", "Ming Wah Dai Ha"],
    estatesPri: ["Perfect Mount Gardens", "Island Resort SKW", "Lime Habitat"],
    employees: 430, pubRatio: 0.55
  },
  "Chai Wan (柴灣)": {
    name: "Chai Wan", nameZH: "柴灣", lat: 22.2640, lng: 114.2360, radius: 1.6,
    estatesPub: ["Hing Wah Estate", "Chai Wan Estate", "Yue Wan Estate", "Tsui Wan Estate"],
    estatesPri: ["Greenwood Terrace", "Walton Estate", "Koway Court", "New Trend Plaza"],
    employees: 580, pubRatio: 0.70
  },
  "Chai Wan": {
    name: "Chai Wan", nameZH: "柴灣", lat: 22.2640, lng: 114.2360, radius: 1.6,
    estatesPub: ["Hing Wah Estate", "Chai Wan Estate", "Yue Wan Estate", "Tsui Wan Estate"],
    estatesPri: ["Greenwood Terrace", "Walton Estate", "Koway Court", "New Trend Plaza"],
    employees: 580, pubRatio: 0.70
  },
  "Siu Sai Wan (小西灣)": {
    name: "Siu Sai Wan", nameZH: "小西灣", lat: 22.2620, lng: 114.2500, radius: 1.2,
    estatesPub: ["Siu Sai Wan Estate"],
    estatesPri: ["Island Resort", "Harmony Garden", "Cheerful Garden", "Fullview Garden"],
    employees: 380, pubRatio: 0.60
  },
  "Siu Sai Wan": {
    name: "Siu Sai Wan", nameZH: "小西灣", lat: 22.2620, lng: 114.2500, radius: 1.2,
    estatesPub: ["Siu Sai Wan Estate"],
    estatesPri: ["Island Resort", "Harmony Garden", "Cheerful Garden", "Fullview Garden"],
    employees: 380, pubRatio: 0.60
  },

  // Southern
  "Aberdeen (香港仔)": {
    name: "Aberdeen", nameZH: "香港仔", lat: 22.2480, lng: 114.1550, radius: 1.5,
    estatesPub: ["Shek Pai Wan Estate", "Yue Kwong Chuen"],
    estatesPri: ["Aberdeen Centre", "Ocean Court", "Jadewater", "Abading"],
    employees: 410, pubRatio: 0.45
  },
  "Aberdeen": {
    name: "Aberdeen", nameZH: "香港仔", lat: 22.2480, lng: 114.1550, radius: 1.5,
    estatesPub: ["Shek Pai Wan Estate", "Yue Kwong Chuen"],
    estatesPri: ["Aberdeen Centre", "Ocean Court", "Jadewater", "Abading"],
    employees: 410, pubRatio: 0.45
  },
  "Wong Chuk Hang (黃竹坑)": {
    name: "Wong Chuk Hang", nameZH: "黃竹坑", lat: 22.2485, lng: 114.1680, radius: 1.3,
    estatesPub: ["Wong Chuk Hang Estate"],
    estatesPri: ["Blue Coast", "South Land", "La Marina", "Deep Water Bay Towers"],
    employees: 260, pubRatio: 0.20
  },
  "Wong Chuk Hang": {
    name: "Wong Chuk Hang", nameZH: "黃竹坑", lat: 22.2485, lng: 114.1680, radius: 1.3,
    estatesPub: ["Wong Chuk Hang Estate"],
    estatesPri: ["Blue Coast", "South Land", "La Marina", "Deep Water Bay Towers"],
    employees: 260, pubRatio: 0.20
  },
  "Ap Lei Chau (鴨脷洲)": {
    name: "Ap Lei Chau", nameZH: "鴨脷洲", lat: 22.2420, lng: 114.1550, radius: 1.4,
    estatesPub: ["Ap Lei Chau Estate", "Lei Tung Estate"],
    estatesPri: ["South Horizons", "Larvotto", "Marinella", "Sham Wan Towers"],
    employees: 450, pubRatio: 0.40
  },
  "Ap Lei Chau": {
    name: "Ap Lei Chau", nameZH: "鴨脷洲", lat: 22.2420, lng: 114.1550, radius: 1.4,
    estatesPub: ["Ap Lei Chau Estate", "Lei Tung Estate"],
    estatesPri: ["South Horizons", "Larvotto", "Marinella", "Sham Wan Towers"],
    employees: 450, pubRatio: 0.40
  },
  "Pok Fu Lam (薄扶林)": {
    name: "Pok Fu Lam", nameZH: "薄扶林", lat: 22.2600, lng: 114.1350, radius: 1.8,
    estatesPub: ["Wah Fu Estate", "Wah Sum Estate"],
    estatesPri: ["Baguio Villa", "Bel-Air Residence", "Scenic Villas", "Pokfulam Gardens"],
    employees: 380, pubRatio: 0.50
  },
  "Pok Fu Lam": {
    name: "Pok Fu Lam", nameZH: "薄扶林", lat: 22.2600, lng: 114.1350, radius: 1.8,
    estatesPub: ["Wah Fu Estate", "Wah Sum Estate"],
    estatesPri: ["Baguio Villa", "Bel-Air Residence", "Scenic Villas", "Pokfulam Gardens"],
    employees: 380, pubRatio: 0.50
  },
  "Repulse Bay (淺水灣)": {
    name: "Repulse Bay", nameZH: "淺水灣", lat: 22.2370, lng: 114.1970, radius: 1.6,
    estatesPub: ["Repulse Bay Quarters"],
    estatesPri: ["The Repulse Bay", "Grosvenor Place", "56 Repulse Bay Road", "Belleview"],
    employees: 90, pubRatio: 0.01
  },
  "Repulse Bay": {
    name: "Repulse Bay", nameZH: "淺水灣", lat: 22.2370, lng: 114.1970, radius: 1.6,
    estatesPub: ["Repulse Bay Quarters"],
    estatesPri: ["The Repulse Bay", "Grosvenor Place", "56 Repulse Bay Road", "Belleview"],
    employees: 90, pubRatio: 0.01
  },
  "Stanley (赤柱)": {
    name: "Stanley", nameZH: "赤柱", lat: 22.2180, lng: 114.2130, radius: 1.7,
    estatesPub: ["Ma Hang Estate"],
    estatesPri: ["Stanley Knoll", "Regalia Bay", "Redhill Peninsula", "Carmel Hill"],
    employees: 140, pubRatio: 0.25
  },
  "Stanley": {
    name: "Stanley", nameZH: "赤柱", lat: 22.2180, lng: 114.2130, radius: 1.7,
    estatesPub: ["Ma Hang Estate"],
    estatesPri: ["Stanley Knoll", "Regalia Bay", "Redhill Peninsula", "Carmel Hill"],
    employees: 140, pubRatio: 0.25
  },

  // --- KOWLOON ---
  // Yau Tsim Mong
  "Tsim Sha Tsui (尖沙咀)": {
    name: "Tsim Sha Tsui", nameZH: "尖沙咀", lat: 22.2988, lng: 114.1722, radius: 1.1,
    estatesPub: ["TST Urban Housing"],
    estatesPri: ["Sorrento", "The Arch", "The Cullinan", "Harbour Pinnacle", "The Masterpiece"],
    employees: 280, pubRatio: 0.05
  },
  "Tsim Sha Tsui": {
    name: "Tsim Sha Tsui", nameZH: "尖沙咀", lat: 22.2988, lng: 114.1722, radius: 1.1,
    estatesPub: ["TST Urban Housing"],
    estatesPri: ["Sorrento", "The Arch", "The Cullinan", "Harbour Pinnacle", "The Masterpiece"],
    employees: 280, pubRatio: 0.05
  },
  "Jordan (佐敦)": {
    name: "Jordan", nameZH: "佐敦", lat: 22.3050, lng: 114.1700, radius: 1.0,
    estatesPub: ["Prosperous Garden"],
    estatesPri: ["Grand Austin", "The Austin", "Victoria Towers", "Man Yiu Building"],
    employees: 260, pubRatio: 0.15
  },
  "Jordan": {
    name: "Jordan", nameZH: "佐敦", lat: 22.3050, lng: 114.1700, radius: 1.0,
    estatesPub: ["Prosperous Garden"],
    estatesPri: ["Grand Austin", "The Austin", "Victoria Towers", "Man Yiu Building"],
    employees: 260, pubRatio: 0.15
  },
  "Yau Ma Tei (油麻地)": {
    name: "Yau Ma Tei", nameZH: "油麻地", lat: 22.3110, lng: 114.1700, radius: 1.1,
    estatesPub: ["Yau Ma Tei HOS"],
    estatesPri: ["King's Park Villa", "Parc Palais", "Mount Beacon YMT", "Alhambra Building"],
    employees: 310, pubRatio: 0.10
  },
  "Yau Ma Tei": {
    name: "Yau Ma Tei", nameZH: "油麻地", lat: 22.3110, lng: 114.1700, radius: 1.1,
    estatesPub: ["Yau Ma Tei HOS"],
    estatesPri: ["King's Park Villa", "Parc Palais", "Mount Beacon YMT", "Alhambra Building"],
    employees: 310, pubRatio: 0.10
  },
  "Mong Kok (旺角)": {
    name: "Mong Kok", nameZH: "旺角", lat: 22.3195, lng: 114.1685, radius: 1.2,
    estatesPub: ["Hoi Fu Court"],
    estatesPri: ["Macpherson Residence", "Skypark", "Argyle Centre Mansions", "Grand Century Place"],
    employees: 380, pubRatio: 0.20
  },
  "Mong Kok": {
    name: "Mong Kok", nameZH: "旺角", lat: 22.3195, lng: 114.1685, radius: 1.2,
    estatesPub: ["Hoi Fu Court"],
    estatesPri: ["Macpherson Residence", "Skypark", "Argyle Centre Mansions", "Grand Century Place"],
    employees: 380, pubRatio: 0.20
  },
  "Tai Kok Tsui (大角咀)": {
    name: "Tai Kok Tsui", nameZH: "大角咀", lat: 22.3210, lng: 114.1610, radius: 1.3,
    estatesPub: ["Charming Garden", "Hoi Lai Court"],
    estatesPri: ["Island Harbourview", "Central Park", "The Hermitage", "Metro Harbour View"],
    employees: 350, pubRatio: 0.30
  },
  "Tai Kok Tsui": {
    name: "Tai Kok Tsui", nameZH: "大角咀", lat: 22.3210, lng: 114.1610, radius: 1.3,
    estatesPub: ["Charming Garden", "Hoi Lai Court"],
    estatesPri: ["Island Harbourview", "Central Park", "The Hermitage", "Metro Harbour View"],
    employees: 350, pubRatio: 0.30
  },

  // Sham Shui Po
  "Sham Shui Po (深水埗)": {
    name: "Sham Shui Po", nameZH: "深水埗", lat: 22.3307, lng: 114.1622, radius: 1.3,
    estatesPub: ["Nam Shan Estate", "Shek Kip Mei Estate", "Fu Cheong Estate"],
    estatesPri: ["Trinity Towers", "Heya Green", "Croning Building"],
    employees: 510, pubRatio: 0.75
  },
  "Sham Shui Po": {
    name: "Sham Shui Po", nameZH: "深水埗", lat: 22.3307, lng: 114.1622, radius: 1.3,
    estatesPub: ["Nam Shan Estate", "Shek Kip Mei Estate", "Fu Cheong Estate"],
    estatesPri: ["Trinity Towers", "Heya Green", "Croning Building"],
    employees: 510, pubRatio: 0.75
  },
  "Cheung Sha Wan (長沙灣)": {
    name: "Cheung Sha Wan", nameZH: "長沙灣", lat: 22.3360, lng: 114.1560, radius: 1.4,
    estatesPub: ["So Uk Estate", "Un Chau Estate", "Lei Cheng Uk Estate"],
    estatesPri: ["The Sparkle", "Heya Delight", "Heya Aqua"],
    employees: 460, pubRatio: 0.70
  },
  "Cheung Sha Wan": {
    name: "Cheung Sha Wan", nameZH: "長沙灣", lat: 22.3360, lng: 114.1560, radius: 1.4,
    estatesPub: ["So Uk Estate", "Un Chau Estate", "Lei Cheng Uk Estate"],
    estatesPri: ["The Sparkle", "Heya Delight", "Heya Aqua"],
    employees: 460, pubRatio: 0.70
  },
  "Lai Chi Kok (荔枝角)": {
    name: "Lai Chi Kok", nameZH: "荔枝角", lat: 22.3372, lng: 114.1480, radius: 1.2,
    estatesPub: ["Ching Lai Court"],
    estatesPri: ["Banyan Garden", "Liberte", "The Pacifica", "Aqua Marine"],
    employees: 410, pubRatio: 0.20
  },
  "Lai Chi Kok": {
    name: "Lai Chi Kok", nameZH: "荔枝角", lat: 22.3372, lng: 114.1480, radius: 1.2,
    estatesPub: ["Ching Lai Court"],
    estatesPri: ["Banyan Garden", "Liberte", "The Pacifica", "Aqua Marine"],
    employees: 410, pubRatio: 0.20
  },
  "Mei Foo (美孚)": {
    name: "Mei Foo", nameZH: "美孚", lat: 22.3365, lng: 114.1398, radius: 1.1,
    estatesPub: ["Mei Foo HOS"],
    estatesPri: ["Mei Foo Sun Chuen", "Manhattan Hill", "Mount Sterling Mall Mansions"],
    employees: 430, pubRatio: 0.05
  },
  "Mei Foo": {
    name: "Mei Foo", nameZH: "美孚", lat: 22.3365, lng: 114.1398, radius: 1.1,
    estatesPub: ["Mei Foo HOS"],
    estatesPri: ["Mei Foo Sun Chuen", "Manhattan Hill", "Mount Sterling Mall Mansions"],
    employees: 430, pubRatio: 0.05
  },
  "Shek Kip Mei (石硤尾)": {
    name: "Shek Kip Mei", nameZH: "石硤尾", lat: 22.3330, lng: 114.1680, radius: 1.2,
    estatesPub: ["Shek Kip Mei Estate", "Pak Tin Estate"],
    estatesPri: ["Dynasty Heights", "Beacon Heights"],
    employees: 370, pubRatio: 0.85
  },
  "Shek Kip Mei": {
    name: "Shek Kip Mei", nameZH: "石硤尾", lat: 22.3330, lng: 114.1680, radius: 1.2,
    estatesPub: ["Shek Kip Mei Estate", "Pak Tin Estate"],
    estatesPri: ["Dynasty Heights", "Beacon Heights"],
    employees: 370, pubRatio: 0.85
  },

  // Kowloon City
  "Hung Hom (紅磡)": {
    name: "Hung Hom", nameZH: "紅磡", lat: 22.3040, lng: 114.1850, radius: 1.3,
    estatesPub: ["Ka Wai Chuen", "Hung Hom Estate"],
    estatesPri: ["Royal Peninsula", "Harbourfront Horizon", "Laguna Verde", "Chatham Gate"],
    employees: 440, pubRatio: 0.30
  },
  "Hung Hom": {
    name: "Hung Hom", nameZH: "紅磡", lat: 22.3040, lng: 114.1850, radius: 1.3,
    estatesPub: ["Ka Wai Chuen", "Hung Hom Estate"],
    estatesPri: ["Royal Peninsula", "Harbourfront Horizon", "Laguna Verde", "Chatham Gate"],
    employees: 440, pubRatio: 0.30
  },
  "Whampoa (黃埔)": {
    name: "Whampoa", nameZH: "黃埔", lat: 22.3030, lng: 114.1910, radius: 1.1,
    estatesPub: ["Whampoa HOS"],
    estatesPri: ["Whampoa Garden", "Whampoa Estate", "Stars by the Harbour"],
    employees: 490, pubRatio: 0.05
  },
  "Whampoa": {
    name: "Whampoa", nameZH: "黃埔", lat: 22.3030, lng: 114.1910, radius: 1.1,
    estatesPub: ["Whampoa HOS"],
    estatesPri: ["Whampoa Garden", "Whampoa Estate", "Stars by the Harbour"],
    employees: 490, pubRatio: 0.05
  },
  "Ho Man Tin (何文田)": {
    name: "Ho Man Tin", nameZH: "何文田", lat: 22.3160, lng: 114.1800, radius: 1.5,
    estatesPub: ["Oi Man Estate", "Ho Man Tin Estate"],
    estatesPri: ["One Homantin", "Ultima", "Celestial Heights", "Homantin Hillside"],
    employees: 360, pubRatio: 0.50
  },
  "Ho Man Tin": {
    name: "Ho Man Tin", nameZH: "何文田", lat: 22.3160, lng: 114.1800, radius: 1.5,
    estatesPub: ["Oi Man Estate", "Ho Man Tin Estate"],
    estatesPri: ["One Homantin", "Ultima", "Celestial Heights", "Homantin Hillside"],
    employees: 360, pubRatio: 0.50
  },
  "To Kwa Wan (土瓜灣)": {
    name: "To Kwa Wan", nameZH: "土瓜灣", lat: 22.3180, lng: 114.1890, radius: 1.3,
    estatesPub: ["Lok Man Sun Chuen", "Chun Tin Court"],
    estatesPri: ["Grand Waterfront", "Wyler Gardens", "City Point TKW"],
    employees: 420, pubRatio: 0.40
  },
  "To Kwa Wan": {
    name: "To Kwa Wan", nameZH: "土瓜灣", lat: 22.3180, lng: 114.1890, radius: 1.3,
    estatesPub: ["Lok Man Sun Chuen", "Chun Tin Court"],
    estatesPri: ["Grand Waterfront", "Wyler Gardens", "City Point TKW"],
    employees: 420, pubRatio: 0.40
  },
  "Kai Tak (啟德)": {
    name: "Kai Tak", nameZH: "啟德", lat: 22.3282, lng: 114.1970, radius: 1.4,
    estatesPub: ["Kai Ching Estate", "Tak Long Estate"],
    estatesPri: ["Victoria Skye", "Oasis Kai Tak", "K. Summit", "Monaco", "One Kai Tak"],
    employees: 470, pubRatio: 0.45
  },
  "Kai Tak": {
    name: "Kai Tak", nameZH: "啟德", lat: 22.3282, lng: 114.1970, radius: 1.4,
    estatesPub: ["Kai Ching Estate", "Tak Long Estate"],
    estatesPri: ["Victoria Skye", "Oasis Kai Tak", "K. Summit", "Monaco", "One Kai Tak"],
    employees: 470, pubRatio: 0.45
  },
  "Kowloon Tong (九龍塘)": {
    name: "Kowloon Tong", nameZH: "九龍塘", lat: 22.3370, lng: 114.1770, radius: 1.6,
    estatesPub: ["Kowloon Tong Staff Quarters"],
    estatesPri: ["Kadoorie Hill", "Mount Beacon", "Parc Oasis", "Meridian Hill"],
    employees: 210, pubRatio: 0.02
  },
  "Kowloon Tong": {
    name: "Kowloon Tong", nameZH: "九龍塘", lat: 22.3370, lng: 114.1770, radius: 1.6,
    estatesPub: ["Kowloon Tong Staff Quarters"],
    estatesPri: ["Kadoorie Hill", "Mount Beacon", "Parc Oasis", "Meridian Hill"],
    employees: 210, pubRatio: 0.02
  },
  "Kowloon City (九龍城)": {
    name: "Kowloon City", nameZH: "九龍城", lat: 22.3290, lng: 114.1880, radius: 1.2,
    estatesPub: ["Ma Tau Wai Estate"],
    estatesPri: ["Billionaire Royale", "Prince Ritz", "Lion Rock Apartments"],
    employees: 330, pubRatio: 0.35
  },
  "Kowloon City": {
    name: "Kowloon City", nameZH: "九龍城", lat: 22.3290, lng: 114.1880, radius: 1.2,
    estatesPub: ["Ma Tau Wai Estate"],
    estatesPri: ["Billionaire Royale", "Prince Ritz", "Lion Rock Apartments"],
    employees: 330, pubRatio: 0.35
  },

  // Wong Tai Sin
  "Wong Tai Sin (黃大仙)": {
    name: "Wong Tai Sin", nameZH: "黃大仙", lat: 22.3417, lng: 114.1930, radius: 1.4,
    estatesPub: ["Wong Tai Sin Lower Estate", "Wong Tai Sin Upper Estate", "Chuk Yuen Estate"],
    estatesPri: ["Lions Rise", "Tropicana Gardens", "Kam Fung Court"],
    employees: 590, pubRatio: 0.85
  },
  "Wong Tai Sin": {
    name: "Wong Tai Sin", nameZH: "黃大仙", lat: 22.3417, lng: 114.1930, radius: 1.4,
    estatesPub: ["Wong Tai Sin Lower Estate", "Wong Tai Sin Upper Estate", "Chuk Yuen Estate"],
    estatesPri: ["Lions Rise", "Tropicana Gardens", "Kam Fung Court"],
    employees: 590, pubRatio: 0.85
  },
  "Diamond Hill (鑽石山)": {
    name: "Diamond Hill", nameZH: "鑽石山", lat: 22.3400, lng: 114.2020, radius: 1.3,
    estatesPub: ["Fung Tak Estate", "Kai Chuen Court"],
    estatesPri: ["Plaza Hollywood Towers", "Galaxia", "Rhythm Garden"],
    employees: 420, pubRatio: 0.60
  },
  "Diamond Hill": {
    name: "Diamond Hill", nameZH: "鑽石山", lat: 22.3400, lng: 114.2020, radius: 1.3,
    estatesPub: ["Fung Tak Estate", "Kai Chuen Court"],
    estatesPri: ["Plaza Hollywood Towers", "Galaxia", "Rhythm Garden"],
    employees: 420, pubRatio: 0.60
  },
  "Choi Hung (彩虹)": {
    name: "Choi Hung", nameZH: "彩虹", lat: 22.3350, lng: 114.2050, radius: 1.2,
    estatesPub: ["Choi Hung Estate", "Choi Wan Estate"],
    estatesPri: ["Scenic View", "Bayview Garden"],
    employees: 480, pubRatio: 0.80
  },
  "Choi Hung": {
    name: "Choi Hung", nameZH: "彩虹", lat: 22.3350, lng: 114.2050, radius: 1.2,
    estatesPub: ["Choi Hung Estate", "Choi Wan Estate"],
    estatesPri: ["Scenic View", "Bayview Garden"],
    employees: 480, pubRatio: 0.80
  },
  "Lok Fu (樂富)": {
    name: "Lok Fu", nameZH: "樂富", lat: 22.3380, lng: 114.1870, radius: 1.1,
    estatesPub: ["Lok Fu Estate", "Wang Tau Hom Estate"],
    estatesPri: ["Fu Keung Court", "Hong Keung Court"],
    employees: 320, pubRatio: 0.80
  },
  "Lok Fu": {
    name: "Lok Fu", nameZH: "樂富", lat: 22.3380, lng: 114.1870, radius: 1.1,
    estatesPub: ["Lok Fu Estate", "Wang Tau Hom Estate"],
    estatesPri: ["Fu Keung Court", "Hong Keung Court"],
    employees: 320, pubRatio: 0.80
  },
  "Tsz Wan Shan (慈雲山)": {
    name: "Tsz Wan Shan", nameZH: "慈雲山", lat: 22.3480, lng: 114.2000, radius: 1.4,
    estatesPub: ["Tsz Lok Estate", "Tsz Ching Estate", "Tsz Man Estate"],
    estatesPri: ["Tsz Oi Court", "Tsz On Court"],
    employees: 510, pubRatio: 0.88
  },
  "Tsz Wan Shan": {
    name: "Tsz Wan Shan", nameZH: "慈雲山", lat: 22.3480, lng: 114.2000, radius: 1.4,
    estatesPub: ["Tsz Lok Estate", "Tsz Ching Estate", "Tsz Man Estate"],
    estatesPri: ["Tsz Oi Court", "Tsz On Court"],
    employees: 510, pubRatio: 0.88
  },

  // Kwun Tong
  "Kwun Tong (觀塘)": {
    name: "Kwun Tong", nameZH: "觀塘", lat: 22.3138, lng: 114.2258, radius: 1.6,
    estatesPub: ["Tsui Ping Estate", "Sau Mau Ping Estate", "Shun Lee Estate", "On Tat Estate"],
    estatesPri: ["Grand Central", "Laguna City", "Yue Man Centre"],
    employees: 780, pubRatio: 0.65
  },
  "Kwun Tong": {
    name: "Kwun Tong", nameZH: "觀塘", lat: 22.3138, lng: 114.2258, radius: 1.6,
    estatesPub: ["Tsui Ping Estate", "Sau Mau Ping Estate", "Shun Lee Estate", "On Tat Estate"],
    estatesPri: ["Grand Central", "Laguna City", "Yue Man Centre"],
    employees: 780, pubRatio: 0.65
  },
  "Kowloon Bay (九龍灣)": {
    name: "Kowloon Bay", nameZH: "九龍灣", lat: 22.3225, lng: 114.2115, radius: 1.3,
    estatesPub: ["Kai Yip Estate", "Ping Shek Estate"],
    estatesPri: ["Telford Gardens", "Amoy Gardens", "Richland Gardens"],
    employees: 530, pubRatio: 0.40
  },
  "Kowloon Bay": {
    name: "Kowloon Bay", nameZH: "九龍灣", lat: 22.3225, lng: 114.2115, radius: 1.3,
    estatesPub: ["Kai Yip Estate", "Ping Shek Estate"],
    estatesPri: ["Telford Gardens", "Amoy Gardens", "Richland Gardens"],
    employees: 530, pubRatio: 0.40
  },
  "Ngau Tau Kok (牛頭角)": {
    name: "Ngau Tau Kok", nameZH: "牛頭角", lat: 22.3180, lng: 114.2170, radius: 1.2,
    estatesPub: ["Lower Ngau Tau Kok Estate", "Upper Ngau Tau Kok Estate", "Choi Fai Estate"],
    estatesPri: ["Lotus Tower", "On Kay Court"],
    employees: 470, pubRatio: 0.82
  },
  "Ngau Tau Kok": {
    name: "Ngau Tau Kok", nameZH: "牛頭角", lat: 22.3180, lng: 114.2170, radius: 1.2,
    estatesPub: ["Lower Ngau Tau Kok Estate", "Upper Ngau Tau Kok Estate", "Choi Fai Estate"],
    estatesPri: ["Lotus Tower", "On Kay Court"],
    employees: 470, pubRatio: 0.82
  },
  "Lam Tin (藍田)": {
    name: "Lam Tin", nameZH: "藍田", lat: 22.3080, lng: 114.2330, radius: 1.4,
    estatesPub: ["Tak Tin Estate", "Ping Tin Estate", "On Tin Estate", "Kwong Tin Estate"],
    estatesPri: ["Sceneway Garden", "Kai Tin Tower", "Hong Wah Court"],
    employees: 560, pubRatio: 0.70
  },
  "Lam Tin": {
    name: "Lam Tin", nameZH: "藍田", lat: 22.3080, lng: 114.2330, radius: 1.4,
    estatesPub: ["Tak Tin Estate", "Ping Tin Estate", "On Tin Estate", "Kwong Tin Estate"],
    estatesPri: ["Sceneway Garden", "Kai Tin Tower", "Hong Wah Court"],
    employees: 560, pubRatio: 0.70
  },
  "Yau Tong (油塘)": {
    name: "Yau Tong", nameZH: "油塘", lat: 22.2985, lng: 114.2385, radius: 1.3,
    estatesPub: ["Yau Lai Estate", "Ko Cheung Court", "Yau Tong Estate"],
    estatesPri: ["Peninsula East", "Maya", "The Coast Line", "Ocean One"],
    employees: 420, pubRatio: 0.60
  },
  "Yau Tong": {
    name: "Yau Tong", nameZH: "油塘", lat: 22.2985, lng: 114.2385, radius: 1.3,
    estatesPub: ["Yau Lai Estate", "Ko Cheung Court", "Yau Tong Estate"],
    estatesPri: ["Peninsula East", "Maya", "The Coast Line", "Ocean One"],
    employees: 420, pubRatio: 0.60
  },
  "Sau Mau Ping (秀茂坪)": {
    name: "Sau Mau Ping", nameZH: "秀茂坪", lat: 22.3190, lng: 114.2310, radius: 1.5,
    estatesPub: ["Sau Mau Ping Estate", "Po Tat Estate", "On Tai Estate"],
    estatesPri: ["Hiu Lai Court"],
    employees: 590, pubRatio: 0.90
  },
  "Sau Mau Ping": {
    name: "Sau Mau Ping", nameZH: "秀茂坪", lat: 22.3190, lng: 114.2310, radius: 1.5,
    estatesPub: ["Sau Mau Ping Estate", "Po Tat Estate", "On Tai Estate"],
    estatesPri: ["Hiu Lai Court"],
    employees: 590, pubRatio: 0.90
  },

  // --- NEW TERRITORIES ---
  // Kwai Tsing
  "Kwai Chung (葵涌)": {
    name: "Kwai Chung", nameZH: "葵涌", lat: 22.3569, lng: 114.1281, radius: 1.8,
    estatesPub: ["Kwai Chung Estate", "Shek Lei Estate", "Shek Yam Estate", "Kwai Shing Estate"],
    estatesPri: ["Kwai Fong Terrace", "Metroplaza Towers", "New Kwai Fong Gardens"],
    employees: 640, pubRatio: 0.70
  },
  "Kwai Chung": {
    name: "Kwai Chung", nameZH: "葵涌", lat: 22.3569, lng: 114.1281, radius: 1.8,
    estatesPub: ["Kwai Chung Estate", "Shek Lei Estate", "Shek Yam Estate", "Kwai Shing Estate"],
    estatesPri: ["Kwai Fong Terrace", "Metroplaza Towers", "New Kwai Fong Gardens"],
    employees: 640, pubRatio: 0.70
  },
  "Tsing Yi (青衣)": {
    name: "Tsing Yi", nameZH: "青衣", lat: 22.3529, lng: 114.1042, radius: 2.0,
    estatesPub: ["Cheung Ching Estate", "Cheung On Estate", "Ying Yat Estate"],
    estatesPri: ["Tierra Verde", "Villa Esplanada", "Greenfield Garden", "Rambler Crest"],
    employees: 520, pubRatio: 0.55
  },
  "Tsing Yi": {
    name: "Tsing Yi", nameZH: "青衣", lat: 22.3529, lng: 114.1042, radius: 2.0,
    estatesPub: ["Cheung Ching Estate", "Cheung On Estate", "Ying Yat Estate"],
    estatesPri: ["Tierra Verde", "Villa Esplanada", "Greenfield Garden", "Rambler Crest"],
    employees: 520, pubRatio: 0.55
  },
  "Lai King (荔景)": {
    name: "Lai King", nameZH: "荔景", lat: 22.3480, lng: 114.1260, radius: 1.2,
    estatesPub: ["Lai King Estate", "Cho Yiu Chuen"],
    estatesPri: ["Highland Park", "Y贤 Court"],
    employees: 280, pubRatio: 0.75
  },
  "Lai King": {
    name: "Lai King", nameZH: "荔景", lat: 22.3480, lng: 114.1260, radius: 1.2,
    estatesPub: ["Lai King Estate", "Cho Yiu Chuen"],
    estatesPri: ["Highland Park", "Y贤 Court"],
    employees: 280, pubRatio: 0.75
  },

  // Tsuen Wan
  "Tsuen Wan (荃灣)": {
    name: "Tsuen Wan", nameZH: "荃灣", lat: 22.3713, lng: 114.1132, radius: 1.8,
    estatesPub: ["Fuk Loi Estate", "Shek Wai Kok Estate", "Clague Garden Estate"],
    estatesPri: ["Discovery Park", "Luk Yeung Sun Chuen", "Allway Gardens", "Citypoint"],
    employees: 680, pubRatio: 0.40
  },
  "Tsuen Wan": {
    name: "Tsuen Wan", nameZH: "荃灣", lat: 22.3713, lng: 114.1132, radius: 1.8,
    estatesPub: ["Fuk Loi Estate", "Shek Wai Kok Estate", "Clague Garden Estate"],
    estatesPri: ["Discovery Park", "Luk Yeung Sun Chuen", "Allway Gardens", "Citypoint"],
    employees: 680, pubRatio: 0.40
  },
  "Sham Tseng (深井)": {
    name: "Sham Tseng", nameZH: "深井", lat: 22.3680, lng: 114.0550, radius: 1.4,
    estatesPub: ["Sham Tseng Village HOS"],
    estatesPri: ["Bellagio", "Rhine Garden", "Sea Crest Villa", "Lido Garden"],
    employees: 230, pubRatio: 0.05
  },
  "Sham Tseng": {
    name: "Sham Tseng", nameZH: "深井", lat: 22.3680, lng: 114.0550, radius: 1.4,
    estatesPub: ["Sham Tseng Village HOS"],
    estatesPri: ["Bellagio", "Rhine Garden", "Sea Crest Villa", "Lido Garden"],
    employees: 230, pubRatio: 0.05
  },
  "Ma Wan (馬灣)": {
    name: "Ma Wan", nameZH: "馬灣", lat: 22.3512, lng: 114.0615, radius: 1.0,
    estatesPub: ["Ma Wan Rural HOS"],
    estatesPri: ["Park Island Phase 1", "Park Island Phase 2", "Park Island Phase 3", "Ma Wan Village"],
    employees: 110, pubRatio: 0.02
  },
  "Ma Wan": {
    name: "Ma Wan", nameZH: "馬灣", lat: 22.3512, lng: 114.0615, radius: 1.0,
    estatesPub: ["Ma Wan Rural HOS"],
    estatesPri: ["Park Island Phase 1", "Park Island Phase 2", "Park Island Phase 3", "Ma Wan Village"],
    employees: 110, pubRatio: 0.02
  },

  // Sha Tin
  "Sha Tin (沙田)": {
    name: "Sha Tin", nameZH: "沙田", lat: 22.3765, lng: 114.1795, radius: 2.0,
    estatesPub: ["Lek Yuen Estate", "Wo Che Estate", "Pok Hong Estate", "Jat Min Chuen"],
    estatesPri: ["City One Shatin", "Belair Gardens", "Wai Wah Centre", "Shatin Plaza"],
    employees: 750, pubRatio: 0.45
  },
  "Sha Tin": {
    name: "Sha Tin", nameZH: "沙田", lat: 22.3765, lng: 114.1795, radius: 2.0,
    estatesPub: ["Lek Yuen Estate", "Wo Che Estate", "Pok Hong Estate", "Jat Min Chuen"],
    estatesPri: ["City One Shatin", "Belair Gardens", "Wai Wah Centre", "Shatin Plaza"],
    employees: 750, pubRatio: 0.45
  },
  "Tai Wai (大圍)": {
    name: "Tai Wai", nameZH: "大圍", lat: 22.3730, lng: 114.1780, radius: 1.6,
    estatesPub: ["Mei Lam Estate", "Sun Chui Estate", "Hin Keng Estate"],
    estatesPri: ["Festival City", "Grandway Garden", "Peak One", "The Pavilia Farm"],
    employees: 580, pubRatio: 0.50
  },
  "Tai Wai": {
    name: "Tai Wai", nameZH: "大圍", lat: 22.3730, lng: 114.1780, radius: 1.6,
    estatesPub: ["Mei Lam Estate", "Sun Chui Estate", "Hin Keng Estate"],
    estatesPri: ["Festival City", "Grandway Garden", "Peak One", "The Pavilia Farm"],
    employees: 580, pubRatio: 0.50
  },
  "Fo Tan (火炭)": {
    name: "Fo Tan", nameZH: "火炭", lat: 22.3950, lng: 114.1960, radius: 1.5,
    estatesPub: ["Chun Yeung Estate", "Sui Wo Court"],
    estatesPri: ["Jubilee Garden", "The Palazzo", "Royal Ascot", "Scenery Garden"],
    employees: 390, pubRatio: 0.40
  },
  "Fo Tan": {
    name: "Fo Tan", nameZH: "火炭", lat: 22.3950, lng: 114.1960, radius: 1.5,
    estatesPub: ["Chun Yeung Estate", "Sui Wo Court"],
    estatesPri: ["Jubilee Garden", "The Palazzo", "Royal Ascot", "Scenery Garden"],
    employees: 390, pubRatio: 0.40
  },
  "Shek Mun (石門)": {
    name: "Shek Mun", nameZH: "石門", lat: 22.3880, lng: 114.2080, radius: 1.2,
    estatesPub: ["Shek Mun Estate"],
    estatesPri: ["Garden Vista", "Pictorial Garden", "Ravana Garden"],
    employees: 310, pubRatio: 0.60
  },
  "Shek Mun": {
    name: "Shek Mun", nameZH: "石門", lat: 22.3880, lng: 114.2080, radius: 1.2,
    estatesPub: ["Shek Mun Estate"],
    estatesPri: ["Garden Vista", "Pictorial Garden", "Ravana Garden"],
    employees: 310, pubRatio: 0.60
  },
  "Ma Liu Shui (馬料水)": {
    name: "Ma Liu Shui", nameZH: "馬料水", lat: 22.4140, lng: 114.2100, radius: 1.4,
    estatesPub: ["MLS Staff Quarters"],
    estatesPri: ["CUHK Residences", "Providence Bay (MLS)"],
    employees: 120, pubRatio: 0.05
  },
  "Ma Liu Shui": {
    name: "Ma Liu Shui", nameZH: "馬料水", lat: 22.4140, lng: 114.2100, radius: 1.4,
    estatesPub: ["MLS Staff Quarters"],
    estatesPri: ["CUHK Residences", "Providence Bay (MLS)"],
    employees: 120, pubRatio: 0.05
  },

  // Tai Po
  "Tai Po (大埔)": {
    name: "Tai Po", nameZH: "大埔", lat: 22.4508, lng: 114.1642, radius: 2.2,
    estatesPub: ["Tai Yuen Estate", "Fu Shin Estate", "Kwong Fuk Estate", "Fu Heng Estate"],
    estatesPri: ["Tai Po Centre", "Fortune Plaza", "Hong Lok Yuen", "Beverly Hills"],
    employees: 620, pubRatio: 0.55
  },
  "Tai Po": {
    name: "Tai Po", nameZH: "大埔", lat: 22.4508, lng: 114.1642, radius: 2.2,
    estatesPub: ["Tai Yuen Estate", "Fu Shin Estate", "Kwong Fuk Estate", "Fu Heng Estate"],
    estatesPri: ["Tai Po Centre", "Fortune Plaza", "Hong Lok Yuen", "Beverly Hills"],
    employees: 620, pubRatio: 0.55
  },
  "Tai Wo (太和)": {
    name: "Tai Wo", nameZH: "太和", lat: 22.4510, lng: 114.1600, radius: 1.2,
    estatesPub: ["Tai Wo Estate", "Po Nga Court"],
    estatesPri: ["Tai Wo Centre", "Serenity Park"],
    employees: 390, pubRatio: 0.70
  },
  "Tai Wo": {
    name: "Tai Wo", nameZH: "太和", lat: 22.4510, lng: 114.1600, radius: 1.2,
    estatesPub: ["Tai Wo Estate", "Po Nga Court"],
    estatesPri: ["Tai Wo Centre", "Serenity Park"],
    employees: 390, pubRatio: 0.70
  },
  "Pak Shek Kok (白石角)": {
    name: "Pak Shek Kok", nameZH: "白石角", lat: 22.4280, lng: 114.1980, radius: 1.5,
    estatesPub: ["Pak Shek Kok HOS"],
    estatesPri: ["Mayfair By The Sea", "St Martin", "Solaria", "Centra Lux", "Centra Horizon"],
    employees: 280, pubRatio: 0.02
  },
  "Pak Shek Kok": {
    name: "Pak Shek Kok", nameZH: "白石角", lat: 22.4280, lng: 114.1980, radius: 1.5,
    estatesPub: ["Pak Shek Kok HOS"],
    estatesPri: ["Mayfair By The Sea", "St Martin", "Solaria", "Centra Lux", "Centra Horizon"],
    employees: 280, pubRatio: 0.02
  },

  // North District
  "Fanling (粉嶺)": {
    name: "Fanling", nameZH: "粉嶺", lat: 22.4930, lng: 114.1400, radius: 2.0,
    estatesPub: ["Cheung Wah Estate", "Wah Ming Estate", "Ka Fuk Estate", "Yung Shing Court"],
    estatesPri: ["Fanling Centre", "Flora Plaza", "Dawning Views", "Green Code"],
    employees: 580, pubRatio: 0.65
  },
  "Fanling": {
    name: "Fanling", nameZH: "粉嶺", lat: 22.4930, lng: 114.1400, radius: 2.0,
    estatesPub: ["Cheung Wah Estate", "Wah Ming Estate", "Ka Fuk Estate", "Yung Shing Court"],
    estatesPri: ["Fanling Centre", "Flora Plaza", "Dawning Views", "Green Code"],
    employees: 580, pubRatio: 0.65
  },
  "Sheung Shui (上水)": {
    name: "Sheung Shui", nameZH: "上水", lat: 22.5020, lng: 114.1280, radius: 2.1,
    estatesPub: ["Choi Yuen Estate", "Tin Ping Estate", "Ching Ho Estate"],
    estatesPri: ["Sheung Shui Centre", "Metropolis Plaza", "Noble Hill", "Vienna Garden"],
    employees: 610, pubRatio: 0.70
  },
  "Sheung Shui": {
    name: "Sheung Shui", nameZH: "上水", lat: 22.5020, lng: 114.1280, radius: 2.1,
    estatesPub: ["Choi Yuen Estate", "Tin Ping Estate", "Ching Ho Estate"],
    estatesPri: ["Sheung Shui Centre", "Metropolis Plaza", "Noble Hill", "Vienna Garden"],
    employees: 610, pubRatio: 0.70
  },
  "Sha Tau Kok (沙頭角)": {
    name: "Sha Tau Kok", nameZH: "沙頭角", lat: 22.5450, lng: 114.2250, radius: 2.5,
    estatesPub: ["Sha Tau Kok Chuen"],
    estatesPri: ["Sha Tau Kok Rural Dwellings"],
    employees: 80, pubRatio: 0.80
  },
  "Sha Tau Kok": {
    name: "Sha Tau Kok", nameZH: "沙頭角", lat: 22.5450, lng: 114.2250, radius: 2.5,
    estatesPub: ["Sha Tau Kok Chuen"],
    estatesPri: ["Sha Tau Kok Rural Dwellings"],
    employees: 80, pubRatio: 0.80
  },

  // Yuen Long
  "Yuen Long (元朗)": {
    name: "Yuen Long", nameZH: "元朗", lat: 22.4445, lng: 114.0222, radius: 2.2,
    estatesPub: ["Long Ping Estate", "Shui Pin Wai Estate"],
    estatesPri: ["Yoho Town", "Yoho Midtown", "Grand Yoho", "Sun Yuen Long Centre", "Park Yoho"],
    employees: 690, pubRatio: 0.45
  },
  "Yuen Long": {
    name: "Yuen Long", nameZH: "元朗", lat: 22.4445, lng: 114.0222, radius: 2.2,
    estatesPub: ["Long Ping Estate", "Shui Pin Wai Estate"],
    estatesPri: ["Yoho Town", "Yoho Midtown", "Grand Yoho", "Sun Yuen Long Centre", "Park Yoho"],
    employees: 690, pubRatio: 0.45
  },
  "Tin Shui Wai (天水圍)": {
    name: "Tin Shui Wai", nameZH: "天水圍", lat: 22.4578, lng: 114.0022, radius: 2.3,
    estatesPub: ["Tin Heng Estate", "Tin Yat Estate", "Tin Yiu Estate", "Tin Shui Estate", "Tin Wah Estate"],
    estatesPri: ["Kingswood Villas", "Vianni Cove", "Wetland Seasons Park", "Wetland Seasons Bay"],
    employees: 720, pubRatio: 0.85
  },
  "Tin Shui Wai": {
    name: "Tin Shui Wai", nameZH: "天水圍", lat: 22.4578, lng: 114.0022, radius: 2.3,
    estatesPub: ["Tin Heng Estate", "Tin Yat Estate", "Tin Yiu Estate", "Tin Shui Estate", "Tin Wah Estate"],
    estatesPri: ["Kingswood Villas", "Vianni Cove", "Wetland Seasons Park", "Wetland Seasons Bay"],
    employees: 720, pubRatio: 0.85
  },
  "Hung Shui Kiu (洪水橋)": {
    name: "Hung Shui Kiu", nameZH: "洪水橋", lat: 22.4350, lng: 113.9960, radius: 1.6,
    estatesPub: ["Hung Fuk Estate"],
    estatesPri: ["The Grand Panorama HSK", "Villa Tiara", "Uptown"],
    employees: 320, pubRatio: 0.60
  },
  "Hung Shui Kiu": {
    name: "Hung Shui Kiu", nameZH: "洪水橋", lat: 22.4350, lng: 113.9960, radius: 1.6,
    estatesPub: ["Hung Fuk Estate"],
    estatesPri: ["The Grand Panorama HSK", "Villa Tiara", "Uptown"],
    employees: 320, pubRatio: 0.60
  },
  "Kam Tin (錦田)": {
    name: "Kam Tin", nameZH: "錦田", lat: 22.4380, lng: 114.0600, radius: 2.0,
    estatesPub: ["Kam Tin HOS"],
    estatesPri: ["Riva", "Park Yoho Genova", "Kam Tin Country Villas"],
    employees: 180, pubRatio: 0.10
  },
  "Kam Tin": {
    name: "Kam Tin", nameZH: "錦田", lat: 22.4380, lng: 114.0600, radius: 2.0,
    estatesPub: ["Kam Tin HOS"],
    estatesPri: ["Riva", "Park Yoho Genova", "Kam Tin Country Villas"],
    employees: 180, pubRatio: 0.10
  },

  // Tuen Mun
  "Tuen Mun (屯門)": {
    name: "Tuen Mun", nameZH: "屯門", lat: 22.3995, lng: 113.9749, radius: 2.5,
    estatesPub: ["Leung King Estate", "Shan King Estate", "Tin King Estate", "Po Tin Estate", "Butterfly Estate"],
    estatesPri: ["Chelsea Heights", "Century Gateway", "Blossom Garden", "Ocean Walk", "Miami Beach Towers"],
    employees: 780, pubRatio: 0.70
  },
  "Tuen Mun": {
    name: "Tuen Mun", nameZH: "屯門", lat: 22.3995, lng: 113.9749, radius: 2.5,
    estatesPub: ["Leung King Estate", "Shan King Estate", "Tin King Estate", "Po Tin Estate", "Butterfly Estate"],
    estatesPri: ["Chelsea Heights", "Century Gateway", "Blossom Garden", "Ocean Walk", "Miami Beach Towers"],
    employees: 780, pubRatio: 0.70
  },
  "Siu Hong (兆康)": {
    name: "Siu Hong", nameZH: "兆康", lat: 22.4120, lng: 113.9780, radius: 1.4,
    estatesPub: ["Siu Hong Court"],
    estatesPri: ["NOVO LAND", "Botania Villa", "Prime View Garden"],
    employees: 410, pubRatio: 0.55
  },
  "Siu Hong": {
    name: "Siu Hong", nameZH: "兆康", lat: 22.4120, lng: 113.9780, radius: 1.4,
    estatesPub: ["Siu Hong Court"],
    estatesPri: ["NOVO LAND", "Botania Villa", "Prime View Garden"],
    employees: 410, pubRatio: 0.55
  },
  "Gold Coast (黃金海岸)": {
    name: "Gold Coast", nameZH: "黃金海岸", lat: 22.3720, lng: 113.9920, radius: 1.8,
    estatesPub: ["Gold Coast Rural HOS"],
    estatesPri: ["Hong Kong Gold Coast", "Aegean Coast", "Beaulieu Peninsula"],
    employees: 210, pubRatio: 0.05
  },
  "Gold Coast": {
    name: "Gold Coast", nameZH: "黃金海岸", lat: 22.3720, lng: 113.9920, radius: 1.8,
    estatesPub: ["Gold Coast Rural HOS"],
    estatesPri: ["Hong Kong Gold Coast", "Aegean Coast", "Beaulieu Peninsula"],
    employees: 210, pubRatio: 0.05
  },

  // Sai Kung
  "Sai Kung (西貢)": {
    name: "Sai Kung", nameZH: "西貢", lat: 22.3814, lng: 114.2705, radius: 2.2,
    estatesPub: ["Lakeside Garden Estate"],
    estatesPri: ["Marina Cove", "Sai Kung Town Centre", "The Symphony", "Hong Village"],
    employees: 180, pubRatio: 0.10
  },
  "Sai Kung": {
    name: "Sai Kung", nameZH: "西貢", lat: 22.3814, lng: 114.2705, radius: 2.2,
    estatesPub: ["Lakeside Garden Estate"],
    estatesPri: ["Marina Cove", "Sai Kung Town Centre", "The Symphony", "Hong Village"],
    employees: 180, pubRatio: 0.10
  },
  "Tseung Kwan O (將軍澳)": {
    name: "Tseung Kwan O", nameZH: "將軍澳", lat: 22.3115, lng: 114.2568, radius: 2.0,
    estatesPub: ["Hau Tak Estate", "Kin Ming Estate", "Sheung Tak Estate", "Ming Tak Estate"],
    estatesPri: ["Metro Town", "The Wings", "Ocean Shores", "Park Central", "Corinthia By The Sea"],
    employees: 820, pubRatio: 0.35
  },
  "Tseung Kwan O": {
    name: "Tseung Kwan O", nameZH: "將軍澳", lat: 22.3115, lng: 114.2568, radius: 2.0,
    estatesPub: ["Hau Tak Estate", "Kin Ming Estate", "Sheung Tak Estate", "Ming Tak Estate"],
    estatesPri: ["Metro Town", "The Wings", "Ocean Shores", "Park Central", "Corinthia By The Sea"],
    employees: 820, pubRatio: 0.35
  },
  "Hang Hau (坑口)": {
    name: "Hang Hau", nameZH: "坑口", lat: 22.3160, lng: 114.2640, radius: 1.2,
    estatesPub: ["Hau Tak Estate", "Ming Tak Estate"],
    estatesPri: ["East Point City", "Residence Oasis", "On Ning Garden", "Maritime Bay"],
    employees: 480, pubRatio: 0.40
  },
  "Hang Hau": {
    name: "Hang Hau", nameZH: "坑口", lat: 22.3160, lng: 114.2640, radius: 1.2,
    estatesPub: ["Hau Tak Estate", "Ming Tak Estate"],
    estatesPri: ["East Point City", "Residence Oasis", "On Ning Garden", "Maritime Bay"],
    employees: 480, pubRatio: 0.40
  },
  "Po Lam (寶琳)": {
    name: "Po Lam", nameZH: "寶琳", lat: 22.3230, lng: 114.2570, radius: 1.3,
    estatesPub: ["Po Lam Estate", "King Lam Estate", "Ying Ming Court"],
    estatesPri: ["Metro City Phase 1", "Metro City Phase 2", "Metro City Phase 3", "Verbena Heights"],
    employees: 520, pubRatio: 0.45
  },
  "Po Lam": {
    name: "Po Lam", nameZH: "寶琳", lat: 22.3230, lng: 114.2570, radius: 1.3,
    estatesPub: ["Po Lam Estate", "King Lam Estate", "Ying Ming Court"],
    estatesPri: ["Metro City Phase 1", "Metro City Phase 2", "Metro City Phase 3", "Verbena Heights"],
    employees: 520, pubRatio: 0.45
  },
  "LOHAS Park (日出康城)": {
    name: "LOHAS Park", nameZH: "日出康城", lat: 22.2960, lng: 114.2720, radius: 1.4,
    estatesPub: ["LOHAS Park HOS"],
    estatesPri: ["The Capitol", "Le Prestige", "Hemera", "LP6", "MONTARA", "SEA TO SKY", "LP10"],
    employees: 580, pubRatio: 0.02
  },
  "LOHAS Park": {
    name: "LOHAS Park", nameZH: "日出康城", lat: 22.2960, lng: 114.2720, radius: 1.4,
    estatesPub: ["LOHAS Park HOS"],
    estatesPri: ["The Capitol", "Le Prestige", "Hemera", "LP6", "MONTARA", "SEA TO SKY", "LP10"],
    employees: 580, pubRatio: 0.02
  },
  "Tiu Keng Leng (調景嶺)": {
    name: "Tiu Keng Leng", nameZH: "調景嶺", lat: 22.3050, lng: 114.2520, radius: 1.1,
    estatesPub: ["Kin Ming Estate", "Choi Ming Court"],
    estatesPri: ["Ocean Shores", "Metro Town"],
    employees: 430, pubRatio: 0.50
  },
  "Tiu Keng Leng": {
    name: "Tiu Keng Leng", nameZH: "調景嶺", lat: 22.3050, lng: 114.2520, radius: 1.1,
    estatesPub: ["Kin Ming Estate", "Choi Ming Court"],
    estatesPri: ["Ocean Shores", "Metro Town"],
    employees: 430, pubRatio: 0.50
  },
  "Clear Water Bay (清水灣)": {
    name: "Clear Water Bay", nameZH: "清水灣", lat: 22.2880, lng: 114.2880, radius: 2.2,
    estatesPub: ["Clear Water Bay HOS"],
    estatesPri: ["Mount Pavilia", "Clear Water Bay Knoll", "Silverstrand Villa"],
    employees: 120, pubRatio: 0.02
  },
  "Clear Water Bay": {
    name: "Clear Water Bay", nameZH: "清水灣", lat: 22.2880, lng: 114.2880, radius: 2.2,
    estatesPub: ["Clear Water Bay HOS"],
    estatesPri: ["Mount Pavilia", "Clear Water Bay Knoll", "Silverstrand Villa"],
    employees: 120, pubRatio: 0.02
  },

  // Islands
  "Tung Chung (東涌)": {
    name: "Tung Chung", nameZH: "東涌", lat: 22.2885, lng: 113.9452, radius: 2.5,
    estatesPub: ["Yat Tung Estate", "Fu Tung Estate", "Ying Tung Estate", "Mun Tung Estate"],
    estatesPri: ["Caribbean Coast", "Tung Chung Crescent", "Coastal Skyline", "The Visionary", "Century Link"],
    employees: 640, pubRatio: 0.60
  },
  "Tung Chung": {
    name: "Tung Chung", nameZH: "東涌", lat: 22.2885, lng: 113.9452, radius: 2.5,
    estatesPub: ["Yat Tung Estate", "Fu Tung Estate", "Ying Tung Estate", "Mun Tung Estate"],
    estatesPri: ["Caribbean Coast", "Tung Chung Crescent", "Coastal Skyline", "The Visionary", "Century Link"],
    employees: 640, pubRatio: 0.60
  },
  "Airport (香港國際機場)": {
    name: "Airport", nameZH: "香港國際機場", lat: 22.3080, lng: 113.9185, radius: 3.0,
    estatesPub: ["Airport Staff Quarters"],
    estatesPri: ["Airport Quarter Residences", "Cathay Pacific City Quarters"],
    employees: 150, pubRatio: 0.05
  },
  "Airport": {
    name: "Airport", nameZH: "香港國際機場", lat: 22.3080, lng: 113.9185, radius: 3.0,
    estatesPub: ["Airport Staff Quarters"],
    estatesPri: ["Airport Quarter Residences", "Cathay Pacific City Quarters"],
    employees: 150, pubRatio: 0.05
  },
  "Discovery Bay (愉景灣)": {
    name: "Discovery Bay", nameZH: "愉景灣", lat: 22.2965, lng: 114.0152, radius: 2.2,
    estatesPub: ["Discovery Bay Staff Quarters"],
    estatesPri: ["Discovery Bay Phase 1", "Discovery Bay Phase 5", "Discovery Bay Phase 12", "La Vista"],
    employees: 160, pubRatio: 0.01
  },
  "Discovery Bay": {
    name: "Discovery Bay", nameZH: "愉景灣", lat: 22.2965, lng: 114.0152, radius: 2.2,
    estatesPub: ["Discovery Bay Staff Quarters"],
    estatesPri: ["Discovery Bay Phase 1", "Discovery Bay Phase 5", "Discovery Bay Phase 12", "La Vista"],
    employees: 160, pubRatio: 0.01
  },
  "Disneyland (香港迪士尼)": {
    name: "Disneyland", nameZH: "香港迪士尼", lat: 22.3130, lng: 114.0410, radius: 2.0,
    estatesPub: ["Disneyland Cast Housing"],
    estatesPri: ["Disneyland Resort Staff Quarters"],
    employees: 90, pubRatio: 0.02
  },
  "Disneyland": {
    name: "Disneyland", nameZH: "香港迪士尼", lat: 22.3130, lng: 114.0410, radius: 2.0,
    estatesPub: ["Disneyland Cast Housing"],
    estatesPri: ["Disneyland Resort Staff Quarters"],
    employees: 90, pubRatio: 0.02
  },
  "Mui Wo (梅窩)": {
    name: "Mui Wo", nameZH: "梅窩", lat: 22.2650, lng: 114.0000, radius: 2.0,
    estatesPub: ["Ngan King Estate", "Ngan Wan Estate"],
    estatesPri: ["Mui Wo Village Dwellings", "River View Villa"],
    employees: 110, pubRatio: 0.50
  },
  "Mui Wo": {
    name: "Mui Wo", nameZH: "梅窩", lat: 22.2650, lng: 114.0000, radius: 2.0,
    estatesPub: ["Ngan King Estate", "Ngan Wan Estate"],
    estatesPri: ["Mui Wo Village Dwellings", "River View Villa"],
    employees: 110, pubRatio: 0.50
  },
  "Tai O (大澳)": {
    name: "Tai O", nameZH: "大澳", lat: 22.2530, lng: 113.8630, radius: 2.0,
    estatesPub: ["Lung Tin Estate"],
    estatesPri: ["Tai O Stilt Houses & Heritage Dwellings"],
    employees: 70, pubRatio: 0.70
  },
  "Tai O": {
    name: "Tai O", nameZH: "大澳", lat: 22.2530, lng: 113.8630, radius: 2.0,
    estatesPub: ["Lung Tin Estate"],
    estatesPri: ["Tai O Stilt Houses & Heritage Dwellings"],
    employees: 70, pubRatio: 0.70
  },
  "Cheung Chau (長洲)": {
    name: "Cheung Chau", nameZH: "長洲", lat: 22.2084, lng: 114.0289, radius: 2.0,
    estatesPub: ["Cheung Kwai Estate", "Nga Ning Court"],
    estatesPri: ["Scenic Crest", "Cheung Chau Townhouse"],
    employees: 140, pubRatio: 0.50
  },
  "Cheung Chau": {
    name: "Cheung Chau", nameZH: "長洲", lat: 22.2084, lng: 114.0289, radius: 2.0,
    estatesPub: ["Cheung Kwai Estate", "Nga Ning Court"],
    estatesPri: ["Scenic Crest", "Cheung Chau Townhouse"],
    employees: 140, pubRatio: 0.50
  },
  "Peng Chau (坪洲)": {
    name: "Peng Chau", nameZH: "坪洲", lat: 22.2850, lng: 114.0380, radius: 1.5,
    estatesPub: ["Kam Peng Estate"],
    estatesPri: ["Peng Chau Waterfront Villas"],
    employees: 80, pubRatio: 0.60
  },
  "Peng Chau": {
    name: "Peng Chau", nameZH: "坪洲", lat: 22.2850, lng: 114.0380, radius: 1.5,
    estatesPub: ["Kam Peng Estate"],
    estatesPri: ["Peng Chau Waterfront Villas"],
    employees: 80, pubRatio: 0.60
  },
  "Lamma Island (南丫島)": {
    name: "Lamma Island", nameZH: "南丫島", lat: 22.2260, lng: 114.1130, radius: 2.5,
    estatesPub: ["Lamma Local Quarters"],
    estatesPri: ["Yung Shue Wan Village Houses", "Sok Kwu Wan Residences"],
    employees: 90, pubRatio: 0.05
  },
  "Lamma Island": {
    name: "Lamma Island", nameZH: "南丫島", lat: 22.2260, lng: 114.1130, radius: 2.5,
    estatesPub: ["Lamma Local Quarters"],
    estatesPri: ["Yung Shue Wan Village Houses", "Sok Kwu Wan Residences"],
    employees: 90, pubRatio: 0.05
  },

  // Legacy Compound Keys for backwards compatibility
  "Tsuen Wan West / Sham Tseng": {
    name: "Tsuen Wan West / Sham Tseng", nameZH: "荃灣西 / 深井", lat: 22.3701, lng: 114.0765, radius: 3.5,
    estatesPub: ["Fuk Loi Estate", "Lei Muk Shue Estate"],
    estatesPri: ["Belvedere Garden", "Rhine Garden", "Bellagio", "The Riviera", "Tsuen Wan West Station"],
    employees: 450, pubRatio: 0.20
  },
  "Tsuen Wan Town": {
    name: "Tsuen Wan Town", nameZH: "荃灣市中心", lat: 22.3713, lng: 114.1132, radius: 2.0,
    estatesPub: ["Shek Wai Kok Estate", "Clague Garden Estate"],
    estatesPri: ["Discovery Park", "Luk Yeung Sun Chuen", "Allway Gardens", "Citypoint"],
    employees: 504, pubRatio: 0.40
  },
  "Kwai Chung / Kwai Fong": {
    name: "Kwai Chung / Kwai Fong", nameZH: "葵涌 / 葵芳", lat: 22.3569, lng: 114.1281, radius: 2.2,
    estatesPub: ["Kwai Chung Estate", "Lai King Estate", "Shek Lei Estate", "Shek Yam Estate"],
    estatesPri: ["Kwai Fong Terrace", "Metroplaza Towers", "New Kwai Fong Gardens"],
    employees: 640, pubRatio: 0.70
  },
  "Ma Wan / Park Island": {
    name: "Ma Wan / Park Island", nameZH: "馬灣 / 珀麗灣", lat: 22.3512, lng: 114.0615, radius: 1.2,
    estatesPub: ["Tin Wan House (Island Area)"],
    estatesPri: ["Park Island Phase 1", "Park Island Phase 2", "Park Island Phase 3", "Ma Wan Village"],
    employees: 110, pubRatio: 0.05
  },
  "Tuen Mun Town & North": {
    name: "Tuen Mun Town & North", nameZH: "屯門市中心及北部", lat: 22.3995, lng: 113.9749, radius: 3.0,
    estatesPub: ["Leung King Estate", "Shan King Estate", "Tin King Estate", "Po Tin Estate"],
    estatesPri: ["Blossom Garden", "Chelsea Heights", "Century Gateway", "Prime View Garden"],
    employees: 580, pubRatio: 0.75
  },
  "Tuen Mun South / Gold Coast": {
    name: "Tuen Mun South / Gold Coast", nameZH: "屯門南及黃金海岸", lat: 22.3789, lng: 113.9875, radius: 3.2,
    estatesPub: ["Butterfly Estate", "Wu King Estate", "On Ting Estate"],
    estatesPri: ["Hong Kong Gold Coast", "Miami Beach Towers", "Marina Cove"],
    employees: 540, pubRatio: 0.60
  },
  "Yuen Long Town": {
    name: "Yuen Long Town", nameZH: "元朗市中心", lat: 22.4445, lng: 114.0222, radius: 2.5,
    estatesPub: ["Long Ping Estate", "Shui Pin Wai Estate"],
    estatesPri: ["Yoho Town", "Yoho Midtown", "Sun Yuen Long Centre", "Grand Yoho"],
    employees: 550, pubRatio: 0.50
  },
  "Fanling / Sheung Shui": {
    name: "Fanling / Sheung Shui", nameZH: "粉嶺 / 上水", lat: 22.4988, lng: 114.1354, radius: 3.8,
    estatesPub: ["Choi Yuen Estate", "Cheung Wah Estate", "Wah Ming Estate", "Ka Fuk Estate"],
    estatesPri: ["Fanling Centre", "Sheung Shui Centre", "Noble Hill", "Green Code", "Vienna Garden"],
    employees: 620, pubRatio: 0.75
  },
  "Tai Po Town": {
    name: "Tai Po Town", nameZH: "大埔市中心", lat: 22.4508, lng: 114.1642, radius: 3.5,
    estatesPub: ["Tai Yuen Estate", "Fu Shin Estate", "Kwong Fuk Estate", "Tai Wo Estate"],
    estatesPri: ["Tai Po Centre", "Fortune Plaza", "Hong Lok Yuen", "Beverly Hills"],
    employees: 510, pubRatio: 0.55
  },
  "Sha Tin / Tai Wai": {
    name: "Sha Tin / Tai Wai", nameZH: "沙田 / 大圍", lat: 22.3765, lng: 114.1795, radius: 3.2,
    estatesPub: ["Lek Yuen Estate", "Mei Lam Estate", "Pok Hong Estate", "Sun Chui Estate"],
    estatesPri: ["City One Shatin", "Festival City", "Belair Gardens", "Wai Wah Centre"],
    employees: 740, pubRatio: 0.45
  },
  "Ma On Shan / Fo Tan": {
    name: "Ma On Shan / Fo Tan", nameZH: "馬鞍山 / 火炭", lat: 22.4225, lng: 114.2305, radius: 3.0,
    estatesPub: ["Yiu On Estate", "Sui Wo Court", "Chun Yeung Estate"],
    estatesPri: ["Sunshine City", "Symphony Bay", "Villa Athena", "Double Cove"],
    employees: 650, pubRatio: 0.35
  },
  "Sai Kung Town": {
    name: "Sai Kung Town", nameZH: "西貢市中心", lat: 22.3814, lng: 114.2705, radius: 2.5,
    estatesPub: ["Lakeside Garden Estate"],
    estatesPri: ["Marina Cove", "Sai Kung Town Centre", "The Symphony", "Hong Village"],
    employees: 130, pubRatio: 0.10
  },
  "Lai Chi Kok / Mei Foo": {
    name: "Lai Chi Kok / Mei Foo", nameZH: "荔枝角 / 美孚", lat: 22.3372, lng: 114.1398, radius: 1.5,
    estatesPub: ["Lai Kok Estate", "Un Chau Estate"],
    estatesPri: ["Mei Foo Sun Chuen", "Manhattan Hill", "Banyan Garden", "Liberte", "The Pacifica"],
    employees: 380, pubRatio: 0.35
  },
  "Cheung Sha Wan / Sham Shui Po": {
    name: "Cheung Sha Wan / Sham Shui Po", nameZH: "長沙灣 / 深水埗", lat: 22.3307, lng: 114.1622, radius: 1.6,
    estatesPub: ["Nam Shan Estate", "So Uk Estate", "Shek Kip Mei Estate", "Fu Cheong Estate"],
    estatesPri: ["Dynasty Heights", "The Sparkle", "Heya Green", "Trinity Towers"],
    employees: 350, pubRatio: 0.80
  },
  "Mong Kok / Tai Kok Tsui": {
    name: "Mong Kok / Tai Kok Tsui", nameZH: "旺角 / 大角咀", lat: 22.3195, lng: 114.1685, radius: 1.4,
    estatesPub: ["Hoi Fu Court", "Charming Garden"],
    estatesPri: ["The Hermitage", "Island Harbourview", "Metro Harbour View", "Grand Century Place"],
    employees: 300, pubRatio: 0.20
  },
  "Tsim Sha Tsui / Jordan": {
    name: "Tsim Sha Tsui / Jordan", nameZH: "尖沙咀 / 佐敦", lat: 22.2988, lng: 114.1722, radius: 1.2,
    estatesPub: ["Prosperous Garden"],
    estatesPri: ["Sorrento", "The Arch", "The Cullinan", "Harbour Pinnacle", "The Masterpiece"],
    employees: 200, pubRatio: 0.05
  },
  "Hung Hom / To Kwa Wan": {
    name: "Hung Hom / To Kwa Wan", nameZH: "紅磡 / 土瓜灣", lat: 22.3125, lng: 114.1865, radius: 1.6,
    estatesPub: ["Oi Man Estate", "Ka Wai Chuen"],
    estatesPri: ["Whampoa Garden", "Laguna Verde", "Grand Waterfront", "Stars by the Harbour"],
    employees: 350, pubRatio: 0.25
  },
  "Kowloon City / Kai Tak": {
    name: "Kowloon City / Kai Tak", nameZH: "九龍城 / 啟德", lat: 22.3282, lng: 114.1917, radius: 1.5,
    estatesPub: ["Kai Ching Estate", "Tak Long Estate", "Ma Tau Wai Estate"],
    estatesPri: ["Kadoorie Hill", "One Homantin", "Victoria Skye", "Oasis Kai Tak", "K. Summit"],
    employees: 320, pubRatio: 0.40
  },
  "Wong Tai Sin / Diamond Hill": {
    name: "Wong Tai Sin / Diamond Hill", nameZH: "黃大仙 / 鑽石山", lat: 22.3417, lng: 114.1977, radius: 1.8,
    estatesPub: ["Choi Hung Estate", "Tsz Lok Estate", "Lok Fu Estate", "Tsz Oi Court"],
    estatesPri: ["Aria", "Rhythm Garden", "Scenic View", "The Forest Hill"],
    employees: 720, pubRatio: 0.85
  },
  "Kwun Tong Town": {
    name: "Kwun Tong Town", nameZH: "觀塘市中心", lat: 22.3138, lng: 114.2258, radius: 2.0,
    estatesPub: ["Tsui Ping Estate", "Sau Mau Ping Estate", "Shun Lee Estate", "On Tat Estate"],
    estatesPri: ["Grand Central", "Laguna City", "Sceneway Garden Phase 1"],
    employees: 800, pubRatio: 0.65
  },
  "Lam Tin / Yau Tong": {
    name: "Lam Tin / Yau Tong", nameZH: "藍田 / 油塘", lat: 22.2985, lng: 114.2385, radius: 1.8,
    estatesPub: ["Tak Tin Estate", "Yau Lai Estate", "Ping Tin Estate", "Ko Cheung Court"],
    estatesPri: ["Sceneway Garden Phase 2", "Peninsula East", "Maya", "The Coast Line"],
    employees: 542, pubRatio: 0.60
  },
  "Quarry Bay / Taikoo": {
    name: "Quarry Bay / Taikoo", nameZH: "鰂魚涌 / 太古", lat: 22.2854, lng: 114.2128, radius: 1.5,
    estatesPub: ["Model Housing Estate"],
    estatesPri: ["Taikoo Shing", "Kornhill", "Mount Parker Residences", "The Orchards"],
    employees: 450, pubRatio: 0.10
  },
  "North Point / Fortress Hill": {
    name: "North Point / Fortress Hill", nameZH: "北角 / 炮台山", lat: 22.2905, lng: 114.1985, radius: 1.5,
    estatesPub: ["Healthy Village"],
    estatesPri: ["City Garden", "Provident Centre", "Fleur Pavilia", "Harbour East"],
    employees: 350, pubRatio: 0.10
  },
  "Chai Wan / Shau Kei Wan": {
    name: "Chai Wan / Shau Kei Wan", nameZH: "柴灣 / 筲箕灣", lat: 22.2741, lng: 114.2341, radius: 2.2,
    estatesPub: ["Hing Wah Estate", "Chai Wan Estate", "Yiu Tung Estate", "Oi Tung Estate"],
    estatesPri: ["Heng Fa Chuen", "Grand Promenade", "Perfect Mount Gardens", "Les Saisons"],
    employees: 650, pubRatio: 0.45
  },
  "Wan Chai / Causeway Bay": {
    name: "Wan Chai / Causeway Bay", nameZH: "灣仔 / 銅鑼灣", lat: 22.2797, lng: 114.1717, radius: 1.5,
    estatesPub: ["Lai Tak Tsuen"],
    estatesPri: ["Elizabeth House", "Blue Pool Court", "Illumination Terrace", "The Peak Tower"],
    employees: 260, pubRatio: 0.10
  },
  "Central / Admiralty / Sheung Wan": {
    name: "Central / Admiralty / Sheung Wan", nameZH: "中環 / 金鐘 / 上環", lat: 22.2865, lng: 114.1541, radius: 1.6,
    estatesPub: ["Kwun Lung Lau", "Sai Ying Pun Estate"],
    estatesPri: ["Robinson Place", "The Belcher's", "The Merton", "Academic Terrace", "SOHO Towers"],
    employees: 340, pubRatio: 0.15
  },
  "Aberdeen / Ap Lei Chau": {
    name: "Aberdeen / Ap Lei Chau", nameZH: "香港仔 / 鴨脷洲", lat: 22.2473, lng: 114.1588, radius: 2.0,
    estatesPub: ["Shek Pai Wan Estate", "Ap Lei Chau Estate"],
    estatesPri: ["South Horizons", "Baguio Villa", "Larvotto", "Marinella", "Aberdeen Centre"],
    employees: 420, pubRatio: 0.40
  },
  "Tung Chung / Airport": {
    name: "Tung Chung / Airport", nameZH: "東涌 / 機場", lat: 22.2885, lng: 113.9452, radius: 4.5,
    estatesPub: ["Yat Tung Estate", "Fu Tung Estate", "Ying Tung Estate"],
    estatesPri: ["Caribbean Coast", "Tung Chung Crescent", "Coastal Skyline", "The Visionary"],
    employees: 180, pubRatio: 0.60
  },
  "Islands District": {
    name: "Islands District", nameZH: "離島區", lat: 22.2084, lng: 114.0289, radius: 5.0,
    estatesPub: ["Cheung Kwai Estate", "Nga Ning Court", "Lung Tin Estate"],
    estatesPri: ["Scenic Crest", "Peninsula Marina", "Seaview Crescent", "Cheung Chau Townhouse", "Lamma Beachside Villa"],
    employees: 120, pubRatio: 0.40
  }
};

export const LOCAL_GEODATA_BASE: GeodataItem[] = [
  // Tsuen Wan West / Sham Tseng
  { name: "Belvedere Garden", nameZH: "麗城花園", area: "Tsuen Wan West / Sham Tseng", type: "Private", lat: 22.3707, lng: 114.1039 },
  { name: "Rhine Garden", nameZH: "海韻花園", area: "Tsuen Wan West / Sham Tseng", type: "Private", lat: 22.3688, lng: 114.0621 },
  { name: "Bellagio", nameZH: "碧堤半島", area: "Tsuen Wan West / Sham Tseng", type: "Private", lat: 22.3676, lng: 114.0565 },
  { name: "Lido Garden", nameZH: "麗都花園", area: "Tsuen Wan West / Sham Tseng", type: "Private", lat: 22.3681, lng: 114.0581 },
  { name: "Hong Kong Garden", nameZH: "豪景花園", area: "Tsuen Wan West / Sham Tseng", type: "Private", lat: 22.3623, lng: 114.0401 },
  { name: "Bayview Garden", nameZH: "灣景花園", area: "Tsuen Wan West / Sham Tseng", type: "Private", lat: 22.3705, lng: 114.1051 },
  { name: "Greenview Court", nameZH: "翠濤閣", area: "Tsuen Wan West / Sham Tseng", type: "Private", lat: 22.3718, lng: 114.1042 },
  { name: "Serenade Cove", nameZH: "韻濤居", area: "Tsuen Wan West / Sham Tseng", type: "Private", lat: 22.3731, lng: 114.1032 },
  { name: "Allway Gardens", nameZH: "荃威花園", area: "Tsuen Wan West / Sham Tseng", type: "Private", lat: 22.3775, lng: 114.1055 },
  { name: "Riviera Gardens", nameZH: "海濱花園", area: "Tsuen Wan West / Sham Tseng", type: "Private", lat: 22.3621, lng: 114.1165 },
  { name: "Waterside Plaza", nameZH: "海灣花園", area: "Tsuen Wan West / Sham Tseng", type: "Private", lat: 22.3605, lng: 114.1182 },
  { name: "Citypoint", nameZH: "環宇海灣", area: "Tsuen Wan West / Sham Tseng", type: "Private", lat: 22.3595, lng: 114.1205 },
  { name: "Ocean Pride", nameZH: "海之戀", area: "Tsuen Wan West / Sham Tseng", type: "Private", lat: 22.3685, lng: 114.1118 },
  { name: "Parc City", nameZH: "全城匯", area: "Tsuen Wan West / Sham Tseng", type: "Private", lat: 22.3701, lng: 114.1129 },
  { name: "The Pavilia Bay", nameZH: "柏傲灣", area: "Tsuen Wan West / Sham Tseng", type: "Private", lat: 22.3672, lng: 114.1155 },
  { name: "Clague Garden Estate", nameZH: "祈德尊新邨", area: "Tsuen Wan West / Sham Tseng", type: "Public", lat: 22.3702, lng: 114.1098 },

  // Tsuen Wan Town
  { name: "Discovery Park", nameZH: "愉景新城", area: "Tsuen Wan Town", type: "Private", lat: 22.3756, lng: 114.1114 },
  { name: "Luk Yeung Sun Chuen", nameZH: "綠楊新邨", area: "Tsuen Wan Town", type: "Private", lat: 22.3732, lng: 114.1192 },
  { name: "Tsuen Wan Plaza", nameZH: "荃灣廣場", area: "Tsuen Wan Town", type: "Private", lat: 22.3718, lng: 114.1108 },
  { name: "Skyline Plaza", nameZH: "灣景廣場", area: "Tsuen Wan Town", type: "Private", lat: 22.3712, lng: 114.1115 },
  { name: "Vision City", nameZH: "萬景峯", area: "Tsuen Wan Town", type: "Private", lat: 22.3695, lng: 114.1141 },
  { name: "Fuk Loi Estate", nameZH: "福來邨", area: "Tsuen Wan Town", type: "Public", lat: 22.3725, lng: 114.1121 },
  { name: "Shek Wai Kok Estate", nameZH: "石圍角邨", area: "Tsuen Wan Town", type: "Public", lat: 22.3768, lng: 114.1255 },
  { name: "Lei Muk Shue Estate", nameZH: "梨木樹邨", area: "Tsuen Wan Town", type: "Public", lat: 22.3792, lng: 114.1345 },
  { name: "Cheung Shan Estate", nameZH: "象山邨", area: "Tsuen Wan Town", type: "Public", lat: 22.3821, lng: 114.1311 },
  { name: "Tsuen Wan Centre", nameZH: "荃灣中心", area: "Tsuen Wan Town", type: "Private", lat: 22.3795, lng: 114.1085 },

  // Kwai Chung / Kwai Fong
  { name: "Kwai Chung Estate", nameZH: "葵涌邨", area: "Kwai Chung / Kwai Fong", type: "Public", lat: 22.3645, lng: 114.1245 },
  { name: "Lai King Estate", nameZH: "荔景邨", area: "Kwai Chung / Kwai Fong", type: "Public", lat: 22.3488, lng: 114.1265 },
  { name: "Shek Lei Estate", nameZH: "石籬邨", area: "Kwai Chung / Kwai Fong", type: "Public", lat: 22.3665, lng: 114.1378 },
  { name: "Shek Yam Estate", nameZH: "石蔭邨", area: "Kwai Chung / Kwai Fong", type: "Public", lat: 22.3708, lng: 114.1362 },
  { name: "Kwai Fong Estate", nameZH: "葵芳邨", area: "Kwai Chung / Kwai Fong", type: "Public", lat: 22.3568, lng: 114.1252 },
  { name: "Kwai Shing East Estate", nameZH: "葵盛東邨", area: "Kwai Chung / Kwai Fong", type: "Public", lat: 22.3615, lng: 114.1215 },
  { name: "Kwai Shing West Estate", nameZH: "葵盛西邨", area: "Kwai Chung / Kwai Fong", type: "Public", lat: 22.3601, lng: 114.1165 },
  { name: "Kwai Hing Estate", nameZH: "葵興邨", area: "Kwai Chung / Kwai Fong", type: "Public", lat: 22.3625, lng: 114.1305 },
  { name: "Tai Wo Hau Estate", nameZH: "大窩口邨", area: "Kwai Chung / Kwai Fong", type: "Public", lat: 22.3651, lng: 114.1201 },
  { name: "Metroplaza Towers", nameZH: "新都會廣場", area: "Kwai Chung / Kwai Fong", type: "Private", lat: 22.3575, lng: 114.1265 },
  { name: "Kwai Fong Terrace", nameZH: "葵芳閣", area: "Kwai Chung / Kwai Fong", type: "Private", lat: 22.3591, lng: 114.1288 },
  { name: "New Kwai Fong Gardens", nameZH: "新葵芳花園", area: "Kwai Chung / Kwai Fong", type: "Private", lat: 22.3565, lng: 114.1275 },

  // Tsing Yi
  { name: "Tierra Verde", nameZH: "盈翠半島", area: "Tsing Yi", type: "Private", lat: 22.3601, lng: 114.1065 },
  { name: "Villa Esplanada", nameZH: "灝景灣", area: "Tsing Yi", type: "Private", lat: 22.3635, lng: 114.1035 },
  { name: "Greenfield Garden", nameZH: "翠怡花園", area: "Tsing Yi", type: "Private", lat: 22.3532, lng: 114.1062 },
  { name: "Rambler Crest", nameZH: "藍澄灣", area: "Tsing Yi", type: "Private", lat: 22.3445, lng: 114.1085 },
  { name: "Cheung On Estate", nameZH: "長安邨", area: "Tsing Yi", type: "Public", lat: 22.3615, lng: 114.1005 },
  { name: "Cheung Ching Estate", nameZH: "長青邨", area: "Tsing Yi", type: "Public", lat: 22.3438, lng: 114.1068 },
  { name: "Tsing Yi Estate", nameZH: "青衣邨", area: "Tsing Yi", type: "Public", lat: 22.3545, lng: 114.1001 },
  { name: "Broadview Garden", nameZH: "偉景花園", area: "Tsing Yi", type: "Private", lat: 22.3521, lng: 114.1025 },
  { name: "Mount Haven", nameZH: "曉峰園", area: "Tsing Yi", type: "Private", lat: 22.3582, lng: 114.0935 },
  { name: "Easeful Court", nameZH: "青逸軒", area: "Tsing Yi", type: "Private", lat: 22.3605, lng: 114.0988 },
  { name: "Tivoli Garden", nameZH: "宏福花園", area: "Tsing Yi", type: "Private", lat: 22.3553, lng: 114.1075 },  

  // Ma Wan / Park Island
  { name: "Park Island", nameZH: "珀麗灣", area: "Ma Wan / Park Island", type: "Private", lat: 22.3518, lng: 114.0625 },
  { name: "Ma Wan Village", nameZH: "馬灣漁村", area: "Ma Wan / Park Island", type: "Private", lat: 22.3495, lng: 114.0592 },

  // Tuen Mun Town & North
  { name: "Chelsea Heights", nameZH: "卓爾居", area: "Tuen Mun Town & North", type: "Private", lat: 22.4045, lng: 113.9755 },
  { name: "Century Gateway", nameZH: "瓏門", area: "Tuen Mun Town & North", type: "Private", lat: 22.3965, lng: 113.9785 },
  { name: "Blossom Garden", nameZH: "怡樂花園", area: "Tuen Mun Town & North", type: "Private", lat: 22.4075, lng: 113.9765 },
  { name: "Prime View Garden", nameZH: "景峰花園", area: "Tuen Mun Town & North", type: "Private", lat: 22.4048, lng: 113.9791 },
  { name: "Tuen Mun Town Plaza", nameZH: "屯門市廣場", area: "Tuen Mun Town & North", type: "Private", lat: 22.3925, lng: 113.9772 },
  { name: "Trend Plaza", nameZH: "時代廣場", area: "Tuen Mun Town & North", type: "Private", lat: 22.3918, lng: 113.9765 },
  { name: "Leung King Estate", nameZH: "良景邨", area: "Tuen Mun Town & North", type: "Public", lat: 22.4065, lng: 113.9625 },
  { name: "Shan King Estate", nameZH: "山景邨", area: "Tuen Mun Town & North", type: "Public", lat: 22.3951, lng: 113.9642 },
  { name: "Tin King Estate", nameZH: "田景邨", area: "Tuen Mun Town & North", type: "Public", lat: 22.4091, lng: 113.9665 },
  { name: "Po Tin Estate", nameZH: "寶田邨", area: "Tuen Mun Town & North", type: "Public", lat: 22.4132, lng: 113.9681 },
  { name: "Tai Hing Estate", nameZH: "大興邨", area: "Tuen Mun Town & North", type: "Public", lat: 22.4022, lng: 113.9715 },

  // Tuen Mun South / Gold Coast
  { name: "Hong Kong Gold Coast", nameZH: "黃金海岸", area: "Tuen Mun South / Gold Coast", type: "Private", lat: 22.3712, lng: 113.9912 },
  { name: "Butterfly Estate", nameZH: "蝴蝶邨", area: "Tuen Mun South / Gold Coast", type: "Public", lat: 22.3752, lng: 113.9625 },
  { name: "Wu King Estate", nameZH: "湖景邨", area: "Tuen Mun South / Gold Coast", type: "Public", lat: 22.3725, lng: 113.9662 },
  { name: "On Ting Estate", nameZH: "安定邨", area: "Tuen Mun South / Gold Coast", type: "Public", lat: 22.3862, lng: 113.9768 },
  { name: "Yau Oi Estate", nameZH: "友愛邨", area: "Tuen Mun South / Gold Coast", type: "Public", lat: 22.3831, lng: 113.9745 },
  { name: "Miami Beach Towers", nameZH: "邁亞美海灣", area: "Tuen Mun South / Gold Coast", type: "Private", lat: 22.3695, lng: 113.9655 },
  { name: "Sun Tuen Mun Centre", nameZH: "新屯門中心", area: "Tuen Mun South / Gold Coast", type: "Private", lat: 22.3805, lng: 113.9592 },
  { name: "Pierhead Garden", nameZH: "啟豐園", area: "Tuen Mun South / Gold Coast", type: "Private", lat: 22.3688, lng: 113.9678 },
  { name: "Hanford Garden", nameZH: "恆福花園", area: "Tuen Mun South / Gold Coast", type: "Private", lat: 22.3748, lng: 113.9791 },

  // Yuen Long Town
  { name: "Yoho Town", nameZH: "新時代廣場", area: "Yuen Long Town", type: "Private", lat: 22.4431, lng: 114.0378 },
  { name: "Yoho Midtown", nameZH: "麗新時代", area: "Yuen Long Town", type: "Private", lat: 22.4418, lng: 114.0352 },
  { name: "Grand Yoho", nameZH: "朗晴", area: "Yuen Long Town", type: "Private", lat: 22.4442, lng: 114.0391 },
  { name: "Sun Yuen Long Centre", nameZH: "新元朗中心", area: "Yuen Long Town", type: "Private", lat: 22.4449, lng: 114.0345 },
  { name: "Long Ping Estate", nameZH: "朗屏邨", area: "Yuen Long Town", type: "Public", lat: 22.4495, lng: 114.0222 },
  { name: "Shui Pin Wai Estate", nameZH: "水邊圍邨", area: "Yuen Long Town", type: "Public", lat: 22.4452, lng: 114.0182 },
  { name: "Sereno Verde", nameZH: "蝶翠峰", area: "Yuen Long Town", type: "Private", lat: 22.4348, lng: 114.0325 },
  { name: "The Reach", nameZH: "尚悅", area: "Yuen Long Town", type: "Private", lat: 22.4332, lng: 114.0368 },

  // Tin Shui Wai
  { name: "Kingswood Villas", nameZH: "嘉湖山莊", area: "Tin Shui Wai", type: "Private", lat: 22.4572, lng: 114.0035 },
  { name: "Wetland Seasons Park", nameZH: "濕地公園路", area: "Tin Shui Wai", type: "Private", lat: 22.4682, lng: 114.0055 },
  { name: "Vianni Cove", nameZH: "慧景軒", area: "Tin Shui Wai", type: "Private", lat: 22.4651, lng: 114.0041 },
  { name: "Tin Heng Estate", nameZH: "天恆邨", area: "Tin Shui Wai", type: "Public", lat: 22.4695, lng: 114.0012 },
  { name: "Tin Yat Estate", nameZH: "天逸邨", area: "Tin Shui Wai", type: "Public", lat: 22.4665, lng: 113.9995 },
  { name: "Tin Yiu Estate", nameZH: "天耀邨", area: "Tin Shui Wai", type: "Public", lat: 22.4505, lng: 114.0028 },
  { name: "Tin Shui Estate", nameZH: "天瑞邨", area: "Tin Shui Wai", type: "Public", lat: 22.4568, lng: 113.9985 },
  { name: "Grandeur Terrace", nameZH: "俊宏軒", area: "Tin Shui Wai", type: "Public", lat: 22.4678, lng: 114.0002 },

  // Fanling / Sheung Shui
  { name: "Fanling Centre", nameZH: "粉嶺中心", area: "Fanling / Sheung Shui", type: "Private", lat: 22.4912, lng: 114.1395 },
  { name: "Sheung Shui Centre", nameZH: "上水中心", area: "Fanling / Sheung Shui", type: "Private", lat: 22.5022, lng: 114.1295 },
  { name: "Noble Hill", nameZH: "皇府山", area: "Fanling / Sheung Shui", type: "Private", lat: 22.5085, lng: 114.1311 },
  { name: "Green Code", nameZH: "逸峯", area: "Fanling / Sheung Shui", type: "Private", lat: 22.4972, lng: 114.1442 },
  { name: "Vienna Garden", nameZH: "維也納花園", area: "Fanling / Sheung Shui", type: "Private", lat: 22.4938, lng: 114.1235 },
  { name: "Choi Yuen Estate", nameZH: "彩園邨", area: "Fanling / Sheung Shui", type: "Public", lat: 22.5015, lng: 114.1221 },
  { name: "Cheung Wah Estate", nameZH: "祥華邨", area: "Fanling / Sheung Shui", type: "Public", lat: 22.4925, lng: 114.1438 },
  { name: "Wah Ming Estate", nameZH: "華明邨", area: "Fanling / Sheung Shui", type: "Public", lat: 22.4845, lng: 114.1398 },
  { name: "Ka Fuk Estate", nameZH: "嘉福邨", area: "Fanling / Sheung Shui", type: "Public", lat: 22.4931, lng: 114.1292 },
  { name: "Tin Ping Estate", nameZH: "天平邨", area: "Fanling / Sheung Shui", type: "Public", lat: 22.5065, lng: 114.1352 },

  // Tai Po Town
  { name: "Tai Po Centre", nameZH: "大埔中心", area: "Tai Po Town", type: "Private", lat: 22.4532, lng: 114.1685 },
  { name: "Fortune Plaza", nameZH: "寶湖花園", area: "Tai Po Town", type: "Private", lat: 22.4501, lng: 114.1672 },
  { name: "Hong Lok Yuen", nameZH: "康樂園", area: "Tai Po Town", type: "Private", lat: 22.4765, lng: 114.1522 },
  { name: "Beverly Hills", nameZH: "比華利山別墅", area: "Tai Po Town", type: "Private", lat: 22.4635, lng: 114.1952 },
  { name: "Tai Yuen Estate", nameZH: "大元邨", area: "Tai Po Town", type: "Public", lat: 22.4548, lng: 114.1678 },
  { name: "Fu Shin Estate", nameZH: "富善邨", area: "Tai Po Town", type: "Public", lat: 22.4542, lng: 114.1742 },
  { name: "Kwong Fuk Estate", nameZH: "廣福邨", area: "Tai Po Town", type: "Public", lat: 22.4468, lng: 114.1725 },
  { name: "Tai Wo Estate", nameZH: "太和邨", area: "Tai Po Town", type: "Public", lat: 22.4512, lng: 114.1592 },

  // Sha Tin / Tai Wai
  { name: "City One Shatin", nameZH: "沙田第一城", area: "Sha Tin / Tai Wai", type: "Private", lat: 22.3871, lng: 114.2045 },
  { name: "Festival City", nameZH: "名城", area: "Sha Tin / Tai Wai", type: "Private", lat: 22.3712, lng: 114.1751 },
  { name: "Belair Gardens", nameZH: "富豪花園", area: "Sha Tin / Tai Wai", type: "Private", lat: 22.3831, lng: 114.1972 },
  { name: "Wai Wah Centre", nameZH: "偉華中心", area: "Sha Tin / Tai Wai", type: "Private", lat: 22.3788, lng: 114.1878 },
  { name: "Lek Yuen Estate", nameZH: "瀝源邨", area: "Sha Tin / Tai Wai", type: "Public", lat: 22.3821, lng: 114.1882 },
  { name: "Mei Lam Estate", nameZH: "美林邨", area: "Sha Tin / Tai Wai", type: "Public", lat: 22.3782, lng: 114.1721 },
  { name: "Pok Hong Estate", nameZH: "博康邨", area: "Sha Tin / Tai Wai", type: "Public", lat: 22.3762, lng: 114.1945 },
  { name: "Sun Chui Estate", nameZH: "新翠邨", area: "Sha Tin / Tai Wai", type: "Public", lat: 22.3688, lng: 114.1832 },

  // Ma On Shan / Fo Tan
  { name: "Sunshine City", nameZH: "新港城", area: "Ma On Shan / Fo Tan", type: "Private", lat: 22.4248, lng: 114.2312 },
  { name: "Symphony Bay", nameZH: "雅典居", area: "Ma On Shan / Fo Tan", type: "Private", lat: 22.4312, lng: 114.2465 },
  { name: "Villa Athena", nameZH: "雅濤居", area: "Ma On Shan / Fo Tan", type: "Private", lat: 22.4258, lng: 114.2372 },
  { name: "Double Cove", nameZH: "迎海", area: "Ma On Shan / Fo Tan", type: "Private", lat: 22.4358, lng: 114.2411 },
  { name: "Yiu On Estate", nameZH: "耀安邨", area: "Ma On Shan / Fo Tan", type: "Public", lat: 22.4212, lng: 114.2272 },
  { name: "Sui Wo Court", nameZH: "穗禾苑", area: "Ma On Shan / Fo Tan", type: "Public", lat: 22.3952, lng: 114.1915 },
  { name: "Chun Yeung Estate", nameZH: "駿洋邨", area: "Ma On Shan / Fo Tan", type: "Public", lat: 22.3968, lng: 114.1985 },

  // Tseung Kwan O
  { name: "Metro Town", nameZH: "都會駅", area: "Tseung Kwan O", type: "Private", lat: 22.3025, lng: 114.2525 },
  { name: "LOHAS Park", nameZH: "日出康城", area: "Tseung Kwan O", type: "Private", lat: 22.2965, lng: 114.2711 },
  { name: "The Wings", nameZH: "天晉", area: "Tseung Kwan O", type: "Private", lat: 22.3032, lng: 114.2612 },
  { name: "Oscar by the Sea", nameZH: "清水灣半島", area: "Tseung Kwan O", type: "Private", lat: 22.3168, lng: 114.2731 },
  { name: "Ocean Shores", nameZH: "維景灣畔", area: "Tseung Kwan O", type: "Private", lat: 22.3021, lng: 114.2478 },
  { name: "Hau Tak Estate", nameZH: "厚德邨", area: "Tseung Kwan O", type: "Public", lat: 22.3175, lng: 114.2635 },
  { name: "Kin Ming Estate", nameZH: "健明邨", area: "Tseung Kwan O", type: "Public", lat: 22.3082, lng: 114.2512 },
  { name: "Sheung Tak Estate", nameZH: "尚德邨", area: "Tseung Kwan O", type: "Public", lat: 22.3005, lng: 114.2605 },
  { name: "Ming Tak Estate", nameZH: "明德邨", area: "Tseung Kwan O", type: "Public", lat: 22.3195, lng: 114.2655 },

  // Sai Kung Town
  { name: "Sai Kung Town Centre", nameZH: "西貢市中心", area: "Sai Kung Town", type: "Private", lat: 22.3814, lng: 114.2705 },
  { name: "Lakeside Garden Estate", nameZH: "翠塘花園", area: "Sai Kung Town", type: "Public", lat: 22.3788, lng: 114.2721 },
  { name: "Marina Cove", nameZH: "匡湖居", area: "Sai Kung Town", type: "Private", lat: 22.3552, lng: 114.2618 },
  { name: "The Symphony", nameZH: "逸瓏園", area: "Sai Kung Town", type: "Private", lat: 22.3805, lng: 114.2685 },
  { name: "Hong Village", nameZH: "康村", area: "Sai Kung Town", type: "Private", lat: 22.3822, lng: 114.2655 },

  // Lai Chi Kok / Mei Foo
  { name: "Mei Foo Sun Chuen", nameZH: "美孚新邨", area: "Lai Chi Kok / Mei Foo", type: "Private", lat: 22.3375, lng: 114.1384 },
  { name: "Manhattan Hill", nameZH: "曼克頓山", area: "Lai Chi Kok / Mei Foo", type: "Private", lat: 22.3361, lng: 114.1415 },
  { name: "Banyan Garden", nameZH: "泓景臺", area: "Lai Chi Kok / Mei Foo", type: "Private", lat: 22.3342, lng: 114.1508 },
  { name: "Liberte", nameZH: "昇悅居", area: "Lai Chi Kok / Mei Foo", type: "Private", lat: 22.3345, lng: 114.1492 },
  { name: "The Pacifica", nameZH: "宇晴軒", area: "Lai Chi Kok / Mei Foo", type: "Private", lat: 22.3355, lng: 114.1478 },
  { name: "Lai Kok Estate", nameZH: "麗閣邨", area: "Lai Chi Kok / Mei Foo", type: "Public", lat: 22.3315, lng: 114.1572 },
  { name: "Un Chau Estate", nameZH: "元州邨", area: "Lai Chi Kok / Mei Foo", type: "Public", lat: 22.3351, lng: 114.1585 },

  // Cheung Sha Wan / Sham Shui Po
  { name: "Nam Shan Estate", nameZH: "南山邨", area: "Cheung Sha Wan / Sham Shui Po", type: "Public", lat: 22.3318, lng: 114.1702 },
  { name: "So Uk Estate", nameZH: "蘇屋邨", area: "Cheung Sha Wan / Sham Shui Po", type: "Public", lat: 22.3421, lng: 114.1565 },
  { name: "Shek Kip Mei Estate", nameZH: "石硤尾邨", area: "Cheung Sha Wan / Sham Shui Po", type: "Public", lat: 22.3341, lng: 114.1652 },
  { name: "Fu Cheong Estate", nameZH: "富昌邨", area: "Cheung Sha Wan / Sham Shui Po", type: "Public", lat: 22.3278, lng: 114.1532 },
  { name: "Dynasty Heights", nameZH: "帝景峰", area: "Cheung Sha Wan / Sham Shui Po", type: "Private", lat: 22.3458, lng: 114.1685 },
  { name: "The Sparkle", nameZH: "星匯居", area: "Cheung Sha Wan / Sham Shui Po", type: "Private", lat: 22.3282, lng: 114.1558 },

  // Mong Kok / Tai Kok Tsui
  { name: "The Hermitage", nameZH: "帝峯皇殿", area: "Mong Kok / Tai Kok Tsui", type: "Private", lat: 22.3182, lng: 114.1652 },
  { name: "Island Harbourview", nameZH: "維港灣", area: "Mong Kok / Tai Kok Tsui", type: "Private", lat: 22.3178, lng: 114.1595 },
  { name: "Metro Harbour View", nameZH: "港灣豪庭", area: "Mong Kok / Tai Kok Tsui", type: "Private", lat: 22.3262, lng: 114.1611 },
  { name: "Charming Garden", nameZH: "富榮花園", area: "Mong Kok / Tai Kok Tsui", type: "Public", lat: 22.3142, lng: 114.1645 },
  { name: "Hoi Fu Court", nameZH: "海富苑", area: "Mong Kok / Tai Kok Tsui", type: "Public", lat: 22.3158, lng: 114.1658 },

  // Tsim Sha Tsui / Jordan
  { name: "Sorrento", nameZH: "擎天半島", area: "Tsim Sha Tsui / Jordan", type: "Private", lat: 22.3045, lng: 114.1632 },
  { name: "The Arch", nameZH: "凱旋門", area: "Tsim Sha Tsui / Jordan", type: "Private", lat: 22.3022, lng: 114.1645 },
  { name: "The Cullinan", nameZH: "天璽", area: "Tsim Sha Tsui / Jordan", type: "Private", lat: 22.3031, lng: 114.1625 },
  { name: "Harbour Pinnacle", nameZH: "凱譽", area: "Tsim Sha Tsui / Jordan", type: "Private", lat: 22.2985, lng: 114.1751 },
  { name: "The Masterpiece", nameZH: "名鑄", area: "Tsim Sha Tsui / Jordan", type: "Private", lat: 22.2975, lng: 114.1738 },
  { name: "Prosperous Garden", nameZH: "駿發花園", area: "Tsim Sha Tsui / Jordan", type: "Public", lat: 22.3088, lng: 114.1685 },

  // Hung Hom / To Kwa Wan
  { name: "Whampoa Garden", nameZH: "黃埔花園", area: "Hung Hom / To Kwa Wan", type: "Private", lat: 22.3028, lng: 114.1901 },
  { name: "Laguna Verde", nameZH: "海逸豪園", area: "Hung Hom / To Kwa Wan", type: "Private", lat: 22.3112, lng: 114.1925 },
  { name: "Grand Waterfront", nameZH: "翔龍灣", area: "Hung Hom / To Kwa Wan", type: "Private", lat: 22.3218, lng: 114.1915 },
  { name: "Oi Man Estate", nameZH: "愛民邨", area: "Hung Hom / To Kwa Wan", type: "Public", lat: 22.3115, lng: 114.1798 },
  { name: "Ka Wai Chuen", nameZH: "家維邨", area: "Hung Hom / To Kwa Wan", type: "Public", lat: 22.3075, lng: 114.1865 },

  // Kowloon City / Kai Tak
  { name: "Kai Ching Estate", nameZH: "啟晴邨", area: "Kowloon City / Kai Tak", type: "Public", lat: 22.3321, lng: 114.2018 },
  { name: "Tak Long Estate", nameZH: "德朗邨", area: "Kowloon City / Kai Tak", type: "Public", lat: 22.3298, lng: 114.2045 },
  { name: "Ma Tau Wai Estate", nameZH: "馬頭圍邨", area: "Kowloon City / Kai Tak", type: "Public", lat: 22.3242, lng: 114.1882 },
  { name: "Victoria Skye", nameZH: "天寰", area: "Kowloon City / Kai Tak", type: "Private", lat: 22.3275, lng: 114.2011 },
  { name: "Oasis Kai Tak", nameZH: "Oasis 啟德", area: "Kowloon City / Kai Tak", type: "Private", lat: 22.3285, lng: 114.2001 },
  { name: "K. Summit", nameZH: "嘉峯匯", area: "Kowloon City / Kai Tak", type: "Private", lat: 22.3292, lng: 114.1988 },
  { name: "Kai Tak Phase I", nameZH: "啟德一號", area: "Kowloon City / Kai Tak", type: "Private", lat: 22.3278, lng: 114.2012 },

  // Wong Tai Sin / Diamond Hill
  { name: "Choi Hung Estate", nameZH: "彩虹邨", area: "Wong Tai Sin / Diamond Hill", type: "Public", lat: 22.3381, lng: 114.2052 },
  { name: "Tsz Lok Estate", nameZH: "慈樂邨", area: "Wong Tai Sin / Diamond Hill", type: "Public", lat: 22.3502, lng: 114.2001 },
  { name: "Lok Fu Estate", nameZH: "樂富邨", area: "Wong Tai Sin / Diamond Hill", type: "Public", lat: 22.3371, lng: 114.1872 },
  { name: "Tsz Oi Court", nameZH: "慈愛苑", area: "Wong Tai Sin / Diamond Hill", type: "Public", lat: 22.3525, lng: 114.2032 },
  { name: "Aria", nameZH: "現崇山", area: "Wong Tai Sin / Diamond Hill", type: "Private", lat: 22.3402, lng: 114.1952 },
  { name: "Rhythm Garden", nameZH: "采頤花園", area: "Wong Tai Sin / Diamond Hill", type: "Private", lat: 22.3361, lng: 114.2021 },

  // Kowloon Bay
  { name: "Telford Gardens", nameZH: "德福花園", area: "Kowloon Bay", type: "Private", lat: 22.3235, lng: 114.2125 },
  { name: "Amoy Gardens", nameZH: "淘大花園", area: "Kowloon Bay", type: "Private", lat: 22.3245, lng: 114.2152 },
  { name: "Richland Gardens", nameZH: "麗晶花園", area: "Kowloon Bay", type: "Private", lat: 22.3308, lng: 114.2062 },
  { name: "Kai Yip Estate", nameZH: "啟業邨", area: "Kowloon Bay", type: "Public", lat: 22.3288, lng: 114.2078 },
  { name: "Ping Shek Estate", nameZH: "坪石邨", area: "Kowloon Bay", type: "Public", lat: 22.3341, lng: 114.2045 },

  // Kwun Tong Town
  { name: "Grand Central", nameZH: "凱匯", area: "Kwun Tong Town", type: "Private", lat: 22.3142, lng: 114.2255 },
  { name: "Laguna City", nameZH: "麗港城", area: "Kwun Tong Town", type: "Private", lat: 22.3075, lng: 114.2268 },
  { name: "Sceneway Garden", nameZH: "匯景花園", area: "Kwun Tong Town", type: "Private", lat: 22.3051, lng: 114.2345 },
  { name: "Tsui Ping Estate", nameZH: "翠屏邨", area: "Kwun Tong Town", type: "Public", lat: 22.3168, lng: 114.2305 },
  { name: "Sau Mau Ping Estate", nameZH: "秀茂坪邨", area: "Kwun Tong Town", type: "Public", lat: 22.3218, lng: 114.2348 },
  { name: "Shun Lee Estate", nameZH: "順利邨", area: "Kwun Tong Town", type: "Public", lat: 22.3314, lng: 114.2272 },
  { name: "On Tat Estate", nameZH: "安達邨", area: "Kwun Tong Town", type: "Public", lat: 22.3195, lng: 114.2415 },

  // Lam Tin / Yau Tong
  { name: "Tak Tin Estate", nameZH: "德田邨", area: "Lam Tin / Yau Tong", type: "Public", lat: 22.3088, lng: 114.2381 },
  { name: "Yau Lai Estate", nameZH: "油麗邨", area: "Lam Tin / Yau Tong", type: "Public", lat: 22.3015, lng: 114.2335 },
  { name: "Ping Tin Estate", nameZH: "平田邨", area: "Lam Tin / Yau Tong", type: "Public", lat: 22.3065, lng: 114.2388 },
  { name: "Peninsula East", nameZH: "東源街", area: "Lam Tin / Yau Tong", type: "Private", lat: 22.2965, lng: 114.2355 },
  { name: "Ko Cheung Court", nameZH: "高翔苑", area: "Lam Tin / Yau Tong", type: "Public", lat: 22.2995, lng: 114.2398 },
  { name: "Sceneway Garden Phase 2", nameZH: "匯景花園二期", area: "Lam Tin / Yau Tong", type: "Private", lat: 22.3045, lng: 114.2335 },
  { name: "Maya", nameZH: "曦臺", area: "Lam Tin / Yau Tong", type: "Private", lat: 22.2988, lng: 114.2312 },
  { name: "The Coast Line", nameZH: "親海駅", area: "Lam Tin / Yau Tong", type: "Private", lat: 22.2952, lng: 114.2372 },

  // Quarry Bay / Taikoo
  { name: "Taikoo Shing", nameZH: "太古城", area: "Quarry Bay / Taikoo", type: "Private", lat: 22.2861, lng: 114.2184 },
  { name: "Kornhill", nameZH: "康怡花園", area: "Quarry Bay / Taikoo", type: "Private", lat: 22.2818, lng: 114.2162 },
  { name: "The Orchards", nameZH: "逸樺園", area: "Quarry Bay / Taikoo", type: "Private", lat: 22.2825, lng: 114.2135 },
  { name: "Model Housing Estate", nameZH: "模範邨", area: "Quarry Bay / Taikoo", type: "Public", lat: 22.2895, lng: 114.2081 },
  { name: "Mount Parker Residences", nameZH: "柏架山莊", area: "Quarry Bay / Taikoo", type: "Private", lat: 22.2842, lng: 114.2152 },

  // North Point / Fortress Hill
  { name: "City Garden", nameZH: "城市花園", area: "North Point / Fortress Hill", type: "Private", lat: 22.2915, lng: 114.1952 },
  { name: "Provident Centre", nameZH: "和富中心", area: "North Point / Fortress Hill", type: "Private", lat: 22.2922, lng: 114.1988 },
  { name: "Fleur Pavilia", nameZH: "柏蔚山", area: "North Point / Fortress Hill", type: "Private", lat: 22.2895, lng: 114.2015 },
  { name: "Healthy Village", nameZH: "健康村", area: "North Point / Fortress Hill", type: "Public", lat: 22.2912, lng: 114.2045 },
  { name: "Harbour East", nameZH: "海璇", area: "North Point / Fortress Hill", type: "Private", lat: 22.2905, lng: 114.1985 },

  // Chai Wan / Shau Kei Wan
  { name: "Heng Fa Chuen", nameZH: "杏花邨", area: "Chai Wan / Shau Kei Wan", type: "Private", lat: 22.2762, lng: 114.2401 },
  { name: "Grand Promenade", nameZH: "嘉亨灣", area: "Chai Wan / Shau Kei Wan", type: "Private", lat: 22.2842, lng: 114.2235 },
  { name: "Hing Wah Estate", nameZH: "興華邨", area: "Chai Wan / Shau Kei Wan", type: "Public", lat: 22.2615, lng: 114.2345 },
  { name: "Chai Wan Estate", nameZH: "柴灣邨", area: "Chai Wan / Shau Kei Wan", type: "Public", lat: 22.2645, lng: 114.2391 },
  { name: "Yiu Tung Estate", nameZH: "耀東邨", area: "Chai Wan / Shau Kei Wan", type: "Public", lat: 22.2785, lng: 114.2241 },
  { name: "Oi Tung Estate", nameZH: "愛東邨", area: "Chai Wan / Shau Kei Wan", type: "Public", lat: 22.2825, lng: 114.2268 },

  // Wan Chai / Causeway Bay
  { name: "Elizabeth House", nameZH: "伊利莎伯大廈", area: "Wan Chai / Causeway Bay", type: "Private", lat: 22.2811, lng: 114.1808 },
  { name: "Blue Pool Court", nameZH: "藍塘閣", area: "Wan Chai / Causeway Bay", type: "Private", lat: 22.2705, lng: 114.1845 },
  { name: "Lai Tak Tsuen", nameZH: "美德邨", area: "Wan Chai / Causeway Bay", type: "Public", lat: 22.2785, lng: 114.1925 },
  { name: "Illumination Terrace", nameZH: "光明臺", area: "Wan Chai / Causeway Bay", type: "Private", lat: 22.2772, lng: 114.1895 },
  { name: "The Peak Tower", nameZH: "山頂豪宅", area: "Wan Chai / Causeway Bay", type: "Private", lat: 22.2695, lng: 114.1552 },

  // Central / Admiralty / Sheung Wan
  { name: "Robinson Place", nameZH: "樂信臺", area: "Central / Admiralty / Sheung Wan", type: "Private", lat: 22.2798, lng: 114.1532 },
  { name: "The Belcher's", nameZH: "寶翠園", area: "Central / Admiralty / Sheung Wan", type: "Private", lat: 22.2841, lng: 114.1335 },
  { name: "The Merton", nameZH: "泓都", area: "Central / Admiralty / Sheung Wan", type: "Private", lat: 22.2831, lng: 114.1272 },
  { name: "Academic Terrace", nameZH: "學士臺", area: "Central / Admiralty / Sheung Wan", type: "Private", lat: 22.2812, lng: 114.1325 },
  { name: "Kwun Lung Lau", nameZH: "觀龍樓", area: "Central / Admiralty / Sheung Wan", type: "Public", lat: 22.2801, lng: 114.1278 },
  { name: "Sai Ying Pun Estate", nameZH: "西營盤邨", area: "Central / Admiralty / Sheung Wan", type: "Public", lat: 22.2858, lng: 114.1415 },

  // Aberdeen / Ap Lei Chau
  { name: "South Horizons", nameZH: "海怡半島", area: "Aberdeen / Ap Lei Chau", type: "Private", lat: 22.2428, lng: 114.1525 },
  { name: "Baguio Villa", nameZH: "碧瑤灣", area: "Aberdeen / Ap Lei Chau", type: "Private", lat: 22.2612, lng: 114.1288 },
  { name: "Larvotto", nameZH: "深灣軒", area: "Aberdeen / Ap Lei Chau", type: "Private", lat: 22.2435, lng: 114.1611 },
  { name: "Marinella", nameZH: "深灣9號", area: "Aberdeen / Ap Lei Chau", type: "Private", lat: 22.2441, lng: 114.1652 },
  { name: "Aberdeen Centre", nameZH: "香港仔中心", area: "Aberdeen / Ap Lei Chau", type: "Private", lat: 22.2488, lng: 114.1558 },
  { name: "Ap Lei Chau Estate", nameZH: "鴨脷洲邨", area: "Aberdeen / Ap Lei Chau", type: "Public", lat: 22.2442, lng: 114.1572 },
  { name: "Shek Pai Wan Estate", nameZH: "石排灣邨", area: "Aberdeen / Ap Lei Chau", type: "Public", lat: 22.2472, lng: 114.1625 },

  // Islands District
  { name: "Cheung Kwai Estate", nameZH: "長貴邨", area: "Islands District", type: "Public", lat: 22.2132, lng: 114.0275 },
  { name: "Nga Ning Court", nameZH: "雅寧苑", area: "Islands District", type: "Public", lat: 22.2078, lng: 114.0295 },
  { name: "Lung Tin Estate", nameZH: "龍田邨", area: "Islands District", type: "Public", lat: 22.2568, lng: 113.8612 },
  { name: "Scenic Crest", nameZH: "海景台", area: "Islands District", type: "Private", lat: 22.2115, lng: 114.0252 },
  { name: "Peninsula Marina", nameZH: "半島碼頭別墅", area: "Islands District", type: "Private", lat: 22.2045, lng: 114.0322 },
  { name: "Seaview Crescent", nameZH: "東涌海堤灣畔", area: "Islands District", type: "Private", lat: 22.2895, lng: 113.9465 },
  { name: "Cheung Chau Townhouse", nameZH: "長洲村屋", area: "Islands District", type: "Private", lat: 22.2062, lng: 114.0281 },
  { name: "Lamma Beachside Villa", nameZH: "南丫島海濱別墅", area: "Islands District", type: "Private", lat: 22.2285, lng: 114.1205 },
  
  // Tung Chung / Airport
  { name: "Yat Tung Estate", nameZH: "逸東邨", area: "Tung Chung / Airport", type: "Public", lat: 22.2818, lng: 113.9351 },
  { name: "Fu Tung Estate", nameZH: "富東邨", area: "Tung Chung / Airport", type: "Public", lat: 22.2891, lng: 113.9431 },
  { name: "Ying Tung Estate", nameZH: "迎東邨", area: "Tung Chung / Airport", type: "Public", lat: 22.2982, lng: 113.9535 },
  { name: "Caribbean Coast", nameZH: "藍天海岸", area: "Tung Chung / Airport", type: "Private", lat: 22.2925, lng: 113.9515 },
  { name: "Tung Chung Crescent", nameZH: "東堤灣畔", area: "Tung Chung / Airport", type: "Private", lat: 22.2895, lng: 113.9412 },
  { name: "Coastal Skyline", nameZH: "藍天海岸影岸紅", area: "Tung Chung / Airport", type: "Private", lat: 22.2908, lng: 113.9482 },
  { name: "The Visionary", nameZH: "昇薈", area: "Tung Chung / Airport", type: "Private", lat: 22.2965, lng: 113.9565 },

  // Discovery Bay
  { name: "Sheng Wan Lodge (Islands-Local)", nameZH: "盛灣小築", area: "Discovery Bay", type: "Public", lat: 22.2912, lng: 114.0125 },
  { name: "Discovery Bay Phase 1", nameZH: "愉景灣第一期", area: "Discovery Bay", type: "Private", lat: 22.2952, lng: 114.0205 },
  { name: "Discovery Bay Phase 5", nameZH: "愉景灣第五期", area: "Discovery Bay", type: "Private", lat: 22.2975, lng: 114.0152 },
  { name: "Discovery Bay Phase 12", nameZH: "愉景灣第十二期", area: "Discovery Bay", type: "Private", lat: 22.3012, lng: 114.0115 },
  { name: "La Vista", nameZH: "愉景灣明翠台", area: "Discovery Bay", type: "Private", lat: 22.2938, lng: 114.0182 },

  // Ma Wan / Park Island updates
  { name: "Park Island Phase 1", nameZH: "珀麗灣一期", area: "Ma Wan / Park Island", type: "Private", lat: 22.3522, lng: 114.0612 },
  { name: "Park Island Phase 2", nameZH: "珀麗灣二期", area: "Ma Wan / Park Island", type: "Private", lat: 22.3512, lng: 114.0625 },
  { name: "Park Island Phase 3", nameZH: "珀麗灣三期", area: "Ma Wan / Park Island", type: "Private", lat: 22.3505, lng: 114.0638 },
  { name: "Tin Wan House (Island Area)", nameZH: "天灣閣", area: "Ma Wan / Park Island", type: "Public", lat: 22.3532, lng: 114.0585 }
];
