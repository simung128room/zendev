import DevLogo from "./logo";

const DevFooter = () => (
  <footer className="border-t border-dev-line bg-dev-surface">
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <DevLogo />
      <nav className="flex flex-wrap items-center gap-x-7 gap-y-3">
        {[
          { label: "ความสามารถ", href: "#features" },
          { label: "วิธีใช้งาน", href: "#how-it-works" },
          { label: "ดาวน์โหลด", href: "#download" },
          { label: "คำถามที่พบบ่อย", href: "#faq" },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="dev-underline text-[13.5px] text-dev-ink-soft transition-colors duration-300 hover:text-dev-ink"
          >
            {link.label}
          </a>
        ))}
      </nav>
      <p className="text-[13px] text-dev-ink-soft">
        © {new Date().getFullYear()} ZENDEV — AI Assistant
      </p>
    </div>
  </footer>
);

export default DevFooter;
