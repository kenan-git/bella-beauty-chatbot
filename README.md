# Bella Beauty Studio AI Customer Support Chatbot

A modern AI customer support chatbot demo built for **Bella Beauty Studio** as a Fiverr portfolio project.  
The chatbot helps customers ask about beauty services, prices, working hours, promotions, and appointment requests through a clean responsive chat interface.

This project includes a free **Mock AI Mode**, so it can run as a complete demo without requiring paid API usage.

## Features

- 🤖 AI Customer Support
- 🧪 Mock AI Mode
- 💇 Services Information
- 💵 Pricing Information
- 🕘 Working Hours
- 🎁 Promotions
- 📅 Appointment Requests
- 📝 Lead Collection
- 📁 JSON Database
- 📱 Responsive Chat UI

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Next.js API Routes

## Project Structure

```txt
bella_beauty_chatbot/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── src/
│   ├── components/
│   │   └── chat/
│   │       ├── ChatContainer.tsx
│   │       ├── ChatInput.tsx
│   │       ├── ChatMessage.tsx
│   │       └── TypingIndicator.tsx
│   ├── data/
│   │   ├── business-info.json
│   │   └── leads.json
│   ├── hooks/
│   │   └── useChat.ts
│   ├── lib/
│   │   ├── lead-manager.ts
│   │   ├── openai.ts
│   │   └── prompt.ts
│   └── types/
│       ├── chat.ts
│       └── lead.ts
├── .env.example
├── package.json
└── README.md
```

## Installation

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the app in your browser:

```txt
http://localhost:3000
```

## Environment Variables

Use `.env.example` as a reference for local environment configuration.

Create a `.env.local` file in the project root and add:

```env
USE_MOCK_AI=true
OPENAI_API_KEY=your_openai_api_key_here
```

For a free portfolio demo, keep mock mode enabled:

```env
USE_MOCK_AI=true
```

When `USE_MOCK_AI=true`, the app returns professional demo responses without calling the OpenAI API.

## Demo

Example mock AI conversation:

```txt
User:
What services do you offer?

Assistant:
We offer Hair Cut, Hair Coloring, Manicure, Pedicure, Facial Treatment and Eyebrow Shaping.

User:
Show me your prices

Assistant:
Our prices start from $20 and vary depending on the selected service.

User:
I want to book an appointment. My name is Sarah, my phone is 555-123-4567, service is manicure.

Assistant:
To book an appointment, please provide your full name, phone number and desired service.

Your appointment request has been saved. Our team will contact you soon.
```

Appointment lead data is saved to:

```txt
src/data/leads.json
```

The JSON database is included for local demo purposes. In production deployments such as Vercel, file writes are not reliable for persistent storage. For a real client project, this lead collection flow can be connected to Supabase, PostgreSQL, or another production-ready database.

## Future Improvements

- OpenAI API
- Database
- Authentication
- Dashboard

## License

Copyright © 2026 Kenan

This repository is provided for portfolio and demonstration purposes.

Commercial redistribution, resale, or unauthorized commercial use is not permitted without written permission from the author.
