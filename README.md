# Bella Beauty Studio - AI Customer Support Chatbot

A modern AI customer support chatbot built for **Bella Beauty Studio** as a professional Fiverr portfolio project. It helps visitors ask about services, pricing, business information, promotions, and appointment requests through a clean responsive chat interface.

## Live Demo

[View Live Demo](https://bella-beauty-chatbot.vercel.app)

## Features

- AI Customer Support
- Appointment Requests
- Pricing Information
- Business Information
- Responsive Design
- Mock AI Mode for Portfolio
- Next.js App Router
- TypeScript
- Clean Architecture

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- OpenAI API
- Vercel

## Screenshots

![Home](./screenshots/home.png)

![Chat](./screenshots/chat.png)

![Mobile](./screenshots/mobile.png)

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the project locally:

```txt
http://localhost:3000
```

## Environment Variables

Create a `.env.local` file in the project root. You can use `.env.example` as a reference.

For real OpenAI usage:

```env
OPENAI_API_KEY=your_key
USE_MOCK_AI=false
```

For portfolio demo mode:

```env
USE_MOCK_AI=true
```

Mock mode is designed for portfolio presentations. When enabled, the chatbot returns professional demo responses without calling the OpenAI API.

## Project Structure

```txt
bella_beauty_chatbot/
├── app/
│   ├── api/chat/route.ts
│   ├── layout.tsx
│   └── page.tsx
├── src/
│   ├── components/chat/
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   └── types/
├── .env.example
├── package.json
└── README.md
```

The local JSON data files are used for demo purposes. In a production client project, lead collection can be connected to Supabase, PostgreSQL, or another production-ready database.

## Future Improvements

- Database integration
- Admin Dashboard
- Analytics
- CRM Integration
- Authentication

## License

MIT License
