import { FiActivity, FiBell, FiCommand, FiShield, FiTrendingUp, FiZap } from 'react-icons/fi';

const features = [
  {
    icon: FiCommand,
    title: 'Command Palette',
    text: 'Search tasks, trigger quick actions, and move through the app faster with AI-ready actions.',
  },
  {
    icon: FiBell,
    title: 'Smart Reminders',
    text: 'Deadline nudges, focus prompts, and high-risk alerts designed for busy workflows.',
  },
  {
    icon: FiShield,
    title: 'AI Risk Shield',
    text: 'Detect slipping tasks, blocked work, and overloaded teammates before deadlines are missed.',
  },
  {
    icon: FiTrendingUp,
    title: 'Live Analytics',
    text: 'Track completion rate, workload health, and active momentum from one premium dashboard.',
  },
  {
    icon: FiZap,
    title: 'Automation Flow',
    text: 'Ready for Next.js API automation like reminders, summaries, and AI assistant workflows.',
  },
  {
    icon: FiActivity,
    title: 'Voice + Copilot',
    text: 'Browser voice input and guided AI suggestions for a faster, more modern experience.',
  },
];

export default function SmartFeatureGrid() {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {features.map(({ icon: Icon, title, text }) => (
        <article
          key={title}
          className="rounded-[8px] border border-[#e5e7eb] bg-white p-4 sm:p-5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-[#f3f4f6] text-[#111827]">
            <Icon size={20} />
          </div>
          <h3 className="mt-4 text-base font-semibold text-[#111827]">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-[#6b7280]">{text}</p>
        </article>
      ))}
    </section>
  );
}
