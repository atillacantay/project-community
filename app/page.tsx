import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ahali - Home",
  description:
    "Discover the latest discussions and topics in our minimal and interactive forum.",
  openGraph: {
    title: "Ahali - Home",
    description:
      "Discover the latest discussions and topics in our minimal and interactive forum.",
    url: "https://ahali.vercel.app",
  },
};

export default function Home() {
  return <div>home</div>;
}
