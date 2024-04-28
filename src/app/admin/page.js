"use client";
import Image from "next/image";
import Logo from "../../components/Logo";
import ProfileNavigation from "../../components/ProfileNavigation";
import { SessionProvider } from "next-auth/react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import SideNavBar from "@/components/SideNav";
import { UpdateAllthemesStoredOnDevice } from "../../utils/otherUtils";
export default function Page() {
  UpdateAllthemesStoredOnDevice();
  return (
    <SessionProvider>
      <Home />
    </SessionProvider>
  );
}
function Home() {
  // useRouter hook is use to navigate programmatically to different routes
  const router = useRouter();
  // checking if user is authenticated or not
  const { session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      return router.push("/login");
    },
  });
  // if user is authenticated then render the admin page else render the loading component
  if (status == "authenticated") {
    return (
      <>
        <div className="sm:grid hidden absolute inset-0 bg-white p-2 text-lg text-center z-[1000] place-items-center">
          The admin page is not accessibility on smaller devices at the moment
        </div>
        <div className="flex w-screen h-screen md:flex-col md:hidden">
          <SideNavBar />
          <MainPage />
        </div>
      </>
    );
  }
  return <Loading></Loading>;
}

const MainPageNavBar = () => {
  return (
    <div className="grid w-full grid-cols-2 px-3 py-2 md:grid-cols-1">
      <div className="grid place-items-center text-black font-extrabold font-opensans text-[30px]">
        Admin Dashboard
      </div>
      <div className="flex items-center justify-center gap-2 sm:gap-1 sm:col-span-2">
        <ProfileNavigation />
      </div>
    </div>
  );
};

const MainPage = () => (
  <div className="flex flex-col items-center justify-center w-screen col-span-3 gap-1 p-2">
    <MainPageNavBar></MainPageNavBar>
    <div className="grid w-full h-full grid-cols-3 gap-2 p-3 overflow-hidden bg-white rounded-lg md:grid-cols-1 md:grid-rows-3">
      <div className="grid grid-rows-6 gap-3 p-4 place-content-center">
        <button className="text-lg tile">
          <Image src="/icons/add.png" alt="add icon" width={20} height={20} />
          <div>Manage Frontend</div>
        </button>
        <button className="text-lg tile">
          <Image src="/icons/add.png" alt="add icon" width={20} height={20} />
          <div>Frontend Customisation</div>
        </button>
        <button className="text-lg tile">
          <Image src="/icons/add.png" alt="add icon" width={20} height={20} />
          <div>Manage Mobile app</div>
        </button>
        <button className="text-lg tile">
          <Image src="/icons/add.png" alt="add icon" width={20} height={20} />
          <div>System Diagnostics</div>
        </button>
        <button className="text-lg tile">
          <Image src="/icons/add.png" alt="add icon" width={20} height={20} />
          <div>Permissions Access</div>
        </button>
      </div>
      <div className="grid grid-cols-2 grid-rows-3 gap-1 p-2 bg-white">
        <div className="flex flex-col items-center justify-center text-lg text-black bg-white rounded-md shadow-md">
          <h4 className="text-[1.4rem] font-bold">2.5k</h4>
          <span className="text-center">
            accounts <br></br> created
          </span>
        </div>
        <div className="flex flex-col items-center justify-center text-lg text-black bg-white rounded-md shadow-md">
          <h4 className="text-[1.4rem] font-bold">376</h4>
          <span className="text-center">Visited today</span>
        </div>
        <div className="relative flex items-center justify-center col-span-2 p-2 bg-white rounded-md shadow-md">
          <h2 className="font-opensans font-black text-[1.5rem] text-black">
            Image graph here
          </h2>
        </div>
        <div className="grid col-span-2 py-2 bg-white rounded-md shadow-md place-items-center">
          <button className="text-lg tile">
            <Image src="/icons/add.png" alt="add icon" width={20} height={20} />
            <div>User Analytics</div>
          </button>
          <button className="text-lg tile">
            <Image src="/icons/add.png" alt="add icon" width={20} height={20} />
            <div>User Information</div>
          </button>
        </div>
      </div>
      <div className="grid grid-rows-6 gap-3 p-4 rounded-lg place-content-center">
        <button className="text-lg tile">
          <Image
            src="/icons/search.png"
            alt="add icon"
            width={20}
            height={20}
          />
          <div>Quick Search</div>
        </button>
        <button className="text-lg tile">
          <Image src="/icons/add.png" alt="add icon" width={20} height={20} />
          <div>Manage Blogs</div>
        </button>
        <button className="text-lg tile">
          <Image src="/icons/add.png" alt="add icon" width={20} height={20} />
          <div>Manage Articles</div>
        </button>
        <button className="text-lg tile">
          <Image src="/icons/add.png" alt="add icon" width={20} height={20} />
          <div>User Information</div>
        </button>
        <button className="text-lg tile">
          <Image src="/icons/add.png" alt="add icon" width={20} height={20} />
          <div>User Feedback</div>
        </button>
      </div>
    </div>
  </div>
);
