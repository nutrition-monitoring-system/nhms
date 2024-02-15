//import Image from 'next/image'
"use client";
import Footer from "../../components/Footer";
import Logo from "../../components/Logo";
import { signOut, useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import ProfileNavigation from "@/components/ProfileNavigation";
// export const metadata = {
//   title: "Blog",
//   description: "Blog Page",
// };

export default function Home() {
  //Not implemeted Yet
  return (
    <>
      <BlogHeaderParent></BlogHeaderParent>
      <BlogPage></BlogPage>
      <Footer></Footer>
    </>
  );
}

const BlogHeaderParent = () => {
  return (
    <SessionProvider>
      <BlogHeader></BlogHeader>
    </SessionProvider>
  );
};

const BlogHeader = () => {
  return (
    <div className="h-screen min-h-fit relative text-black grid place-items-center font-opensans">
      <div className="absolute flex bg-primary justify-center items-center flex-col inset-x-0 top-0 min-h-fit h-[85%]">
        <NavBar></NavBar>
        <div className="text-center grid place-items-center min-h-fit h-full p-2 sm:p-0 translate-y-[-50px] animate-enter">
          <h1
            className="text-[4rem] w-3/4 font-black
      sm:text-[35px] sm:w-full xl:text-[70px] xl:w-[80%]"
          >
            Our Blogs and Articles
          </h1>
          <div className="w-1/2 sm:w-full py-2 text-[20px]">
            Explore a vibrant recipe library, set and monitor your health goals,
            and integrate with well-being apps. Embark on your journey to a
            healthier you today!`
          </div>
          <div className="min-h-auto py-1 flex justify-center items-center sm:gap-3 gap-7 sm:flex-wrap">
            <Image src="/icons/blog2.png" alt="blog" width={50} height={50} />
          </div>
        </div>
      </div>
    </div>
  );
};

const NavBar = () => {
  const menuItems = useRef(null); // a container reference to the list of menuitems
  const handleMenuclick = () => {
    // This function handles the animation for the userMenu. It will animate base on the custom class added
    menuItems.current.classList.toggle("slide-down");
  };
  const { status } = useSession({
    // useSesstion is for protection.
    // Making sure the user does not visit a route they are not allowed to visit
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
    },
  });
  // checking if the user is authenticated or is in a loading state
  if (status === "unauthenticated" || status === "loading") {
    return (
      <div className="w-full grid grid-cols-2 py-3 bg-white sm:grid-cols-3">
        <Logo></Logo>
        <div className="flex justify-center items-center gap-2 sm:gap-1 sm:col-span-2">
          <div className="mx-4">
            <Link href="/">Home</Link>
          </div>
          <div className="mx-4">
            <Link href="/login">Recipes</Link>
          </div>
          <button className="tile">
            <Link href="/login">Login</Link>
          </button>
          <button className="tile">
            <Link href="/register">Register</Link>
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full grid grid-cols-2 py-2 bg-white sm:grid-cols-3">
      <Logo />
      <div className="flex justify-center items-center gap-2 sm:gap-1 sm:col-span-2">
        <div className="mx-4">
          <Link href="/login">Home</Link>
        </div>
        <div className="mx-4">
          <Link href="/login">Recipes</Link>
        </div>
        <ProfileNavigation />
      </div>
    </div>
  );
};

const BlogPage = () => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-3 m-auto min-h-screen p-5">
      <BlogComponent />
      <BlogComponent />
      <BlogComponent />
      <BlogComponent />
      <BlogComponent />
      <BlogComponent />
    </div>
  );
};

const BlogComponent = () => {
  //const date = new Date().toDateString();
  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-primary shadow-md border border-gray-200 rounded-lg max-w-sm mb-5">
        <a href="#">
          <Image
            className="rounded-t-lg"
            src="https://flowbite.com/docs/images/blog/image-1.jpg"
            width={600}
            height={300}
            alt=""
          />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">
              Noteworthy technology acquisitions 2021
            </h5>
          </a>
          <p className="font-normal text-gray-700 mb-3">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
          <button className="tile bg-black text-white">Read more</button>
        </div>
      </div>
    </div>
  );
};
