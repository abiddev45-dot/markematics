import AboutPage from "@/pages/About";

export const metadata = {
  title: "About Markematics - Research Team & Track Record",
  description:
    "Markematics: 120+ professionals, 10 offices, 700+ projects since 2011. Meet the leadership behind Pakistan's data-driven research agency.",

  openGraph: {
    title: "About Markematics - Research Team & Track Record",
    description: "Who we are, what we've delivered and the people behind the insight.",
    url: "/about",
    type: "website",
  },

  alternates: {
    canonical: "/about",
  },
};

export default function Page() {
  return <AboutPage />;
}
