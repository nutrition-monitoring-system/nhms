//import Image from 'next/image'
"use client";
import User from "../../../components/User.jsx";
import Footer from "../../../components/Footer.jsx";
import Loading from "../../../components/Loading.jsx";
import { SessionProvider } from "next-auth/react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
function Home({ params }) {
  const { id } = params;
  const router = useRouter();
  const { session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      return router.push("/login");
    },
  });
  if ("loading" === status) {
    return <Loading />;
  }

  return (
    <>
      <User handsignOut={() => signOut({ callbackUrl: "/" })} />
      <Footer />
    </>
  );
}

export default function Page() {
  return (
    <SessionProvider>
      <Home></Home>
    </SessionProvider>
  );
}
