"use client";
import { useRef } from "react";
import Link from "next/link";
import Logo from "./Logo";
import ProfileNavigation from "./ProfileNavigation";
import { useSession } from "next-auth/react";

export default function NavBar() {
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
      <div className="w-full grid grid-cols-2 py-3 bg-white md:grid-cols-1 ">
        <Logo></Logo>
        <div className="flex md:flex-wrap justify-center items-center gap-2 md:gap-4 sm:gap-1 sm:col-span-2">
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
    <div className="w-full grid grid-cols-2 py-3 bg-white md:grid-cols-1 ">
      <Logo></Logo>
      <div className="flex md:flex-wrap justify-center items-center gap-2 md:gap-4 sm:gap-1 sm:col-span-2">
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
