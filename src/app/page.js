//import Image from 'next/image'
import Header from "../components/Header";
import Information from "../components/Information";
import Footer from "../components/Footer";
import Offer from "../components/Offer.jsx";
import Coach from "../components/Coach.jsx";
export const metadata = {
  title: "nhms",
  description: `Explore a vibrant, healthy range of recipe libraries, set and monitor your health goals,
  and integrate with wellknown well-being apps. Embark on your journey to a healthier you today!`,
};

export default function Home() {
  return (
    <>
      <Header />
      <Information />
      <Coach />
      <Offer />
      <Footer />
    </>
  );
}
