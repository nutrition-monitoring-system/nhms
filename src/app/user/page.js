//import Image from 'next/image'
"use client";
import User from "../../components/User.jsx";
import Footer from "../../components/Footer.jsx";
import Loading from "../../components/Loading.jsx";
import { SessionProvider } from "next-auth/react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";

function Home({ params }) {
  // useRouter hook is use to navigate programmatically to different routes
  const router = useRouter();
  // checking if user is authenticated or not
  const { session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      return router.push("/login");
    },
  });
  // if user is authenticated then render the admin page else render the loading component
  if ("loading" === status) {
    return <Loading />;
  }

  return (
    <>
      <User handsignOut={() => signOut({ callbackUrl: "/" })} />
      <Toaster></Toaster>
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
