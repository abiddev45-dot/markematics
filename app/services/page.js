import ServicesPage from "@/pages/Services";

export const metadata = {
  title: "Services - Research, Retail Audits & Technology | Markematics",
  description:
    "Customized research, methodologies, advanced analytics, AI eyeball tracking, BrandTrack, MarketSim, metrea retail audits, BICrux, Win@Shelf and GIS dashboards.",

  openGraph: {
    title: "Services - Research, Retail Audits & Technology | Markematics",
    description:
      "Four practices and a proprietary product suite built for tactical and strategic decisions.",
    url: "/services",
    type: "website",
  },

  alternates: {
    canonical: "/services",
  },
};

export default function Page() {
  return <ServicesPage />;
}
