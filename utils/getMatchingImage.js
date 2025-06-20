import imageMap from "../utils/imageMap";

export function getMatchingImage(text) {
  const lowerText = text.toLowerCase();
  for (const keyword in imageMap) {
    if (lowerText.includes(keyword)) {
      const options = imageMap[keyword];
      return `/images/${options[Math.floor(Math.random() * options.length)]}`;
    }
  }
  // Fallback: return random
  const allImages = Object.values(imageMap).flat();
  return `/images/${allImages[Math.floor(Math.random() * allImages.length)]}`;
}
