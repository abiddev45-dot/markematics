import Home from "@/pages/Home";

export const metadata = {
  title: "Markematics - Turning Markets Into Measurable Intelligence",
  description:
    "Karachi-based market research and consulting agency since 2011. Retail audits, brand health tracking, AI research tools and analytics for 130+ clients.",

  openGraph: {
    title: "Markematics - Turning Markets Into Measurable Intelligence",
    description:
      "Full-service market research and consulting across Pakistan, the Middle East and South Asia.",
    url: "/",
    type: "website",
  },

  alternates: {
    canonical: "/",
  },
};

export default function Page() {
  return <Home />;
}
