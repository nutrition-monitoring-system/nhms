"use client";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "./Logo";
import ProfileNavigation from "./ProfileNavigation";
import { useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
export default function Header() {
  // The header section returns a description of the page.

  //This are png icons for making the site look more attractive
  const headerIcons = [
    "/icons/headerIcons/dish.png",
    "/icons/headerIcons/drink.png",
    "/icons/headerIcons/hamburger.png",
    "/icons/headerIcons/healthy-food.png",
    "/icons/headerIcons/recipe.png",
    "/icons/headerIcons/hamburger.png",
    "/icons/headerIcons/healthy-food.png",
    "/icons/headerIcons/recipe.png",
  ];

  // This section is wrapped by a SessionProvider component for accessing session variables
  // It contains a navigation bar and introductory information into the site
  return (
    <SessionProvider>
      <div className="h-screen min-h-fit relative bg-white text-black grid place-items-center font-opensans">
        <div className="absolute bg-primary flex justify-center items-center flex-col inset-x-0 top-0 min-h-fit h-[85%] md:h-full">
          <NavBar></NavBar>
          <div className="text-center grid place-items-center min-h-fit h-full p-2 sm:p-0 translate-y-[-50px] animate-enter">
            <h1
              className="text-[50px] w-3/4 font-black
            sm:text-[35px] sm:w-full xl:text-[70px] xl:w-[80%]"
            >
              A Smart and Personalised Nutrition Management System
            </h1>
            <div className="w-1/2 sm:w-full py-2 text-[20px]">
              Explore a vibrant recipe library, set and monitor your health
              goals, and integrate with well-being apps. Embark on your journey
              to a healthier you today!`
            </div>
            <div className="min-h-auto py-1 flex justify-center items-center sm:gap-3 gap-7 sm:flex-wrap">
              {headerIcons.map((iconUrl, idx) => {
                return (
                  <div
                    key={idx}
                    className="bg-white p-3 rounded-[50px] sm:p-2 backdrop-blur-sm"
                    style={{
                      animationDelay: `${idx * 100}ms`,
                      animationFillMode: "forwards",
                    }}
                  >
                    <Image
                      href={null}
                      src={iconUrl}
                      width={30}
                      height={30}
                      alt="decorative icons"
                    />
                  </div>
                );
              })}
            </div>
            <div className="w-full min-h-fit grid place-items-center py-5">
              <ImageIcon
                src={"angle-double-small-down.png"}
                href={"#information"}
              />
            </div>
          </div>
        </div>
      </div>
    </SessionProvider>
  );
}

function NavBar() {
  // The navigation bar component returns a conditional navigation bar. Wether the user is logged in or not.
  // It will render differently

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
            <Link href="/home">Recipes</Link>
          </div>
          <div className="mx-4">
            <Link href="/blog">Blog</Link>
          </div>
          <button className="tile ring-white hover:ring-secondary ring-2 font-semibold">
            <Link href="https://scheduler.zoom.us/mgostic">
              Book a Consultation
            </Link>
          </button>
          <button className="tile ring-white hover:ring-secondary ring-2">
            <Link href="/login">Login</Link>
          </button>
          <button className="tile ring-white hover:ring-secondary ring-2">
            <Link href="/register">Register</Link>
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full grid grid-cols-2 py-2 bg-white sm:grid-cols-3">
      <Logo></Logo>
      <div className="flex justify-center items-center gap-2 sm:gap-1 sm:col-span-2">
        <div className="mx-4">
          <Link href="/home">Recipes</Link>
        </div>
        <div className="mx-4">
          <Link href="/blog">Blog</Link>
        </div>
        <button className="tile text-black ring-white hover:ring-secondary ring-2">
          <Link href="https://scheduler.zoom.us/mgostic">
            Book a Consultation
          </Link>
        </button>
        <ProfileNavigation />
      </div>
    </div>
  );
}

function ImageIcon({ href, src }) {
  // This function will conditionally render if there's an href attribute or not.
  return (
    <>
      {href ? (
        <Link href={href}>
          {" "}
          <Image
            className="hover:translate-y-2 transition-transform duration-200 ease-in-out"
            src={"/icons/" + src}
            width={30}
            height={30}
            alt="Image icon with link."
          />
        </Link>
      ) : (
        <Image
          className="shadow-xl h-30"
          src={"/icons/" + src}
          width={30}
          height={30}
          alt="Image icon without link."
        />
      )}
    </>
  );
}
