//import Image from 'next/image'
"use client";
import UserAvatar from "../../../components/User.jsx";
import ChartComponent from "../../../components/User_charts.jsx";
export default function Home({ params }) {
  return (
    <>
      <UserAvatar />
      <ChartComponent />
    </>
  );
}
