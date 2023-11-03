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
    },
  });
  if (status === "unauthenticated") {
    return "<></>" && router.push("/login");
  }

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="h-screen bg-white flex flex-col min-h-fit">
      <NavBar handleLogout={handleLogout} />
      <div className="p-4 min-h-fit grid place-items-center bg-white">
        <div className="flex justify-center items-center flex-wrap gap-4 w-[70%] min-h-fit pt-10">
          <div className="h-[150px] w-[200px] shadow-xl bg-white rounded-md"></div>
          <div className="h-[150px] w-[200px] shadow-xl bg-white rounded-md"></div>
          <div className="h-[150px] w-[200px] shadow-xl bg-white rounded-md"></div>
          <div className="h-[150px] w-[200px] shadow-xl bg-white rounded-md"></div>
          <div className="h-[150px] w-[200px] shadow-xl bg-white rounded-md"></div>
          <div className="h-[150px] w-[200px] shadow-xl bg-white rounded-md"></div>
          <div className="h-[150px] w-[200px] shadow-xl bg-white rounded-md"></div>
          <div className="h-[150px] w-[200px] shadow-xl bg-white rounded-md"></div>
          <div className="h-[150px] w-[200px] shadow-xl bg-white rounded-md"></div>
          <div className="h-[150px] w-[200px] shadow-xl bg-white rounded-md"></div>
          <div className="h-[150px] w-[200px] shadow-xl bg-white rounded-md"></div>
          <div className="h-[150px] w-[200px] shadow-xl bg-white rounded-md"></div>
          <div className="h-[150px] w-[200px] shadow-xl bg-white rounded-md"></div>
          <div className="h-[150px] w-[200px] shadow-xl bg-white rounded-md"></div>
          <div className="h-[150px] w-[200px] shadow-xl bg-white rounded-md"></div>
          <div className="h-[150px] w-[200px] shadow-xl bg-white rounded-md"></div>
          <div className="h-[150px] w-[200px] shadow-xl bg-white rounded-md"></div>
          <div className="h-[150px] w-[200px] shadow-xl bg-white rounded-md"></div>
          <div className="h-[150px] w-[200px] shadow-xl bg-white rounded-md"></div>
          <div className="h-[150px] w-[200px] shadow-xl bg-white rounded-md"></div>
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
    if (refIndex !== -1) {
      refList.forEach((ref, idx) => {
        refIndex !== idx && ref.current.classList.remove("bg-gray-300");
      });
    }
    !reference.current.classList.contains("bg-gray-300") &&
      reference.current.classList.add("bg-gray-300");
  };
  return (
    <div className="w-full grid grid-rows-2 bg-white h-[30%] sticky top-0">
      <div className="grid grid-cols-4 p-4 shadow-2xl">
        <div className="text-black font-modak text-[30px]">
          <Link href={"/"}>Logo</Link>
        </div>
        <span className="text-black grid place-items-center">
          welcome, Mr.Bryan
        </span>
        <div className="relative flex items-center gap-1 p-2">
          <img
            src="/icons/search.png"
            alt="search icon"
            width={30}
            height={30}
          />
          <input
            type="text"
            placeholder="Type to search"
            className="pl-7 flex-grow ml-3 placeholder:text-black placeholder:font-normal"
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
            <span>basket</span>
          </div>
          <div
            className="tile relative z-10 flex justify-around items-center gap-3"
            onClick={handleMenuclick}
          >
            <img
              src="/icons/account.png"
              width={20}
              height={20}
              alt="account icon"
              className="ml-2 "
            />
            <span>Account</span>
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
                onClick={handleLogout}
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
      <div className="bg-primary flex justify-center items-center gap-1">
        <div className="tile" ref={home} onClick={() => handleOnclick(home)}>
          home
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
          Recipes collections
        </div>
        <div
          className="tile"
          ref={foodRecommendation}
          onClick={() => handleOnclick(foodRecommendation)}
        >
          Food Recommendations
        </div>
        <div
          className="tile"
          ref={foodCollection}
          onClick={() => handleOnclick(foodCollection)}
        >
          Food collections
        </div>
      </div>
    </div>
  );
}
