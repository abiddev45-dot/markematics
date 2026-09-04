import ContactPage from "@/pages/Contact";

export const metadata = {
  title: "Contact Markematics - Karachi Market Research Company",
  description:
    "Talk to Markematics: 021-34549811-5, 192 P Block 2 P.E.C.H.S. Karachi-75400. Brief us on your research, retail audit or analytics question.",

  openGraph: {
    title: "Contact Markematics - Karachi Market Research Company",
    description: "Let's work together — brief our Karachi research team.",
    url: "/contact",
    type: "website",
  },

  alternates: {
    canonical: "/contact",
  },
};

export default function Page() {
  return <ContactPage />;
}
