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
import { ref } from "yup";

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
  const [currentSectionName, setCurrentSectionName] = useState("Home");
  const [currentSectionList, setCurrentSectionList] = useState([]);
  const [searchInformation, setSearchInformation] = useState("");
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
    <div className="flex flex-col h-screen bg-white min-h-fit">
      <NavBar
        handleLogout={handleLogout}
        recipesList={recipesList}
        setCurrentSectionName={setCurrentSectionName}
        searchInformation={searchInformation}
        setSearchInformation={setSearchInformation}
      />
      <div className="grid p-4 bg-white min-h-fit place-items-center">
        <Recipes
          searchInformation={searchInformation}
          setSearchInformation={setSearchInformation}
          recipesList={recipesList}
          currentSectionName={currentSectionName}
          currentSectionList={currentSectionList}
          setCurrentSectionList={setCurrentSectionList}
        />
      </div>
    </div>
  );
}

function NavBar({
  recipesList,
  setCurrentSectionName,
  searchInformation,
  setSearchInformation,
}) {
  const home = useRef(null);
  const recipes = useRef(null);
  const recipesCollections = useRef(null);

  const refList = [home, recipes, recipesCollections];

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
    setCurrentSectionName(reference.current.innerText); // home, recipes, collections etc
  };
  const inputRef = useRef(null);
  const handleSearch = () => {
    const searchValue = inputRef.current.value;
    setSearchInformation(searchValue);
  };

  return (
    <>
      <div className="bg-white w-full grid grid-rows-2 h-[30%] sm:h-fit sticky top-0 sm:relative sm:grid-rows-3">
        <div className="grid grid-cols-3 p-4 shadow-2xl md:grid-cols-1 md:grid-rows-4 sm:place-items-center sm:row-span-2">
          <Logo></Logo>
          <div className="flex items-center justify-center col-span-2">
            <ProfileNavigation />
          </div>
        </div>
        <div className="flex items-center justify-center gap-1 bg-primary sm:overflow-hidden sm:flex-wrap sm:p-5">
          <div
            className="text-white bg-black border-none tile"
            ref={home}
            onClick={() => handleOnclick(home)}
          >
            Home
          </div>
          <div
            className="border-none tile"
            ref={recipes}
            onClick={() => handleOnclick(recipes)}
          >
            Recipes
          </div>
          <div
            className="border-none tile"
            ref={recipesCollections}
            onClick={() => handleOnclick(recipesCollections)}
          >
            Collections
          </div>
          <div className="relative flex items-center gap-1 p-2">
            <Image
              src="/icons/add.png"
              alt="add symbol"
              width={20}
              height={20}
            />
            <input
              type="text conditions"
              placeholder="Type to search recipes..."
              className="flex-grow pl-7"
              onChange={handleSearch}
              ref={inputRef}
            />
          </div>
        </div>
      </div>
    </>
  );
}
