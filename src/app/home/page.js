"use client";
import Link from "next/link";
import { useRef } from "react";
import { SessionProvider } from "next-auth/react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
// export const metadata = {
//   title: "Home",
//   description: "Home Page",
// };

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
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      return router.push("/login");
    },
  });

  if (status === "loading") {
    return (
      <div className="grid place-items-center absolute inset-0 font-opensans text-[50px]">
        Loading....
      </div>
    );
  }

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="h-screen bg-white flex flex-col min-h-fit">
      <NavBar handleLogout={handleLogout} />
      <div className="p-4 min-h-fit grid place-items-center bg-white">
        <div className="flex justify-center items-center flex-wrap gap-4 w-[70%] min-h-fit pt-10 sm:w-full">
          <div className="h-[150px] sm:h-[250px] w-[200px] sm:w-[80%] shadow-xl bg-white rounded-md"></div>
          <div className="h-[150px] sm:h-[250px] w-[200px] sm:w-[80%] shadow-xl bg-white rounded-md"></div>
          <div className="h-[150px] sm:h-[250px] w-[200px] sm:w-[80%] shadow-xl bg-white rounded-md"></div>
          <div className="h-[150px] sm:h-[250px] w-[200px] sm:w-[80%] shadow-xl bg-white rounded-md"></div>
          <div className="h-[150px] sm:h-[250px] w-[200px] sm:w-[80%] shadow-xl bg-white rounded-md"></div>
          <div className="h-[150px] sm:h-[250px] w-[200px] sm:w-[80%] shadow-xl bg-white rounded-md"></div>
          <div className="h-[150px] sm:h-[250px] w-[200px] sm:w-[80%] shadow-xl bg-white rounded-md"></div>
          <div className="h-[150px] sm:h-[250px] w-[200px] sm:w-[80%] shadow-xl bg-white rounded-md"></div>
          <div className="h-[150px] sm:h-[250px] w-[200px] sm:w-[80%] shadow-xl bg-white rounded-md"></div>
          <div className="h-[150px] sm:h-[250px] w-[200px] sm:w-[80%] shadow-xl bg-white rounded-md"></div>
          <div className="h-[150px] sm:h-[250px] w-[200px] sm:w-[80%] shadow-xl bg-white rounded-md"></div>
          <div className="h-[150px] sm:h-[250px] w-[200px] sm:w-[80%] shadow-xl bg-white rounded-md"></div>
          <div className="h-[150px] sm:h-[250px] w-[200px] sm:w-[80%] shadow-xl bg-white rounded-md"></div>
          <div className="h-[150px] sm:h-[250px] w-[200px] sm:w-[80%] shadow-xl bg-white rounded-md"></div>
          <div className="h-[150px] sm:h-[250px] w-[200px] sm:w-[80%] shadow-xl bg-white rounded-md"></div>
          <div className="h-[150px] sm:h-[250px] w-[200px] sm:w-[80%] shadow-xl bg-white rounded-md"></div>
          <div className="h-[150px] sm:h-[250px] w-[200px] sm:w-[80%] shadow-xl bg-white rounded-md"></div>
          <div className="h-[150px] sm:h-[250px] w-[200px] sm:w-[80%] shadow-xl bg-white rounded-md"></div>
          <div className="h-[150px] sm:h-[250px] w-[200px] sm:w-[80%] shadow-xl bg-white rounded-md"></div>
          <div className="h-[150px] sm:h-[250px] w-[200px] sm:w-[80%] shadow-xl bg-white rounded-md"></div>
        </div>
      </div>
    </div>
  );
}

function NavBar({ handleLogout }) {
  const menuItems = useRef(null);
  const handleMenuclick = () => {
    menuItems.current.classList.toggle("slide-down");
  };
  const home = useRef(null);
  const recipes = useRef(null);
  const recipesCollections = useRef(null);
  const foodCollection = useRef(null);
  const foodRecommendation = useRef(null);

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
    <div className="w-full grid grid-rows-2 bg-white h-[30%] sm:h-fit sticky top-1 sm:relative sm:grid-rows-3">
      <div className="grid grid-cols-4 p-4 shadow-2xl md:grid-cols-1 md:grid-rows-4 sm:place-items-center sm:row-span-2">
        <div className="text-black font-modak text-[30px]">
          <Link href={"/"}>Logo</Link>
        </div>
        <span className="text-black grid place-items-center">
          Welcome, Mr.Bryan:{" "}
          {/* Test name, will be changed on user authentication. */}
        </span>
        <div className="relative flex items-center gap-1 p-2">
          <img
            src="/icons/search.png"
            className="mr-3"
            alt="search icon"
            width={20}
            height={20}
          />
          <input
            type="text"
            placeholder="Type to search "
            className="flex-grow py-2 placeholder:text-white text-white placeholder:font-normal bg-black"
            autoFocus
          />
        </div>
        <div className="flex justify-center items-center gap-2">
          <div className="tile flex justify-around items-center">
            <img
              src="/icons/shopping.png"
              width={20}
              height={20}
              alt="shopping icon"
              className="ml-2"
            />
            <span>Basket</span>
          </div>
          <div className="tile relative z-10 flex justify-around items-center gap-3">
            <img
              src="/icons/man.png"
              width={40}
              height={40}
              alt="Person icon"
              className="ml-2 p-1 rounded-[50px] bg-primarylight"
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
              <div className="tile grid grid-cols-4" onClick={handleLogout}>
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
