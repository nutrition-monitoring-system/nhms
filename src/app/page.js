//import Image from 'next/image'
import Header from "../components/Header";
import Information from "../components/Information";
import Footer from "../components/Footer";
import WhatWeOffer from "../components/Offer.jsx";
export const metadata = {
  title: "landing",
  description: "Landing Information Page",
};

export default function Home() {
  return (
    <>
      <Header />
      <Information />
      <WhatWeOffer />
      <Footer />
    </>
  );
}
