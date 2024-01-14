//import Image from 'next/image'
"use client";
import Footer from "../../components/Footer";
import { signOut, useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import { useRef } from "react";
// export const metadata = {
//   title: "Blog",
//   description: "Blog Page",
// };

export default function Home() {
  //Not implemeted Yet
  return (
    <SessionProvider>
      <BlogHeader></BlogHeader>
      <BlogPage></BlogPage>
      <Footer></Footer>
    </SessionProvider>
  );
}

const BlogHeader = () => {
  return (
    <div className="h-screen min-h-fit relative bg-white text-black grid place-items-center font-opensans">
      <div className="absolute bg-primary flex justify-center items-center flex-col inset-x-0 top-0 min-h-fit h-[85%]">
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
        <div className="grid place-items-center text-black font-modak text-[30px]">
          <Link href="/">NHMS</Link>
        </div>
        <div className="flex justify-center items-center gap-2 sm:gap-1 sm:col-span-2">
          <div className="mx-4">
            <Link href="/login">Home</Link>
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
      <div className="grid place-items-center text-black font-modak text-[30px]">
        <Link href="/">NHMS</Link>
      </div>
      <div className="flex justify-center items-center gap-2 sm:gap-1 sm:col-span-2">
        <div className="mx-4">
          <Link href="/login">Home</Link>
        </div>
        <div className="mx-4">
          <Link href="/login">Recipes</Link>
        </div>
        <div className="tile relative z-10 flex justify-around items-center gap-3">
          <img
            src="/icons/man.png"
            width={25}
            height={25}
            alt="Person icon"
            className="ml-2 rounded-[50px] border-1 border-black"
            onClick={handleMenuclick}
          />
          <span onClick={handleMenuclick}>Mr. Bryan</span>
          <div
            ref={menuItems}
            className="absolute top-[-6rem] opacity-0 left-0 right-0 rounded-md
             shadow-2xl p-2 grid grid-rows-3 gap-1 z-[-10] translate-y-[-100] pointer-events-none"
          >
            <div className="tile grid grid-cols-4">
              {" "}
              <img
                src="/icons/account.png"
                alt="Settings icon"
                width={20}
                height={20}
              />
              <Link href={"/user/userd9f49w"}>Profile</Link>
            </div>
            <div className="tile grid grid-cols-4">
              {" "}
              <img
                src="/icons/settings.png"
                alt="Settings icon"
                width={20}
                height={20}
              />
              <Link href={"/user/userd9f49w"}>Settings</Link>
            </div>
            <div className="tile grid grid-cols-4">
              {" "}
              <img
                src="/icons/translate.png"
                alt="Language/translate icon"
                width={20}
                height={20}
              />
              <span>Languages</span>
            </div>
            <div
              className="tile grid grid-cols-4"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              {" "}
              <img
                src="/icons/logout.png"
                alt="Logout icon"
                width={20}
                height={20}
              />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogPage = () => {
  return (
    <div className="grid grid-cols-1 gap-3 m-auto w-[80%] place-items-center py-5">
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
  return (
    <div className="bg-primary p-1 shadow-lg rounded-md overflow-hidden place-items-center relative">
      <img
        className="row-span-4 rounded-md shadow-xl z-[-10] blur-sm w-1/2 h-1/2"
        src={
          "https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8fA%3D%3D"
        }
      />
      <div className="absolute z-[10] inset-0 flex justify-center items-center flex-col gap-3">
        <div className="rounded-full w-[40px] h-[40px] bg-white z-10 shadow-lg grid place-items-center absolute bottom-4 right-4 font-black">
          i
        </div>
        <h1 aria-name="title" className="text-[2rem] font-extrabold text-white">
          The Power of Plant-Based Deits
        </h1>
        <h4 aria-name="subtitle" className="font-bold">
          Unlocking health and Sustainability
        </h4>
        <p aria-name="blogtext" className="w-1/2 text-white">
          Learn how plant-based diets can boost your well-being and contribute
          to a greener planet. Discover the benefits and practical tips for
          embracing a more plant-focused lifestyle.
        </p>
        <div className="w-1/2 flex justify-center items-center gap-3">
          <span aria-name="author" className="text-white">
            Charles, Jameson
          </span>
          <strong aria-name="author" className="p-3 rounded-lg">
            {new Date().getFullYear()}
          </strong>
        </div>
      </div>
    </div>
  );
};
