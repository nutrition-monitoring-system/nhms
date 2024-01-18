//import Image from 'next/image'
"use client";
import UserAvatar from "../../../components/User.jsx";
import Footer from "../../../components/Footer.jsx";
export default function Home({ params }) {
  return (
    <>
      <UserAvatar />
      <Footer />
    </>
  );
}
