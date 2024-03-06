"use client";
import Logo from "../../components/Logo";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Recipes from "../../components/Recipes.jsx";
import Loading from "../../components/Loading";
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

function Home() {
  const [recipesList, setRecipeList] = useState([]);
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

  useEffect(() => {
    (function RequestRecipes() {
      fetch("/api/getRecipes")
        .then((response) => response.json())
        .then((data) => setRecipeList([...data.Breakfast]));
    })();
  }, []);

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div className="h-screen bg-white flex flex-col min-h-fit">
      <NavBar handleLogout={handleLogout} recipesList={recipesList} />
      <div className="p-4 min-h-fit grid place-items-center bg-white">
        <Recipes recipesList={recipesList} />
      </div>
    </div>
  );
}

function NavBar({ recipesList }) {
  const menuItems = useRef(null);
  const handleMenuclick = () => {
    menuItems.current.classList.toggle("slide-down");
  };
  const home = useRef(null);
  const recipes = useRef(null);
  const recipesCollections = useRef(null);
  const foodCollection = useRef(null);
  const foodRecommendation = useRef(null);
  const [searchInformation, setSearchInformation] = useState("");

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
  const modalRef = useRef(null);

  const handlePopUP = (e) => {
    e.preventDefault();
    modalRef.current.showModal();
    // this is a timer for forgot password verification.
  };
  const handleClose = (e) => {
    e.preventDefault();
    modalRef.current.close();
  };
  useEffect(() => {
    modalRef.current.close();
  }, []);
  return (
    <>
      <dialog
        ref={modalRef}
        className="w-[50%] h-[80%] backdrop-blur-3xl focus:outline-none rounded-md "
      >
        <div className="w-full h-full p-3 grid grid-rows-4">
          <div className="flex justify-around items-center flex-col">
            <div className="w-full flex justify-around items-center ">
              <h1 className="text-center font-black text-[1.5rem]">
                Search Recipes
              </h1>
              <button className="tile bg-primary" onClick={handleClose}>
                <Image
                  src="/icons/add.png"
                  width={20}
                  height={20}
                  alt="plus icon"
                  className="rotate-45"
                />
                <span>close</span>
              </button>
            </div>
            <div className="w-full flex justify-around items-center gap-3 p-2 rounded-md">
              <Image
                src="/icons/search.png"
                width={20}
                height={20}
                alt="Search icon"
              />
              <input
                type="text"
                placeholder="Search recipes..."
                className="outline-black border-black"
                onChange={(e) => setSearchInformation(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center gap-2 items-center flex-wrap py-5 rounded-md">
            {Object.keys(recipesList[0]).map((key, idx) => {
              return (
                <div key={idx} className="">
                  <select className="tile bg-primary border-none ">
                    <option
                      value={key.charAt(0).toUpperCase() + key.substring(1)}
                    >
                      {key.charAt(0).toUpperCase() + key.substring(1)}
                    </option>
                  </select>
                </div>
              );
            })}
          </div>
          <div className="bg-white row-span-4 flex flex-col justify-center items-center gap-1 overflow-y-scroll">
            {recipesList
              ?.filter((item) =>
                item.name
                  .toLowerCase()
                  .includes(searchInformation.toLowerCase())
              )
              .map((item, idx) => (
                <div
                  key={idx}
                  className="text-left bg-white shadow-lg hover:bg-gray-200 w-full p-3 rounded-md flex justify-between items-center"
                >
                  <div>{item.name}</div>
                  <Image
                    src="/icons/info.png"
                    width={20}
                    height={20}
                    alt="Information icon"
                  />
                </div>
              ))}
          </div>
        </div>
      </dialog>
      <div className="w-full grid grid-rows-2 h-[30%] sm:h-fit sticky top-0 sm:relative sm:grid-rows-3">
        <div className="grid grid-cols-3 p-4 shadow-2xl md:grid-cols-1 md:grid-rows-4 sm:place-items-center sm:row-span-2">
          <Logo></Logo>
          <div className="flex justify-center items-center col-span-2">
            <ProfileNavigation search={true} onClick={handlePopUP} />
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
            ref={recipesCollections}
            onClick={() => handleOnclick(recipesCollections)}
          >
            Search
          </div>
        </div>
      </div>
    </>
  );
}
