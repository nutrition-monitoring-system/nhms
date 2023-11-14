//import Image from 'next/image'
"use client";
import { useRouter } from "next/navigation";
export default function Home({ params }) {
  return (
    <>
      <UserAvatar></UserAvatar>
      <ChartComponent></ChartComponent>
    </>
  );
  return <div>{params.id}</div>;
}
