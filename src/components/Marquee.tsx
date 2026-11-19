export function Marquee() {
  const items = [
    "Complimentary UK Shipping",
    "Elevated tools for modern living",
    "Hand-finished in solid brass · 7.5kg tested",
    "Stay in the Haus · Edit n°1",
  ];
  return (
    <div className="bg-primary text-primary-foreground py-3 overflow-hidden">
      <div className="flex gap-16 animate-[marquee_14s_linear_infinite] whitespace-nowrap eyebrow">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-16">
            {t} <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  );
}
