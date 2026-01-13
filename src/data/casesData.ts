export interface CaseData {
  id: string;
  title: string;
  image: string;
  tags: string[];
  timestamp: string;
  color: string;
}

const tags = [
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
  "celtics",
  "2018",
  "temps",
];

const locations = [
  "NEW YORK, USA",
  "TOKYO, JAPAN",
  "PARIS, FRANCE",
  "LONDON, UK",
  "BERLIN, GERMANY",
  "SYDNEY, AUSTRALIA",
  "MOSCOW, RUSSIA",
  "BEIJING, CHINA",
  "MUMBAI, INDIA",
  "RIO DE JANEIRO, BRAZIL",
];

const sources = [
  "REUTERS",
  "AFP",
  "AP PHOTO",
  "GETTY IMAGES",
  "EPA",
  "BLOOMBERG",
];

// Generate diverse colors for placeholder cards
const generateColor = (index: number): string => {
  const hue = (index * 47) % 360;
  const saturation = 35 + (index % 30);
  const lightness = 40 + (index % 20);
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

// Generate placeholder cases
export const generateCases = (count: number): CaseData[] => {
  return Array.from({ length: count }, (_, i) => {
    const id = `case-${i}`;
    const hour = Math.floor(Math.random() * 24).toString().padStart(2, '0');
    const minute = Math.floor(Math.random() * 60).toString().padStart(2, '0');
    const second = Math.floor(Math.random() * 60).toString().padStart(2, '0');
    
    // Assign 1-3 random tags (excluding "all")
    const tagCount = 1 + Math.floor(Math.random() * 3);
    const caseTags: string[] = [];
    for (let t = 0; t < tagCount; t++) {
      const randomTag = tags[1 + Math.floor(Math.random() * (tags.length - 1))];
      if (!caseTags.includes(randomTag)) {
        caseTags.push(randomTag);
      }
    }
    
    return {
      id,
      title: `${locations[i % locations.length]} - ${sources[i % sources.length]}`,
      image: `/placeholder.svg`,
      tags: caseTags,
      timestamp: `Today, ${hour}:${minute}:${second}`,
      color: generateColor(i),
    };
  });
};

export const cases = generateCases(120);

// Calculate tag counts dynamically
export const getTagCounts = (caseData: CaseData[]): Record<string, number> => {
  const counts: Record<string, number> = { all: caseData.length };
  
  caseData.forEach(c => {
    c.tags.forEach(tag => {
      counts[tag] = (counts[tag] || 0) + 1;
    });
  });
  
  return counts;
};

export const tagList = tags;
export const tagCounts = getTagCounts(cases);
