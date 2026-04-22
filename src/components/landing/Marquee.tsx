const items = [
  "Bioenergy Global 2026",
  "Reneweex Global",
  "Waste to Energy Expo",
  "Bioenergy Global Summit",
  "Net-Zero · Energy Security",
  "29–31 July · New Delhi",
];

export const Marquee = () => (
  <section className="border-y border-foreground/10 bg-ink py-5 text-ink-foreground">
    <div className="overflow-hidden">
      <div className="marquee gap-12 whitespace-nowrap font-display text-2xl md:text-4xl">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-12">
            {t}
            <span className="text-accent">✺</span>
          </span>
        ))}
      </div>
    </div>
  </section>
);
