"use client";
import { SessionProvider } from "next-auth/react";
import NavBar from "@/components/LogoNavigationBar";
import Image from "next/image";
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
      <div className="relative grid h-screen text-black bg-white min-h-fit place-items-center font-opensans">
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
            <div className="flex items-center justify-center py-1 min-h-auto sm:gap-3 gap-7 sm:flex-wrap">
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
                      src={iconUrl}
                      width={30}
                      height={30}
                      alt="decorative icons"
                    />
                  </div>
                );
              })}
            </div>
            <div className="grid w-full py-5 min-h-fit place-items-center">
              <Image
                className="h-30"
                src={"/icons/angle-double-small-down.png"}
                width={30}
                height={30}
                alt="Image icon without link."
              />
            </div>
          </div>
        </div>
      </div>
    </SessionProvider>
  );
}
