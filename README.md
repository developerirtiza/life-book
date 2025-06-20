# 📘 LifeBook

**LifeBook** is a gamified, book-style journaling app that transforms your daily thoughts into beautiful storybook pages.

Powered by a handcrafted AI-like engine (no API keys required), it generates:

- 🎨 A matching image
- 🏆 Achievements
- 😳 Embarrassments

---

## 🌟 Features

- Write a daily journal entry
- Watch it turn into a stylized book page
- Flip through your life like a real RPG storybook
- No login, no backend — just browser localStorage

---

## 🛠 Built With

- **Next.js** (Frontend)
- **Tailwind CSS** (Styling)
- **Storyblok + DEV Challenge Theme**
- **Custom logic** simulating AI output

---

## 💡 How It Works

When you submit a journal entry:

- It’s scanned for keywords like `fishing`, `sunset`, `mistake`, etc.
- A matching image is picked from `/public/images/`
- Achievements and embarrassments are generated
- The result is rendered as a page of your personal book

All data is saved in your browser’s localStorage.

---

## 🧠 Why No Real AI?

We wanted to integrate OpenAI — but API cost constraints prevented us. Instead, we handcoded the logic with realistic keyword mappings.

**Later versions may support real GPT-4-powered generation.**

---

## 📚 Example Prompts

See [`sample-prompts.md`](./sample-prompts.md) for all journal entries that trigger content.

---

## 🚀 Getting Started

1. Clone the repo
2. Run `npm install`
3. Start dev server with `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

---

## Live Demo

You can also see the live the demo by clicking this link [lifebook](https://life-book-sigma.vercel.app)

## 📂 Folder Structure

```
/pages
  index.js         → main LifeBook logic
  /api/generatePage.js → journal processing logic
/components
  BookPage.js      → styled page UI
  JournalInput.js  → input field
/utils
  getMatchingImage.js
  imageMap.js
/public/images     → all image assets
```

---

## 🧾 License

MIT License

---

## 🙌 Acknowledgements

Built with ❤️ for the **DEV x Storyblok AI Web Challenge 2025** by **Irtiza**.

Made in Pakistan 🇵🇰
