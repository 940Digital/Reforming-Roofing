const options = [
  { href: "/", label: "Option 1" },
  { href: "/option-2", label: "Option 2" },
];

/** Review-only bar for flipping between design options. Remove before launch. */
export function OptionSwitcher({ current }: { current: 1 | 2 }) {
  return (
    <div className="fixed inset-x-0 top-0 z-[70] flex h-9 items-center justify-center gap-1 bg-[#111] font-body text-[0.8rem] text-white/70">
      <span className="mr-2 hidden sm:inline">Design options:</span>
      {options.map((o, i) => {
        const active = current === i + 1;
        return (
          <a
            key={o.href}
            href={o.href}
            aria-current={active ? "page" : undefined}
            className={`px-3 py-1 transition-colors ${active ? "bg-white font-medium text-[#111]" : "hover:text-white"}`}
          >
            {o.label}
          </a>
        );
      })}
    </div>
  );
}
