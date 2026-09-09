import { motion } from "framer-motion";
import { useMotionSafe, viewportOnce } from "./motion";

const steps = [
  {
    number: "01",
    title: "ติดตั้ง DEV",
    body: "โหลดไฟล์ APK ติดตั้งในไม่กี่วินาที แล้วเปิดใช้ได้เลย ไม่ต้องสมัครยุ่งยาก",
  },
  {
    number: "02",
    title: "ถามได้ทุกเรื่อง",
    body: "พิมพ์คำถาม วางเอกสาร หรือแนบไฟล์ DEV เข้าใจว่าคุณต้องการอะไร",
  },
  {
    number: "03",
    title: "ต่อยอดจากคำตอบ",
    body: "ถามต่อ ปรับแก้ ส่งออก หรือแชร์ได้ทันที บทสนทนาจำบริบทไว้ครบ",
  },
];

const DevHowItWorks = () => {
  const { reduce, fadeUp, fadeScale, stagger } = useMotionSafe();

  return (
    <section id="how-it-works" className="scroll-mt-24 border-y border-dev-line bg-dev-surface py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.h2
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-2xl text-[28px] font-semibold leading-[1.35] tracking-[-0.02em] text-dev-ink sm:text-[38px]"
        >
          แค่ 3 ขั้นตอน ก็เริ่มใช้ได้เลย
        </motion.h2>

        <motion.ol
          variants={stagger(0.16, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8"
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-6 hidden md:block">
            <motion.div
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="h-px origin-left bg-gradient-to-r from-dev-line via-dev-accent/50 to-dev-line"
            />
          </div>

          {steps.map((step) => (
            <motion.li key={step.number} variants={fadeUp(0)} className="relative">
              <motion.span
                variants={fadeScale(0.1)}
                className="relative z-10 grid h-12 w-12 place-items-center rounded-full border border-dev-line bg-dev-bg text-[15px] font-semibold tracking-tight text-dev-accent"
              >
                {step.number}
              </motion.span>
              <h3 className="mt-5 text-[18px] font-semibold tracking-[-0.01em] text-dev-ink">{step.title}</h3>
              <p className="mt-2 max-w-sm text-[14.5px] leading-relaxed text-dev-ink-soft">{step.body}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
};

export default DevHowItWorks;
