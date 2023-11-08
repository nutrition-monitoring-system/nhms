//import Image from 'next/image'
import Header from "../components/Header";
import Information from "../components/Information";
import Footer from "../components/Footer";
import WhatWeOffer from "../components/Offer.jsx";
import Coach from "../components/Coach.jsx";
export const metadata = {
  title: "nmhs",
  description: `Explore Link vibrant recipe library, set and monitor health goals,
  and integrate with well-being apps. Embark on your journey to Link
  healthier you today!`,
};

export default function Home() {
  return (
    <>
      <Header />
      <Information />
      <Coach />
      <WhatWeOffer />
      <Footer />
    </>
  );
}
