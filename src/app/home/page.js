"use client";
import Logo from "../../components/Logo";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Recipes from "../../components/Recipes.jsx";
import Loading from "../../components/Loading";
import ProfileNavigation from "@/components/ProfileNavigation";
import PopModal from "@/components/PopUp";

export default function Page() {
  // Using the Session Provider Api we wrap the home page so we have access to session data
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
    // fetch the recipes from the apis
    (function RequestRecipes() {
      fetch("/api/getRecipes")
        .then((response) => response.json())
        .then((data) => setRecipeList([...data.Breakfast]));
    })();
  }, []);

  // if user is authenticated then render the admin page else render the loading component
  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <NavBar
        handleLogout={handleLogout}
        recipesList={recipesList}
        setCurrentSectionName={setCurrentSectionName}
        searchInformation={searchInformation}
        setSearchInformation={setSearchInformation}
      />
      <div className="grid bg-white h-fit place-items-center">
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
  // The navigation bar found in the home Page has buttons
  // home, recipes, recipesCollections
  // home button displays all the content on the page including food information, and not just recipes
  // The collections button lets the user view all the recipes that has been added into a collection

  // useRef is used to create a direct reference on almost any html element when it after it has mounted(been rendered on the screen)
  const home = useRef(null);
  const recipes = useRef(null);
  const recipesCollections = useRef(null);
  const [showModal, setShowModal] = useState(false);
  // The refList is used to store all the references of the html elements
  const refList = [home, recipes, recipesCollections];

  const handleOnclick = (reference) => {
    // This function is used to change the background color of the navigation bar when the user clicks on the button
    // It just toggles the color of every button that is not active to white the black for the one that is active

    // referenceIndex holds the index of the btn that is clicked
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
  // the inputRef handles changes from the search input
  const inputRef = useRef(null);
  const handleSearch = () => {
    const searchValue = inputRef.current.value;
    // using useState() we can dynamically change the state of the search input
    setSearchInformation(searchValue);
  };

  const points = 20;
  return (
    <>
      <PopModal showModal={showModal} setShowModal={setShowModal}>
        <div className="grid w-full grid-cols-2 place-items-center">
          <h1 className="grid text-lg font-bold place-items-center">
            Redeem Earned Points
          </h1>
          <div>Current Points - {points}</div>
        </div>
        <h1 className="grid font-bold text-md place-items-center">
          Available services
        </h1>
        <div className="grid grid-rows-3 gap-2 mt-2">
          <button className="w-full p-5 tile bg-primary">
            Book a free 20 minutes appointment with Dr. Monika
          </button>
          <button className="w-full p-5 tile bg-primary">
            Book a free 1 hour appointment with Dr. Monika
          </button>
          <button className="w-full p-5 tile bg-primary">
            Get a premium recipe for free appointment with Dr. Monika
          </button>
        </div>
      </PopModal>
      <div className="z-10 bg-white w-full grid grid-rows-2 h-[30%] sm:h-fit sticky top-0 sm:relative sm:grid-rows-3">
        <div className="grid grid-cols-3 p-4 md:grid-cols-1 md:grid-rows-4 sm:place-items-center sm:row-span-2">
          <Logo></Logo>
          <div className="flex flex-wrap items-center justify-center col-span-2 gap-2 md:gap-3">
            <div className="flex flex-col items-center justify-center h-full rounded-lg">
              <span className="font-black text-[0.9rem]">{20}</span>
              <span className="">Points</span>
            </div>
            <div className="mx-4">
              <Link href="/blog">Blog</Link>
            </div>
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
          <div
            className="text-white bg-gray-900 border-none tile"
            onClick={() => setShowModal(true)}
          >
            Redeem Points
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
