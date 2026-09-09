import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useMotionSafe, viewportOnce } from "./motion";

const faqs = [
  {
    q: "ZENDEV ใช้ฟรีไหม?",
    a: "ฟรีครับ แอปบน Android ใช้ได้ฟรี พร้อมโควตาต่อวันที่ใจกว้าง หากใช้งานหนักมากค่อยอัปเกรดเป็นแพ็กเกจแบบเสียเงินภายหลังได้",
  },
  {
    q: "ทำไมเป็นไฟล์ APK ไม่ใช่ Play Store?",
    a: "ตอนนี้อยู่ระหว่างรอตรวจสอบบนสโตร์ ไฟล์ APK คือบิลด์เดียวกันที่เซ็นรับรองแล้ว ผู้ใช้กลุ่มแรกจึงไม่ต้องรอ",
  },
  {
    q: "เอาบทสนทนาไปเทรนโมเดลหรือเปล่า?",
    a: "ไม่ครับ บทสนทนาของคุณไม่ถูกนำไปเทรนโมเดล และลบถาวรได้ทุกเมื่อ",
  },
  {
    q: "ZENDEV อ่านไฟล์ได้ไหม?",
    a: "แนบเอกสาร สเปรดชีต ไฟล์ log หรือรูปภาพไปกับข้อความได้เลย ZENDEV จะตอบโดยอ้างอิงเนื้อหาในไฟล์นั้น",
  },
  {
    q: "จะมีแอปบน iOS ไหม?",
    a: "กำลังพัฒนาอยู่ครับ ระหว่างนี้ใช้เว็บแอปบน iOS ได้เลย และซิงก์บทสนทนากับเครื่อง Android ได้",
  },
];

const DevFaq = () => {
  const { fadeUp, stagger } = useMotionSafe();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 border-t border-dev-line py-24 sm:py-32">
      <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
        <motion.h2
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-[28px] font-semibold leading-[1.35] tracking-[-0.02em] text-dev-ink sm:text-[38px]"
        >
          คำถามที่พบบ่อย
        </motion.h2>

        <motion.div
          variants={stagger(0.07, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-10 divide-y divide-dev-line border-y border-dev-line"
        >
          {faqs.map((item, index) => {
            const isOpen = open === index;
            return (
              <motion.div key={item.q} variants={fadeUp(0)}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="text-[16px] font-medium text-dev-ink">{item.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-dev-line text-dev-ink-soft"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pr-10 text-[14.5px] leading-relaxed text-dev-ink-soft">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default DevFaq;
