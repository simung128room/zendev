import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import ChatPreview from "./chat-preview";
import DevComposer from "./composer";
import { useMotionSafe } from "./motion";

const DevHero = () => {
  const { fadeUp, fadeScale, stagger } = useMotionSafe();

  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,rgb(var(--dev-accent)/0.10),transparent_70%)]"
      />
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.div variants={stagger(0.1, 0.05)} initial="hidden" animate="visible" className="mx-auto w-full max-w-3xl text-center">
          <motion.p
            variants={fadeUp(0)}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-dev-line bg-dev-surface px-3.5 py-1.5 text-[12.5px] text-dev-ink-soft"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-dev-accent" />
            ZENDEV v1.0 พร้อมใช้งานบน Android แล้ว
          </motion.p>

          <motion.h1
            variants={fadeUp(0.05, 24)}
            className="mt-6 text-balance text-[34px] font-semibold leading-[1.3] tracking-[-0.035em] text-dev-ink sm:text-[48px] lg:text-[58px]"
          >
            พบกับ ZENDEV ผู้ช่วย AI อัจฉริยะของคุณ
          </motion.h1>

          <motion.p
            variants={fadeUp(0.16)}
            className="mx-auto mt-5 max-w-2xl text-pretty text-[16px] leading-relaxed text-dev-ink-soft sm:text-[17.5px]"
          >
            ถามคำถาม สำรวจไอเดีย วิเคราะห์ข้อมูล และได้คำตอบที่นำไปใช้ได้จริง — ครบในที่เดียว
          </motion.p>

          <motion.div variants={fadeUp(0.26)} className="mx-auto mt-9 w-full max-w-2xl">
            <DevComposer />
          </motion.div>

          <motion.div
            variants={fadeScale(0.36)}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <motion.a
              href="#download"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-dev-ink px-6 text-sm font-medium text-dev-bg sm:w-auto"
            >
              <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              ดาวน์โหลด APK
            </motion.a>
            <motion.a
              href="#features"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-dev-line bg-dev-surface px-6 text-sm font-medium text-dev-ink transition-colors duration-300 hover:border-dev-ink-soft/50 sm:w-auto"
            >
              สำรวจ ZENDEV
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp(0.5, 28)}
          initial="hidden"
          animate="visible"
          className="mx-auto mt-16 w-full max-w-3xl sm:mt-20"
        >
          <ChatPreview />
        </motion.div>
      </div>
    </section>
  );
};

export default DevHero;
