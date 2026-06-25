import { ChatContainer } from "../src/components/chat/ChatContainer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#ffe4e6,transparent_34%),linear-gradient(135deg,#fafafa,#f5f5f5)] px-4 py-8 text-neutral-950 sm:px-6 lg:px-8">
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-8">
          <div className="inline-flex rounded-full border border-rose-200 bg-white/80 px-4 py-2 text-sm font-medium text-rose-700 shadow-sm backdrop-blur">
            Portfolio Demo · AI Support Assistant
          </div>

          <div className="space-y-5">
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-neutral-950 sm:text-6xl lg:text-7xl">
              Bella Beauty Studio
            </h1>
            <p className="text-xl font-medium text-neutral-700 sm:text-2xl">
              AI Customer Support Chatbot
            </p>
            <p className="max-w-2xl text-base leading-8 text-neutral-600 sm:text-lg">
              Ask about services, prices, working hours, promotions or
              appointment requests.
            </p>
          </div>

          <div className="grid max-w-2xl gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/70 bg-white/75 p-4 shadow-sm backdrop-blur">
              <p className="text-2xl font-semibold">$20+</p>
              <p className="mt-1 text-sm text-neutral-600">Starting price</p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/75 p-4 shadow-sm backdrop-blur">
              <p className="text-2xl font-semibold">6</p>
              <p className="mt-1 text-sm text-neutral-600">Beauty services</p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/75 p-4 shadow-sm backdrop-blur">
              <p className="text-2xl font-semibold">24/7</p>
              <p className="mt-1 text-sm text-neutral-600">AI responses</p>
            </div>
          </div>
        </div>

        <div className="w-full">
          <ChatContainer />
        </div>
      </section>

      <footer className="mx-auto mt-8 max-w-7xl border-t border-neutral-200/70 pt-6 text-center text-sm text-neutral-500">
        Designed &amp; Developed by Kenan
      </footer>
    </main>
  );
}
