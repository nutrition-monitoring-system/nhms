"use client";
import Logo from "../../components/Logo";
import Link from "next/link";
import Image from "next/image"
import { useRef } from "react";
import { SessionProvider } from "next-auth/react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Recipes from "../../components/Recipes.jsx";
import Loading from "../../components/Loading";

export default function Page() {
  return (
    <>
      <SessionProvider>
        <Home></Home>
      </SessionProvider>
    </>
  );
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
      <NavBar handleLogout={handleLogout} data={session} />
      <div className="p-4 min-h-fit grid place-items-center bg-white">
        <Recipes />
      </div>
    </div>
  );
}

function NavBar({ handleLogout, data }) {
  const menuItems = useRef(null);
  const handleMenuclick = () => {
    menuItems.current.classList.toggle("slide-down");
  };
  const home = useRef(null);
  const recipes = useRef(null);
  const recipesCollections = useRef(null);
  const foodCollection = useRef(null);
  const foodRecommendation = useRef(null);

  let userSurname = "Kelly",
    userId = "userfgdf13s",
    userGender = "F";
  if (data) {
    userSurname = data.surname;
    userId = data.id;
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
        <div className="relative flex items-center gap-1 p-2">
          <Image
            src="/icons/search.png"
            className="mr-3"
            alt="search icon"
            width={20}
            height={20}
          />
          <input
            id="search"
            type="text"
            placeholder="Type to search "
            className="flex-grow py-2 placeholder:text-white text-white placeholder:font-normal bg-black"
            autoFocus
          />
        </div>
        <div className="flex justify-center items-center gap-2">
          <div className="tile flex justify-around items-center">
            <Image
              src="/icons/shopping.png"
              width={25}
              height={25}
              alt="shopping icon"
              className="ml-2"
            />
            <span>Basket</span>
          </div>
          <div className="tile relative z-10 flex justify-around items-center gap-3">
            <Image
              src={userGender === "M" ? "/icons/man.png" : "/icons/woman.png"}
              width={25}
              height={25}
              alt="Person icon"
              className="ml-2 rounded-[50px] bg-primary"
              onClick={handleMenuclick}
            />
            <span id="usercontent" onClick={handleMenuclick}>
              <>{userGender == "M" ? "Mr." : userGender == "F" ? "Ms." : ""}</>
              {userSurname ? userSurname : "current user"}
            </span>
            <div
              ref={menuItems}
              className="absolute top-[-6rem] opacity-0 left-0 right-0 rounded-md
             shadow-2xl p-2 grid grid-rows-3 gap-1 translate-y-[-100] pointer-events-none"
            >
              <div className="tile grid grid-cols-4">
                {" "}
                <Image
                  src="/icons/account.png"
                  alt="Settings icon"
                  width={20}
                  height={20}
                />
                <Link href={`/user/${userId}`}>Profile</Link>
              </div>
              <div className="tile grid grid-cols-4">
                {" "}
                <Image
                  src="/icons/settings.png"
                  alt="Settings icon"
                  width={20}
                  height={20}
                />
                <Link href={"/user/userd9f49w"}>Settings</Link>
              </div>
              <div className="tile grid grid-cols-4">
                {" "}
                <Image
                  src="/icons/translate.png"
                  alt="Language/translate icon"
                  width={20}
                  height={20}
                />
                <span>Languages</span>
              </div>
              <div className="tile grid grid-cols-4" onClick={handleLogout}>
                {" "}
                <Image
                  src="/icons/logout.png"
                  alt="Logout icon"
                  width={20}
                  height={20}
                />
                <span id="Logout">Logout</span>
              </div>
            </div>
          </div>
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
