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
      color: `hsl(${(id * 47) % 360}, ${35 + (id % 30)}%, ${42 + (id % 18)}%)`,
      category: categories[Math.floor(Math.random() * categories.length)],
    };
  });
};

export const leftStackPhotos = generatePhotos(150, 0);

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
