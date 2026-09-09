import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import DevLogo from "./logo";

const question = "สัปดาห์นี้ค่า latency ของ API เราเปลี่ยนไปยังไงบ้าง?";
const answer =
  "ค่ามัธยฐานลดลง 18% หลังปรับ caching เมื่อวันอังคาร แต่ค่า p95 ยังพุ่งอยู่ช่วง 09:00–10:00 น. ซึ่งตรงกับเวลาที่งาน re-index รอบกลางคืนทำงานพอดี";

const TypingDots = () => (
  <span className="inline-flex items-center gap-1" aria-label="DEV กำลังพิมพ์">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="dev-typing-dot h-1.5 w-1.5 rounded-full bg-dev-ink-soft"
        style={{ animationDelay: `${i * 0.16}s` }}
      />
    ))}
  </span>
);

const ChatPreview = () => {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState<0 | 1 | 2>(reduce ? 2 : 0);

  useEffect(() => {
    if (reduce) return;
    const t1 = window.setTimeout(() => setStage(1), 1100);
    const t2 = window.setTimeout(() => setStage(2), 2500);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [reduce]);

  const words = answer.split(" ");

  return (
    <div className="w-full overflow-hidden rounded-3xl border border-dev-line bg-dev-surface shadow-[0_30px_80px_-60px_rgb(0_0_0/0.6)]">
      <div className="flex items-center justify-between border-b border-dev-line/80 px-5 py-3.5">
        <DevLogo />
        <span className="text-xs text-dev-ink-soft">ตัวอย่างการใช้งาน</span>
      </div>

      <div className="space-y-5 px-5 py-6 sm:px-7 sm:py-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-end"
        >
          <p className="max-w-[85%] rounded-2xl rounded-br-md bg-dev-ink px-4 py-2.5 text-[14.5px] leading-relaxed text-dev-bg">
            {question}
          </p>
        </motion.div>

        <div className="min-h-[104px]">
          <AnimatePresence mode="wait" initial={false}>
            {stage === 0 && (
              <motion.div
                key="idle"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="h-4"
              />
            )}
            {stage === 1 && (
              <motion.div
                key="typing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-3 rounded-2xl border border-dev-line bg-dev-elevated px-4 py-3"
              >
                <TypingDots />
                <span className="text-[13px] text-dev-ink-soft">ZENDEV กำลังคิด</span>
              </motion.div>
            )}
            {stage === 2 && (
              <motion.div
                key="answer"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl rounded-bl-md border border-dev-line bg-dev-elevated px-4 py-3.5"
              >
                <p className="text-[14.5px] leading-relaxed text-dev-ink">
                  {words.map((word, i) => (
                    <motion.span
                      key={`${word}-${i}`}
                      initial={reduce ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.32, delay: reduce ? 0 : i * 0.022 }}
                    >
                      {word}{" "}
                    </motion.span>
                  ))}
                </p>
                <div className="mt-3 flex flex-wrap gap-2 border-t border-dev-line/70 pt-3">
                  {["latency-report.csv", "บันทึกการ deploy", "งาน re-index"].map((source) => (
                    <span
                      key={source}
                      className="rounded-full bg-dev-accent-soft px-2.5 py-1 text-[11.5px] font-medium text-dev-accent"
                    >
                      {source}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ChatPreview;
