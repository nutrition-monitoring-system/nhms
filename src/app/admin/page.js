"use client";
import { useRef } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../components/Logo";
export default function Page() {
  return (
    <div className="w-screen h-screen flex">
      <NavBar />
      <MainPage />
    </div>
  );
}

const NavBar = () => (
  <div className="bg-black text-white grid grid-rows-2 w-[22%] xl:w-[18%]">
    <div className="grid place-items-center">
      <Logo />
      <button className="tile text-xl">
        <Image src="/icons/add.png" alt="add icon" width={20} height={20} />
        <div>New Blog</div>
      </button>
      <button className="tile text-xl">
        <Image src="/icons/add.png" alt="add icon" width={20} height={20} />
        <div>New Article</div>
      </button>
      <button className="tile text-xl">
        <Image
          src="/icons/settings.png"
          alt="Settings icon"
          width={20}
          height={20}
        />
        <div>Settings</div>
      </button>
    </div>
    <div className="grid place-items-center">
      <button className="tile text-lg">
        <Image
          src="/icons/logout.png"
          alt="Logout icon"
          width={20}
          height={20}
        />
        <div>Logout</div>
      </button>
    </div>
  </div>
);

const MainPageNavBar = () => {
  const menuItems = useRef(null);
  const handleMenuclick = () => {
    // This function handles the animation for the userMenu. It will animate base on the custom class added
    menuItems.current.classList.toggle("slide-down");
  };
  return (
    <div className="w-full grid grid-cols-2 py-2 sm:grid-cols-3 px-3">
      <div className="grid place-items-center text-black font-extrabold font-opensans text-[30px]">
        Admin Dashboard
      </div>
      <div className="flex justify-center items-center gap-2 sm:gap-1 sm:col-span-2">
        <div
          onClick={handleMenuclick}
          className="relative z-10 flex justify-around items-center gap-3 select-none
          before:absolute before:top-[95%] before:h-1 before:w-full before:translate-x-[-100%] before:rounded-md before:hover:bg-gray-200 before:hover:translate-x-0 before:transition-all before:duration-300"
        >
          <Image
            src="/icons/woman.png"
            width={25}
            height={25}
            alt="Person icon"
            className="ml-2 rounded-[50px]"
          />
          <span className="shadow-none text-lg">Monika, Gostic</span>
          <div
            ref={menuItems}
            className="absolute top-[-6rem] opacity-0 left-0 right-0 rounded-md
             shadow-2xl p-2 grid grid-rows-3 gap-1 z-[-10] translate-y-[-100] pointer-events-none"
          >
            <div className="tile grid grid-cols-4">
              <Image
                src="/icons/account.png"
                alt="Settings icon"
                width={20}
                height={20}
              />
              <Link href={"/user/userd9f49w"}>Profile</Link>
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
            <div
              className="tile grid grid-cols-4"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              {" "}
              <Image
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
  );
};

const MainPage = () => (
  <div className="col-span-3 p-2 flex flex-col justify-center items-center gap-1">
    <MainPageNavBar></MainPageNavBar>
    <div className="bg-white h-full w-full grid grid-cols-3 overflow-hidden p-3 gap-2 rounded-lg">
      <div className="grid grid-rows-6 place-content-center gap-3 p-4">
        <button className="tile text-lg">
          <Image src="/icons/add.png" alt="add icon" width={20} height={20} />
          <div>Manage Frontend</div>
        </button>
        <button className="tile text-lg">
          <Image src="/icons/add.png" alt="add icon" width={20} height={20} />
          <div>Frontend Customisation</div>
        </button>
        <button className="tile text-lg">
          <Image src="/icons/add.png" alt="add icon" width={20} height={20} />
          <div>Manage Mobile app</div>
        </button>
        <button className="tile text-lg">
          <Image src="/icons/add.png" alt="add icon" width={20} height={20} />
          <div>System Diagnostics</div>
        </button>
        <button className="tile text-lg">
          <Image src="/icons/add.png" alt="add icon" width={20} height={20} />
          <div>Permissions Access</div>
        </button>
      </div>
      <div className="bg-white grid grid-cols-2 grid-rows-3 gap-1 p-2">
        <div className="bg-white shadow-md rounded-md text-black text-lg flex flex-col justify-center items-center">
          <h4 className="text-[1.4rem] font-bold">2.5k</h4>
          <span className="text-center">Accounts created</span>
        </div>
        <div className="bg-white shadow-md rounded-md text-black text-lg flex flex-col justify-center items-center">
          <h4 className="text-[1.4rem] font-bold">376</h4>
          <span className="text-center">Visited today</span>
        </div>
        <div className="bg-white shadow-md rounded-md col-span-2 relative flex justify-center items-center p-2">
          <h2 className="font-opensans font-black text-[1.5rem] text-black">
            Image graph here
          </h2>
        </div>
        <div className="bg-white shadow-md rounded-md col-span-2 grid place-items-center py-2">
          <button className="tile text-lg">
            <Image src="/icons/add.png" alt="add icon" width={20} height={20} />
            <div>User Analytics</div>
          </button>
          <button className="tile text-lg">
            <Image src="/icons/add.png" alt="add icon" width={20} height={20} />
            <div>User Information</div>
          </button>
        </div>
      </div>
      <div className="rounded-lg grid grid-rows-6 place-content-center gap-3 p-4">
        <button className="tile text-lg">
          <Image
            src="/icons/search.png"
            alt="add icon"
            width={20}
            height={20}
          />
          <div>Quick Search</div>
        </button>
        <button className="tile text-lg">
          <Image src="/icons/add.png" alt="add icon" width={20} height={20} />
          <div>Manage Blogs</div>
        </button>
        <button className="tile text-lg">
          <Image src="/icons/add.png" alt="add icon" width={20} height={20} />
          <div>Manage Articles</div>
        </button>
        <button className="tile text-lg">
          <Image src="/icons/add.png" alt="add icon" width={20} height={20} />
          <div>User Information</div>
        </button>
        <button className="tile text-lg">
          <Image src="/icons/add.png" alt="add icon" width={20} height={20} />
          <div>User Feedback</div>
        </button>
      </div>
    </div>
  </div>
);
