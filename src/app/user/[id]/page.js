//import Image from 'next/image'
"use client";
import { useRouter } from "next/navigation";
export default function Home({ params }) {
  return <div>{params.id}</div>;
}
