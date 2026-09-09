import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Check, Loader2, Smartphone } from "lucide-react";
import { devConfig } from "@/dev/config";
import { useMotionSafe, viewportOnce } from "./motion";

type State = "idle" | "preparing" | "ready";

const DevDownload = () => {
  const { fadeUp, stagger } = useMotionSafe();
  const reduce = useReducedMotion();
  const [state, setState] = useState<State>("idle");
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const handleDownload = () => {
    if (state !== "idle") return;
    setState("preparing");
    timers.current.push(
      window.setTimeout(() => {
        setState("ready");
        window.location.href = devConfig.apkUrl;
      }, 1400),
      window.setTimeout(() => setState("idle"), 4200),
    );
  };

  const meta = [
    { label: "เวอร์ชัน", value: `DEV v${devConfig.version}` },
    { label: "แพลตฟอร์ม", value: devConfig.platform },
    { label: "รูปแบบไฟล์", value: devConfig.format },
    { label: "ขนาดไฟล์", value: devConfig.size },
  ];

  return (
    <section id="download" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid items-center gap-12 lg:grid-cols-2"
        >
          <div>
            <motion.h2
              variants={fadeUp(0)}
              className="text-[28px] font-semibold leading-[1.35] tracking-[-0.02em] text-dev-ink sm:text-[38px]"
            >
              พก ZENDEV ติดตัวไปด้วยกัน
            </motion.h2>
            <motion.p variants={fadeUp(0.08)} className="mt-4 max-w-md text-[16px] leading-relaxed text-dev-ink-soft">
              ผู้ช่วยตัวเต็มบนมือถือของคุณ ติดตั้งไฟล์ Android ได้โดยตรง ไม่ต้องรอคิวสโตร์ ไม่ต้องลงชื่อรอ
            </motion.p>
            <motion.dl variants={fadeUp(0.16)} className="mt-8 grid max-w-md grid-cols-2 gap-x-6 gap-y-4">
              {meta.map((item) => (
                <div key={item.label}>
                  <dt className="text-[12px] uppercase tracking-[0.08em] text-dev-ink-soft">{item.label}</dt>
                  <dd className="mt-1 text-[15px] font-medium text-dev-ink">{item.value}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div
            variants={fadeUp(0.2, 24)}
            whileHover={reduce ? undefined : { y: -6 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="group relative rounded-3xl border border-dev-line bg-dev-surface p-8 shadow-[0_24px_70px_-56px_rgb(0_0_0/0.7)] transition-shadow duration-500 hover:shadow-[0_40px_90px_-52px_rgb(0_0_0/0.6)]"
          >
            <div className={reduce ? undefined : "dev-float"}>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-dev-accent-soft text-dev-accent">
                <Smartphone className="h-5 w-5" />
              </span>
            </div>

            <h3 className="mt-6 text-[20px] font-semibold tracking-[-0.015em] text-dev-ink">
              ZENDEV สำหรับ Android
            </h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-dev-ink-soft">
              ไฟล์ APK ที่เซ็นรับรองแล้ว ติดตั้งได้ทันที รองรับ Android 9 ขึ้นไป
            </p>

            <motion.button
              type="button"
              onClick={handleDownload}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="group/btn mt-7 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-dev-accent px-6 text-sm font-medium text-dev-accent-ink"
              aria-live="polite"
            >
              <AnimatePresence mode="wait" initial={false}>
                {state === "idle" && (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex items-center gap-2"
                  >
                    ดาวน์โหลด APK
                    <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-y-0.5" />
                  </motion.span>
                )}
                {state === "preparing" && (
                  <motion.span
                    key="preparing"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex items-center gap-2"
                  >
                    <Loader2 className="h-4 w-4 animate-spin" />
                    กำลังเตรียมไฟล์ APK...
                  </motion.span>
                )}
                {state === "ready" && (
                  <motion.span
                    key="ready"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="inline-flex items-center gap-2"
                  >
                    <Check className="h-4 w-4" />
                    พร้อมดาวน์โหลดแล้ว
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <p className="mt-4 text-center text-[12.5px] text-dev-ink-soft">
              การติดตั้งถือว่าคุณยอมรับเงื่อนไขการใช้งานของ ZENDEV
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DevDownload;
