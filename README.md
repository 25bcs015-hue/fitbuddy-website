# FitBuddy — AI-Powered Fitness & Wellness Plan Generator

This is a polished React + Vite frontend prototype based on the supplied FitBuddy project documentation.

## Included
- Landing page
- User profile form
- Seven-day personalized-plan UI
- Dashboard with completion tracking
- Progress analytics chart
- Feedback/adaptive-plan UI
- AI Assistant chat UI
- Responsive mobile/desktop design
- Wellness safety boundary

## Run locally
```bash
npm install
npm run dev
```

## Backend integration
The documentation specifies FastAPI + SQLite + Google Gemini. Connect the UI to these documented endpoints:
- POST /api/users
- POST /api/generate-plan
- GET /api/plans/{user_id}
- POST /api/activity/complete
- POST /api/activity/skip
- POST /api/feedback
- POST /api/adapt-plan
- POST /api/chat
- GET /api/progress/{user_id}

Keep GEMINI_API_KEY on the backend only; never expose it in React source code.

Source basis: FitBuddy project documentation, including the abstract, objectives, technology stack, modules, API specification, UI design, implementation and safety limitations.
