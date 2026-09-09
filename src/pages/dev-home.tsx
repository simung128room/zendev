import { Helmet } from "react-helmet-async";
import DevNavbar from "@/components/dev/navbar";
import DevHero from "@/components/dev/hero";
import DevFeatures from "@/components/dev/features";
import DevHowItWorks from "@/components/dev/how-it-works";
import DevDownload from "@/components/dev/download";
import DevFaq from "@/components/dev/faq";
import DevFooter from "@/components/dev/footer";

const title = "ZENDEV — ผู้ช่วย AI อัจฉริยะของคุณ";
const description =
  "ถามคำถาม สำรวจไอเดีย วิเคราะห์ข้อมูล และได้คำตอบที่ใช้ได้จริง ครบในที่เดียว ดาวน์โหลดผู้ช่วย AI ZENDEV สำหรับ Android";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ZENDEV",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Android",
  description,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const DevHome = () => (
  <div className="min-h-screen bg-dev-bg text-dev-ink antialiased">
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>

    <DevNavbar />
    <main>
      <DevHero />
      <DevFeatures />
      <DevHowItWorks />
      <DevDownload />
      <DevFaq />
    </main>
    <DevFooter />
  </div>
);

export default DevHome;
