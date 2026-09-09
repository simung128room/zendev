import { motion } from "framer-motion";
import { BarChart3, BookOpen, Code2, Languages, ShieldCheck, Zap } from "lucide-react";
import { useMotionSafe, viewportOnce } from "./motion";

const features = [
  {
    icon: Zap,
    title: "ตอบไวในพริบตา",
    body: "คำตอบเริ่มไหลทันทีที่กดส่ง ไม่ต้องนั่งรอวงกลมหมุน",
  },
  {
    icon: BookOpen,
    title: "อ้างอิงแหล่งที่มาได้",
    body: "ทุกคำตอบบอกที่มาได้ ตรวจสอบได้จริง ไม่ต้องเดา",
  },
  {
    icon: Code2,
    title: "ออกแบบมาเพื่อคนสร้างงาน",
    body: "อธิบาย error, รีแฟคเตอร์ฟังก์ชัน หรือร่าง migration ได้ในหน้าแชทเดียว",
  },
  {
    icon: BarChart3,
    title: "อ่านข้อมูลของคุณได้",
    body: "แนบไฟล์ CSV หรือ log แล้วถามว่าอะไรเปลี่ยนไป DEV วิเคราะห์ให้เอง",
  },
  {
    icon: Languages,
    title: "สื่อสารได้หลายภาษา",
    body: "คล่องทั้งไทยและอีกหลายสิบภาษา พร้อมปรับโทนตามสไตล์การเขียนของคุณ",
  },
  {
    icon: ShieldCheck,
    title: "เป็นส่วนตัวตั้งแต่ต้น",
    body: "บทสนทนาเป็นของคุณคนเดียว ไม่นำไปเทรนโมเดลเด็ดขาด",
  },
];

const DevFeatures = () => {
  const { fadeUp, stagger } = useMotionSafe();

  return (
    <section id="features" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.div
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-2xl"
        >
          <motion.h2
            variants={fadeUp(0)}
            className="text-[28px] font-semibold leading-[1.35] tracking-[-0.02em] text-dev-ink sm:text-[38px]"
          >
            ทุกเรื่องที่คุณอยากถามเพื่อนร่วมงานเก่ง ๆ สักคน
          </motion.h2>
          <motion.p variants={fadeUp(0.08)} className="mt-4 text-[16px] leading-relaxed text-dev-ink-soft">
            ผู้ช่วยเดียวที่ค้นคว้า วิเคราะห์ เขียนงาน และเขียนโค้ดได้ ไม่ต้องเปิดแท็บเต็มจอ
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger(0.09, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-dev-line bg-dev-line sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map(({ icon: Icon, title, body }) => (
            <motion.article
              key={title}
              variants={fadeUp(0)}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-dev-surface p-7 transition-colors duration-300 hover:bg-dev-elevated"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-dev-accent-soft text-dev-accent transition-transform duration-300 group-hover:scale-105">
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <h3 className="mt-5 text-[17px] font-semibold tracking-[-0.01em] text-dev-ink">{title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-dev-ink-soft">{body}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DevFeatures;
