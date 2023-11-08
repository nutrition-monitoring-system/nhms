"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import { useRef } from "react";
import Typewriter from "typewriter-effect";
export default function Header() {
  return (
    <SessionProvider>
      <div className="h-screen relative bg-white text-black grid place-items-center font-opensans">
        <div className="absolute bg-primary flex justify-center items-center flex-col inset-x-0 top-0 h-[85%]">
          <NavBar></NavBar>
          <div className="text-center grid place-items-center h-full p-2">
            <h1
              className="text-[50px] w-3/4 font-black translate-y-[-50px] hover:translate-y-0 animate-enter
            sm:text-[35px] sm:w-full"
            >
              A Smart and Personalised Nutrition Management System
            </h1>
            <div className="w-1/2 sm:w-3/4">
              <Typewriter
                options={{
                  autoStart: true,
                  loop: false,
                }}
                onInit={(typewriter) => {
                  typewriter
                    .changeDelay(15)
                    .typeString(
                      `Explore a vibrant range of recipe libraries, set and monitor your health goals,
                      and integrate with wellknown well-being apps. Embark on your journey to a healthier you today!`
                    )
                    .start();
                }}
              />
            </div>
            <ImageIcon
              src={"angle-double-small-down.png"}
              link={"#information"}
            />
          </div>
        </div>
      </div>
    </SessionProvider>
  );
}

function NavBar() {
  const menuItems = useRef(null);
  const handleMenuclick = () => {
    menuItems.current.classList.toggle("slide-down");
  };
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
    },
  });
  if (status === "unauthenticated" || status === "loading") {
    return (
      <div className="w-full grid grid-cols-2 py-2 bg-white sm:grid-cols-3">
        <div className="grid place-items-center text-black font-modak text-[30px]">
          Logo
        </div>
        <div className="flex justify-center items-center gap-2 sm:gap-1 sm:col-span-2">
          <Button href={"/login"}>Login</Button>
          <Button href={"/register"}>Register</Button>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full grid grid-cols-2 py-2 bg-white sm:grid-cols-3">
      <div className="grid place-items-center text-black font-modak text-[30px]">
        Logo
      </div>
      <div className="flex justify-center items-center gap-2 sm:gap-1 sm:col-span-2">
        <div className="tile">
          <img
            src="/icons/blog.png"
            width={20}
            height={20}
            alt="Blog icon"
            className="ml-2 "
          />
          <span>Blog</span>
        </div>
        <div className="tile relative z-10">
          <img
            src="/icons/account.png"
            width={20}
            height={20}
            alt="account icon"
            className="ml-2 "
          />
          <span onClick={handleMenuclick}>Account</span>
          <div
            ref={menuItems}
            className="absolute top-[-6rem] opacity-0 left-0 right-0 rounded-md
             shadow-2xl p-2 grid grid-rows-3 gap-1 z-[-10] translate-y-[-100] pointer-events-none"
          >
            <div className="tile flex justify-around items-center">
              {" "}
              <img
                src="/icons/settings.png"
                alt="Settings icon"
                width={20}
                height={20}
              />
              <span>Settings</span>
            </div>
            <div className="tile flex justify-around items-center">
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
              className="tile flex justify-left items-center"
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
}

function Button({ children, href }) {
  return (
    <Link href={href}>
      <button
        className="m-2 min-w-fit grid place-items-center rounded-md
          bg-white px-8 py-3 text-sm
          shadow-xl transition-all duration-200 ease-in
          hover:shadow-2xl"
      >
        {children}
      </button>
    </Link>
  );
}

function ImageIcon({ link, src }) {
  return (
    <>
      <Link href={link}>
        {" "}
        <img
          className="hover:translate-y-2 transition-transform duration-200 ease-in-out"
          src={"/icons/" + src}
          width={30}
          height={30}
        />
      </Link>
    </>
  );
}
