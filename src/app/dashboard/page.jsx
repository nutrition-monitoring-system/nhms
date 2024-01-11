import Link from "next/link";
export default function Page() {
  return (
    <div className="absolute inset-0 grid grid-cols-4 p-3 gap-2">
      <NavBar />
      <MainPage />
    </div>
  );
}

const NavBar = () => (
  <div className="bg-black text-white rounded-lg grid grid-rows-2">
    <div className="grid place-items-center">
      <div className="font-opensans font-black text-[2rem]">Logo</div>
      <button className="tile text-xl">
        <img src="/icons/add.png" alt="add icon" width={20} height={20} />
        <div>New Blog</div>
      </button>
      <button className="tile text-xl">
        <img src="/icons/add.png" alt="add icon" width={20} height={20} />
        <div>New Article</div>
      </button>
      <button className="tile text-xl">
        <img
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
        <img src="/icons/logout.png" alt="Logout icon" width={20} height={20} />
        <div>Logout</div>
      </button>
    </div>
  </div>
);
const MainPage = () => (
  <div className="col-span-3 rounded-lg p-2 flex flex-col justify-center items-center gap-2">
    <div className="w-full grid grid-cols-2 py-2 bg-white sm:grid-cols-3 rounded-md px-4 shadow-lg">
      <div className="grid place-items-center text-black font-extrabold font-opensans text-[30px]">
        Dashboard
      </div>
      <div className="flex justify-center items-center gap-2 sm:gap-1 sm:col-span-2">
        <div className="relative flex items-center gap-4 p-2">
          <img
            src="/icons/search.png"
            alt="add symbol"
            width={20}
            height={20}
          />
          <input
            type="text"
            placeholder="type in to search"
            className="pl-7 flex-grow font-normal bg-black !text-white"
          />
        </div>
        <div className="tile relative z-10 flex justify-around items-center gap-3">
          <img
            src="/icons/man.png"
            width={25}
            height={25}
            alt="Person icon"
            className="ml-2 rounded-[50px] border-1 border-black"
          />
          <span>Mr. Bryan</span>
        </div>
      </div>
    </div>
    <div className="bg-white h-full w-full grid grid-cols-3 rounded-md">
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </div>
  </div>
);
