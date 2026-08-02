import { DistrictConfig, GeodataItem, CustomWorkSite } from '../types';

export const MONTHS_LIST = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

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
  { id: "SITE-QB", name: "Quarry Bay Office", district: "Quarry Bay / Taikoo", lat: 22.2854, lng: 114.2128, staffCount: 200, visible: true, siteCode: "SITE-01" },
  { id: "SITE-KT", name: "Kwun Tong Office", district: "Kwun Tong Town", lat: 22.3134, lng: 114.2238, staffCount: 100, visible: true, siteCode: "SITE-02" },
  { id: "SITE-CKC", name: "Cheung Kong Centre", district: "Central / Admiralty / Sheung Wan", lat: 22.2799, lng: 114.1603, staffCount: 100, visible: true, siteCode: "SITE-03" },
  { id: "SITE-AH", name: "HKL - Alexandra House", district: "Central / Admiralty / Sheung Wan", lat: 22.2817, lng: 114.1586, staffCount: 100, visible: true, siteCode: "SITE-04" },
  { id: "SITE-LM", name: "HKL - Landmark", district: "Central / Admiralty / Sheung Wan", lat: 22.2814, lng: 114.1584, staffCount: 100, visible: true, siteCode: "SITE-05" },
  { id: "SITE-ES", name: "HKL - Exchange Square", district: "Central / Admiralty / Sheung Wan", lat: 22.2840, lng: 114.1581, staffCount: 100, visible: true, siteCode: "SITE-06" },
  { id: "SITE-GEC", name: "Wharf - Great Eagle Centre", district: "Wan Chai / Causeway Bay", lat: 22.2804, lng: 114.1751, staffCount: 100, visible: true, siteCode: "SITE-07" },
  { id: "SITE-LP", name: "Wharf - Langham Place", district: "Mong Kok / Tai Kok Tsui", lat: 22.3191, lng: 114.1685, staffCount: 100, visible: true, siteCode: "SITE-08" },
  { id: "SITE-TGR", name: "Wharf - Three Garden Road", district: "Central / Admiralty / Sheung Wan", lat: 22.2789, lng: 114.1611, staffCount: 100, visible: true, siteCode: "SITE-09" },
  { id: "SITE-UCH", name: "United Christian Hospital", district: "Kwun Tong Town", lat: 22.3223, lng: 114.2281, staffCount: 100, visible: true, siteCode: "SITE-10" },
  { id: "SITE-CUMC", name: "Chinese University Medical Centre (CUMC)", district: "Sha Tin / Tai Wai", lat: 22.4143, lng: 114.2109, staffCount: 100, visible: true, siteCode: "SITE-11" },
  { id: "SITE-TKOH", name: "Tseung Kwan O Hospital", district: "Tseung Kwan O", lat: 22.3168, lng: 114.2676, staffCount: 100, visible: true, siteCode: "SITE-12" },
  { id: "SITE-YCH", name: "Yan Chai Hospital", district: "Lai Chi Kok / Mei Foo", lat: 22.3372, lng: 114.1190, staffCount: 100, visible: true, siteCode: "SITE-13" },
  { id: "SITE-PMH", name: "Princess Margaret Hospital", district: "Kwai Chung / Kwai Fong", lat: 22.3421, lng: 114.1351, staffCount: 100, visible: true, siteCode: "SITE-14" },
  { id: "SITE-PAM1", name: "PAM 1", district: "Tuen Mun Town & North", lat: 22.399, lng: 113.975, staffCount: 100, visible: true, siteCode: "SITE-15" },
  { id: "SITE-PAM2", name: "PAM 2", district: "Tuen Mun Town & North", lat: 22.398, lng: 113.976, staffCount: 100, visible: true, siteCode: "SITE-16" },
  { id: "SITE-PAM3", name: "PAM 3", district: "Tuen Mun Town & North", lat: 22.397, lng: 113.977, staffCount: 100, visible: true, siteCode: "SITE-17" }
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
  "Tsing Yi": { 
    name: "Tsing Yi", nameZH: "青衣", lat: 22.3529, lng: 114.1042, radius: 2.5, 
    estatesPub: ["Cheung Ching Estate", "Cheung On Estate", "Ying Yat Estate"], 
    estatesPri: ["Tierra Verde", "Villa Esplanada", "Greenfield Garden", "Rambler Crest"], 
    employees: 400, pubRatio: 0.55 
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
  "Tin Shui Wai": { 
    name: "Tin Shui Wai", nameZH: "天水圍", lat: 22.4578, lng: 114.0022, radius: 2.5, 
    estatesPub: ["Tin Heng Estate", "Tin Yat Estate", "Tin Yiu Estate", "Tin Shui Estate"], 
    estatesPri: ["Kingswood Villas", "Vianni Cove", "Wetland Seasons Park"], 
    employees: 600, pubRatio: 0.85 
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
  "Tseung Kwan O": { 
    name: "Tseung Kwan O", nameZH: "將軍澳", lat: 22.3115, lng: 114.2568, radius: 3.0, 
    estatesPub: ["Hau Tak Estate", "Kin Ming Estate", "Sheung Tak Estate", "Ming Tak Estate"], 
    estatesPri: ["Metro Town", "LOHAS Park", "The Wings", "Oscar by the Sea", "Ocean Shores"], 
    employees: 700, pubRatio: 0.30 
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
  "Kowloon Bay": { 
    name: "Kowloon Bay", nameZH: "九龍灣", lat: 22.3225, lng: 114.2115, radius: 1.4, 
    estatesPub: ["Kai Yip Estate", "Ping Shek Estate"], 
    estatesPri: ["Telford Gardens", "Amoy Gardens", "Richland Gardens"], 
    employees: 450, pubRatio: 0.40 
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
  "Discovery Bay": { 
    name: "Discovery Bay", nameZH: "愉景灣", lat: 22.2965, lng: 114.0152, radius: 2.5, 
    estatesPub: ["Sheng Wan Lodge (Islands-Local)"], 
    estatesPri: ["Discovery Bay Phase 1", "Discovery Bay Phase 5", "Discovery Bay Phase 12", "La Vista"], 
    employees: 70, pubRatio: 0.01 
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
