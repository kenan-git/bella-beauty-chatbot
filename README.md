# Bella Beauty Studio - AI Customer Support Chatbot

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-API-412991?style=for-the-badge&logo=openai&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)
![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

A modern AI customer support chatbot built for **Bella Beauty Studio** as a professional Fiverr portfolio project. It helps visitors ask about services, pricing, business information, promotions, and appointment requests through a clean responsive chat interface.

## Live Demo

**Live App:** [bella-beauty-chatbot.vercel.app](https://bella-beauty-chatbot.vercel.app)  
**GitHub Repository:** [kenan-git/bella-beauty-chatbot](https://github.com/kenan-git/bella-beauty-chatbot)

## Built With

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- OpenAI API
- Vercel

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
