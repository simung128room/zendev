import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Braces, Lightbulb, ScrollText, Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";

const quickActions = [
  { label: "อธิบาย", icon: Sparkle },
  { label: "สรุปให้หน่อย", icon: ScrollText },
  { label: "เขียนโค้ด", icon: Braces },
  { label: "ระดมไอเดีย", icon: Lightbulb },
];

interface ComposerProps {
  onSend?: (value: string) => void;
}

const DevComposer = ({ onSend }: ComposerProps) => {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!value.trim()) return;
    onSend?.(value.trim());
    setValue("");
  };

  return (
    <div className="w-full">
      <motion.form
        onSubmit={submit}
        animate={{ scale: focused ? 1.012 : 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "group flex items-center gap-2 rounded-2xl border bg-dev-surface px-3 py-2.5 sm:px-4",
          "transition-[border-color,box-shadow] duration-300",
          focused
            ? "border-dev-accent/60 shadow-[0_0_0_4px_rgb(var(--dev-accent)/0.12),0_14px_40px_-24px_rgb(0_0_0/0.5)]"
            : "border-dev-line shadow-[0_2px_10px_-8px_rgb(0_0_0/0.4)] hover:border-dev-ink-soft/50 hover:shadow-[0_10px_30px_-22px_rgb(0_0_0/0.55)]",
        )}
      >
        <label htmlFor="dev-composer" className="sr-only">
          ถาม DEV ได้ทุกเรื่อง
        </label>
        <input
          id="dev-composer"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="ถาม DEV ได้ทุกเรื่อง..."
          autoComplete="off"
          className="h-9 flex-1 bg-transparent text-[15px] text-dev-ink placeholder:text-dev-ink-soft/70 focus:outline-none"
        />
        <motion.button
          type="submit"
          aria-label="ส่งข้อความ"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-dev-accent text-dev-accent-ink transition-colors duration-300 disabled:opacity-40"
          disabled={!value.trim()}
        >
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      </motion.form>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {quickActions.map(({ label, icon: Icon }) => (
          <motion.button
            key={label}
            type="button"
            onClick={() => setValue(`${label}: `)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-1.5 rounded-full border border-dev-line bg-dev-surface px-3.5 py-1.5 text-[13px] text-dev-ink-soft transition-colors duration-300 hover:border-dev-accent/40 hover:text-dev-ink"
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default DevComposer;
