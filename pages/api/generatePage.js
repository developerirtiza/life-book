import { getMatchingImage } from "../../utils/getMatchingImage";
import imageMap from "../../utils/imageMap";

export default async function handler(req, res) {
  try {
    const { journalEntry } = req.body;

    if (typeof journalEntry !== "string") {
      return res.status(400).json({ error: "Invalid journal entry format" });
    }

    const lowerCased = journalEntry.toLowerCase();
    const achievements = [];
    const embarrassments = [];

    const achievementTriggers = [
      { keyword: "beach", label: "Visited the beach" },
      { keyword: "fishing", label: "Went fishing 🎣" },
      { keyword: "hiking", label: "Went hiking 🥾" },
      { keyword: "skateboarding", label: "Tried skateboarding 🛹" },
      { keyword: "cooking", label: "Helped cook dinner 🍳" },
      { keyword: "library", label: "Discovered poetry in the library 📚" },
      { keyword: "picnic", label: "Had a relaxing picnic 🍉" },
      { keyword: "presentation", label: "Faced public speaking 🎤" },
    ];

    const embarrassmentTriggers = [
      { keyword: "mistake", label: "Made a mistake 😬" },
      { keyword: "never saw a sunset", label: "Never saw a sunset 😳" },
      { keyword: "fell", label: "Fell down in public 🫣" },
      { keyword: "forgot", label: "Forgot what to say 😓" },
      { keyword: "lazy", label: "Did nothing all day 😴" },
      { keyword: "spilled", label: "Spilled something embarrassing 😅" },
      { keyword: "burned", label: "Got sunburnt ☀️" },
    ];

    achievementTriggers.forEach(({ keyword, label }) => {
      if (lowerCased.includes(keyword)) achievements.push(label);
    });

    embarrassmentTriggers.forEach(({ keyword, label }) => {
      if (lowerCased.includes(keyword)) embarrassments.push(label);
    });

    const image = getMatchingImage(lowerCased, imageMap);

    return res.status(200).json({
      story: journalEntry,
      image,
      achievements,
      embarrassments,
    });
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
