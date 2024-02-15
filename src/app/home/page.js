"use client";
import Logo from "../../components/Logo";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Recipes from "../../components/Recipes.jsx";
import Loading from "../../components/Loading";
import useSWR from "swr";
import ProfileNavigation from "@/components/ProfileNavigation";

export default function Page() {
  return (
    <>
      <SessionProvider>
        <Home></Home>
      </SessionProvider>
    </>
  );
}

function HomeUserData() {
  const { data: session, status } = useSession();

  // console.log(`User ID = ${session.user.name}`);

  const sendID = { id: session.user.name };
  /* Sends the ID of the user to backend. */

  const fetcher = (...args) =>
    fetch(
      ...args,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        
        },
        body: JSON.stringify(sendID),
      },
      {revalidateIfStale: false}
      
    ).then((res) => res.json());

  const { data, error } = useSWR("/api/userById", fetcher);
  /* Uses the SWR Next hook.  */

  if (error || !data) {
    return null;
  }
  console.log(data);

  return data;
}

function Home() {
  //initialise the router for conditional redirection
  const router = useRouter();
  // initialise the session.
  //
  const { session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      return router.push("/login");
    },
  });
  /* console.log(session); */
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  if (status === "loading") {
    return <Loading />;
  }
  return (
    <div className="h-screen bg-white flex flex-col min-h-fit">
      <NavBar handleLogout={handleLogout} />
      <div className="p-4 min-h-fit grid place-items-center bg-white">
        <Recipes />
      </div>
    </div>
  );
}

function NavBar({ data }) {
  const menuItems = useRef(null);
  const handleMenuclick = () => {
    menuItems.current.classList.toggle("slide-down");
  };
  const home = useRef(null);
  const recipes = useRef(null);
  const recipesCollections = useRef(null);
  const foodCollection = useRef(null);
  const foodRecommendation = useRef(null);

  let userSurname = "Smith",
    userGender = "F";

  data = HomeUserData();

  if (data) {
    userSurname = data.surname;
    userGender = data.gender;
  }

  const refList = [
    home,
    recipes,
    recipesCollections,
    foodCollection,
    foodRecommendation,
  ];

  const handleOnclick = (reference) => {
    const refIndex = refList.findIndex((refValue) => refValue === reference);
    const classes = ["bg-black", "text-white"];
    if (refIndex !== -1) {
      refList.forEach((ref, idx) => {
        refIndex !== idx &&
          classes.forEach((className) =>
            ref.current.classList.remove(className)
          );
      });
    }
    classes.forEach((className) => {
      !reference.current.classList.contains(className) &&
        reference.current.classList.add(className);
    });
  };
  return (
    <div className="w-full grid grid-rows-2 bg-white h-[30%] sm:h-fit sticky top-0 sm:relative sm:grid-rows-3">
      <div className="grid grid-cols-3 p-4 shadow-2xl md:grid-cols-1 md:grid-rows-4 sm:place-items-center sm:row-span-2">
        <Logo></Logo>
        <div className="flex justify-center items-center col-span-2 gap-4">
          <div className="tile shadow-none hover:shadow-none text-lg">
            <Image
              src="/icons/search.png"
              width={25}
              height={25}
              alt="Search icon"
            />
            <span>Search</span>
          </div>
          <div className="tile shadow-none hover:shadow-none text-lg">
            <Image
              src="/icons/shopping.png"
              width={25}
              height={25}
              alt="shopping icon"
            />
            <span>Basket</span>
          </div>
          <ProfileNavigation name={"John, Doe"} gender={"M"} />
        </div>
      </div>
      <div className="bg-primary flex justify-center items-center gap-1 sm:overflow-hidden sm:flex-wrap sm:p-5">
        <div
          className="tile bg-black text-white"
          ref={home}
          onClick={() => handleOnclick(home)}
        >
          Home
        </div>
        <div
          className="tile"
          ref={recipes}
          onClick={() => handleOnclick(recipes)}
        >
          Recipes
        </div>
        <div
          className="tile"
          ref={recipesCollections}
          onClick={() => handleOnclick(recipesCollections)}
        >
          Collections
        </div>
        <div
          className="tile"
          ref={foodRecommendation}
          onClick={() => handleOnclick(foodRecommendation)}
        >
          Food Recommendations
        </div>
        {/* I want to suggest maybe getting rid of food collections? It isn't clear what it is. - Harry */}
        <div
          className="tile"
          ref={foodCollection}
          onClick={() => handleOnclick(foodCollection)}
        >
          Food Collections
        </div>
      </div>
    </div>
  );
}
