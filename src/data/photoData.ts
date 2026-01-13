export interface PhotoData {
  id: number;
  timestamp: string;
  location: string;
  source: string;
  color: string;
  category: string;
}

const locations = [
  "MANAGUA, NICARAGUA",
  "TOKYO, JAPAN",
  "PARIS, FRANCE",
  "NEW YORK, USA",
  "LONDON, UK",
  "SYDNEY, AUSTRALIA",
  "BERLIN, GERMANY",
  "MOSCOW, RUSSIA",
  "BEIJING, CHINA",
  "MUMBAI, INDIA",
  "CAIRO, EGYPT",
  "RIO DE JANEIRO, BRAZIL",
  "CAPE TOWN, SOUTH AFRICA",
  "DUBAI, UAE",
  "SINGAPORE",
];

const sources = [
  "INTI OCON / AFP",
  "REUTERS",
  "AP PHOTO",
  "GETTY IMAGES",
  "EPA",
  "XINHUA",
  "AFP",
  "BLOOMBERG",
  "NYT",
  "WASHINGTON POST",
];

const categories = [
  "all",
  "topshots",
  "union",
  "houston",
  "cricket",
  "games",
  "trump",
  "politics",
  "genius",
  "economics",
  "cleveland",
  "france",
  "Celtics",
  "2018",
  "temps",
];

// Generate varied colors for placeholder cards - more photo-like colors
const colors = [
  // Earth tones
  "#8B4513", "#A0522D", "#D2691E", "#CD853F", "#DEB887",
  // Greens
  "#556B2F", "#6B8E23", "#228B22", "#2E8B57", "#3CB371",
  // Blues
  "#4682B4", "#5F9EA0", "#4169E1", "#6495ED", "#87CEEB",
  // Warm tones
  "#B8860B", "#DAA520", "#F4A460", "#E9967A", "#FA8072",
  // Cool tones
  "#2F4F4F", "#708090", "#778899", "#A9A9A9", "#696969",
  // Vibrant
  "#8B0000", "#DC143C", "#FF6347", "#FF4500", "#FF8C00",
  // Purple/Pink
  "#483D8B", "#6A5ACD", "#9370DB", "#BA55D3", "#DA70D6",
  // Dark moody
  "#1a1a2e", "#16213e", "#0f3460", "#1f4068", "#162447",
  // Muted pastels
  "#B5838D", "#6D6875", "#E5989B", "#FFB4A2", "#FFCDB2",
];

export const generatePhotos = (count: number, startId: number = 0): PhotoData[] => {
  return Array.from({ length: count }, (_, i) => {
    const id = startId + i;
    const hour = Math.floor(Math.random() * 24).toString().padStart(2, '0');
    const minute = Math.floor(Math.random() * 60).toString().padStart(2, '0');
    const second = Math.floor(Math.random() * 60).toString().padStart(2, '0');
    
    return {
      id,
      timestamp: `Today, ${hour}:${minute}:${second}`,
      location: locations[Math.floor(Math.random() * locations.length)],
      source: sources[Math.floor(Math.random() * sources.length)],
      color: colors[id % colors.length],
      category: categories[Math.floor(Math.random() * categories.length)],
    };
  });
};

export const leftStackPhotos = generatePhotos(80, 0);
export const rightStackPhotos = generatePhotos(80, 80);

export const categoryTags = [
  { name: "all", count: 2347 },
  { name: "topshots", count: 156 },
  { name: "union", count: 89 },
  { name: "houston", count: 234 },
  { name: "cricket", count: 67 },
  { name: "games", count: 445 },
  { name: "trump", count: 312 },
  { name: "politics", count: 567 },
  { name: "genius", count: 23 },
  { name: "economics", count: 189 },
  { name: "cleveland", count: 45 },
  { name: "france", count: 78 },
  { name: "Celtics", count: 34 },
  { name: "2018", count: 890 },
  { name: "temps", count: 12 },
];
