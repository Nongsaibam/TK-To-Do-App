const endpoints = [
  ['POST', '/api/auth/login', 'Authenticate users and return JWT-ready response shape.'],
  ['POST', '/api/auth/register', 'Create a new user profile for your task platform.'],
  ['GET', '/api/tasks', 'Fetch seeded or database-powered task data.'],
  ['GET', '/api/analytics', 'Get dashboard stats and trend-ready metrics.'],
  ['POST', '/api/ai/assistant', 'Send prompts and return AI workflow guidance.'],
];

export default function AIBackendStack() {
  return (
    <section className="rounded-[26px] border border-white/70 bg-white/90 p-5 shadow-[0_10px_30px_rgba(24,39,75,0.06)]">
      <h3 className="text-lg font-semibold text-[#171717]">Included Next.js Backend Architecture</h3>
      <p className="mt-2 text-sm leading-7 text-[#6b7280]">
        I added a separate <strong>backend-next</strong> folder with App Router API endpoints so your frontend can grow into a real modern full-stack system.
      </p>
      <div className="mt-5 overflow-hidden rounded-[20px] border border-[#e5e7eb]">
        <div className="grid grid-cols-[110px_1fr_2fr] bg-[#111827] px-4 py-3 text-sm font-semibold text-white">
          <span>Method</span>
          <span>Route</span>
          <span>Purpose</span>
        </div>
        {endpoints.map(([method, route, purpose]) => (
          <div key={route} className="grid grid-cols-[110px_1fr_2fr] gap-3 border-t border-[#e5e7eb] px-4 py-3 text-sm text-[#374151]">
            <span className="font-semibold text-[#f4511e]">{method}</span>
            <span className="font-medium">{route}</span>
            <span>{purpose}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
