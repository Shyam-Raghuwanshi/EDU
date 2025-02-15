# 📚 Educasm: AI-Powered Learning Platform

Welcome to **Educasm**, an AI-driven learning platform inspired by platforms like **Perplexity.ai** and **Duolingo**. This project integrates **Next.js**, **OpenAI API**, **rate limiting**, and **adaptive learning** to provide an engaging and interactive learning experience.

---

## 🚀 Features Implemented

### ✅ 1. **Code Cleanup & Next.js Migration**
- Refactored all React Router dependencies to **Next.js** (`next/navigation`).
- Removed unused code and optimized imports.
- Maintained a **clean and modular project structure**.

### ✅ 2. **Moved API Calls to Backend**
- Shifted API calls from frontend to **Next.js API routes** to **prevent API key exposure**.
- Implemented **streaming responses** to ensure real-time AI responses.
- Used **Vercel Edge Functions** for efficient serverless execution.

### ✅ 3. **Chat History (Explore Mode)**
- Implemented **scrollable chat history** similar to **Perplexity.ai**.
- Ensured that **chat context persists across follow-up questions**.
- Stored chat history in state for **quick retrieval**.

### ✅ 4. **Context for Follow-Up Questions**
- Each follow-up **retains previous conversation context**.
- AI generates responses while **considering past messages**.

### ✅ 5. **Fix: Play/Pause Button in Playground Mode**
- Ensured **pausing stops the question timer** and **prevents new questions from appearing**.
- **Resuming resumes the timer** without issues.
- Timer logic is now **smoother and accurate**.

### ✅ 6. **Rate Limiting for API Requests**
- Added middleware to enforce **rate limits** per user session:
  - **15 requests/min**
  - **250 requests/hour**
  - **500 requests/day**
- Uses **Redis or an in-memory store** to track user request counts.
- Prevents API abuse and **ensures fair usage**.

### ✅ 7. **Duolingo-Inspired Streak & Adaptive Difficulty**
- Implemented **streak-based progression** to motivate users.
- **Difficulty dynamically adjusts** based on user performance:
  - **Correct & fast answers → Harder questions**.
  - **Slow or wrong answers → Easier questions**.
- Added a **streak progress bar** to show how close the user is to leveling up.

### ✅ 8. **Enhancements for Related Questions & Topics**
- Updated UI for **Related Questions & Topics**.
- Styled elements for better **visibility & user interaction**.
- Clicking related topics generates a **new AI-powered response**.

---

## 📂 Project Structure
```
shyam-raghuwanshi-edu/
├── app/
│   ├── layout.tsx   → Main layout component
│   ├── page.tsx     → Homepage
│   ├── playground/  → Playground mode
│
├── components/
│   ├── Explore/
│   │   ├── ExploreView.tsx → Chat-based learning interface
│   │   ├── RelatedQuestions.tsx → Follow-up questions UI
│   │   ├── RelatedTopics.tsx → Suggested topics UI
│   │   ├── SearchBar.tsx → Search input component
│   ├── Playground/
│   │   ├── PlaygroundView.tsx → Adaptive question-based learning
│   │   ├── QuestionCard.tsx → Displays generated questions
│   │   ├── StatsBar.tsx → Shows user progress
│
├── hooks/
│   ├── useApi.ts → Handles API calls from frontend
│
├── services/
│   ├── api.ts → API call wrapper functions
│   ├── gptService.ts → OpenAI API integration
│   ├── storageService.ts → Local storage handling
│
├── pages/api/
│   ├── generate.ts → API route for AI-generated content
│   ├── stream.ts → Streaming AI responses
│
└── middleware/
    ├── rateLimit.ts → Middleware for API rate limiting
```

---

## 🛠️ Installation & Setup

1️⃣ **Clone the repository**
```bash
git clone https://github.com/shyam-raghuwanshi/educasm.git
cd educasm
```

2️⃣ **Install dependencies**
```bash
yarn install   # or npm install
```

3️⃣ **Set up environment variables** (`.env.local`)
```env
OPENAI_API_KEY=your_openai_api_key
```

4️⃣ **Run the development server**
```bash
yarn dev   # or npm run dev
```

---

## 🎯 Next Steps / Possible Improvements
- **Leaderboard & XP System** 🏆
- **Badges for achievements** 🏅
- **AI-powered hints for tough questions**
- **Multiplayer Challenge Mode** ⚔️

🚀 **Great job! Let me know if you need any refinements.**
