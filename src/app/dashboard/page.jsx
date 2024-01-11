import Link from "next/link";
export default function Page() {
  return (
    <div className="absolute inset-0 grid grid-cols-4 p-3 gap-1">
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
  <div className="col-span-3 rounded-lg p-2 flex flex-col justify-center items-center gap-1">
    <div className="w-full grid grid-cols-2 py-2 bg-white sm:grid-cols-3 rounded-md px-4">
      <div className="grid place-items-center text-black font-extrabold font-opensans text-[30px]">
        Dashboard
      </div>
      <div className="flex justify-center items-center gap-2 sm:gap-1 sm:col-span-2">
        <div className="tile relative z-10 flex justify-around items-center gap-3">
          <img
            src="/icons/woman.png"
            width={40}
            height={40}
            alt="Person icon"
            className="ml-2 rounded-[50px] border-2 p-1 border-sky-400"
          />
          <span>Dr. Monika</span>
        </div>
      </div>
    </div>
    <div className="bg-white h-full w-full grid grid-cols-3 rounded-md overflow-hidden">
      <div className="bg-sky-500 grid grid-rows-6 place-content-center gap-3 p-4">
        <button className="tile text-lg">
          <img src="/icons/add.png" alt="add icon" width={20} height={20} />
          <div>Manage Frontend</div>
        </button>
        <button className="tile text-lg">
          <img src="/icons/add.png" alt="add icon" width={20} height={20} />
          <div>Frontend Customisation</div>
        </button>
        <button className="tile text-lg">
          <img src="/icons/add.png" alt="add icon" width={20} height={20} />
          <div>Manage Mobile app</div>
        </button>
        <button className="tile text-lg">
          <img src="/icons/add.png" alt="add icon" width={20} height={20} />
          <div>System Diagnostics</div>
        </button>
        <button className="tile text-lg">
          <img src="/icons/add.png" alt="add icon" width={20} height={20} />
          <div>Permissions Access</div>
        </button>
      </div>
      <div className="bg-white grid grid-cols-2 grid-rows-3 gap-2 p-2">
        <div className="bg-black rounded-md text-white text-lg flex flex-col justify-center items-center">
          <h4 className="text-[1.4rem] font-bold">2.5k</h4>
          <span className="text-center">Accounts created</span>
        </div>
        <div className="bg-black rounded-md text-white text-lg flex flex-col justify-center items-center">
          <h4 className="text-[1.4rem] font-bold">376</h4>
          <span className="text-center">Visited today</span>
        </div>
        <div className="bg-black rounded-md col-span-2 relative flex justify-center items-center p-2">
          <h2 className="font-opensans font-black text-[1.5rem] text-white">
            Image graph here
          </h2>
        </div>
        <div className="bg-black rounded-md col-span-2 grid place-items-center">
          <button className="tile text-lg">
            <img src="/icons/add.png" alt="add icon" width={20} height={20} />
            <div>User Analytics</div>
          </button>
          <button className="tile text-lg">
            <img src="/icons/add.png" alt="add icon" width={20} height={20} />
            <div>User Feedback</div>
          </button>
        </div>
      </div>
      <div className="bg-blue-500 grid grid-rows-6 place-content-center gap-3 p-4">
        <button className="tile text-lg">
          <img src="/icons/add.png" alt="add icon" width={20} height={20} />
          <div>Search</div>
        </button>
        <button className="tile text-lg">
          <img src="/icons/add.png" alt="add icon" width={20} height={20} />
          <div>Manage Blogs</div>
        </button>
        <button className="tile text-lg">
          <img src="/icons/add.png" alt="add icon" width={20} height={20} />
          <div>Manage Articles</div>
        </button>
        <button className="tile text-lg">
          <img src="/icons/add.png" alt="add icon" width={20} height={20} />
          <div>User Information</div>
        </button>
        <button className="tile text-lg">
          <img src="/icons/add.png" alt="add icon" width={20} height={20} />
          <div>UserFeedback</div>
        </button>
      </div>
    </div>
  </div>
);
