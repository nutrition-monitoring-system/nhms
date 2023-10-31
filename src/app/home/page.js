import Link from "next/link";
import Button from "../../components/Button.jsx";
import Image from "next/image";
export const metadata = {
  title: "Home",
  description: "Home Page",
};

export default function Home() {
  return (
    <div className="h-screen bg-white flex flex-col">
      <NavBar />
      <div className="grid grid-rows-3 grid-cols-1 w-full h-[85%]">
        <div className="bg-orange-50 flex justify-left items-center gap-4 px-3">
          <div className="h-3/4 w-[150px] shadow-xl bg-white rounded-md"></div>
          <div className="h-3/4 w-[150px] shadow-xl bg-white rounded-md"></div>
          <div className="h-3/4 w-[150px] shadow-xl bg-white rounded-md"></div>
          <div className="h-3/4 w-[150px] shadow-xl bg-white rounded-md"></div>
          <div className="h-3/4 w-[150px] shadow-xl bg-white rounded-md"></div>
          <div className="h-3/4 w-[150px] shadow-xl bg-white rounded-md"></div>
        </div>
        <div className="flex justify-left items-center gap-4 px-3">
          <div className="h-3/4 w-[150px] shadow-xl bg-white rounded-md"></div>
          <div className="h-3/4 w-[150px] shadow-xl bg-white rounded-md"></div>
          <div className="h-3/4 w-[150px] shadow-xl bg-white rounded-md"></div>
          <div className="h-3/4 w-[150px] shadow-xl bg-white rounded-md"></div>
          <div className="h-3/4 w-[150px] shadow-xl bg-white rounded-md"></div>
          <div className="h-3/4 w-[150px] shadow-xl bg-white rounded-md"></div>
        </div>
        <div className="bg-orange-50 flex justify-left items-center gap-4 px-3">
          <div className="h-3/4 w-[150px] shadow-xl bg-white rounded-md"></div>
          <div className="h-3/4 w-[150px] shadow-xl bg-white rounded-md"></div>
          <div className="h-3/4 w-[150px] shadow-xl bg-white rounded-md"></div>
          <div className="h-3/4 w-[150px] shadow-xl bg-white rounded-md"></div>
          <div className="h-3/4 w-[150px] shadow-xl bg-white rounded-md"></div>
          <div className="h-3/4 w-[150px] shadow-xl bg-white rounded-md"></div>
        </div>
      </div>
    </div>
  );
}

function NavBar() {
  return (
    <div className="w-full grid grid-cols-4 py-2 bg-white  h-[15%]">
      <div className="grid place-items-center text-black font-modak text-[30px]">
        <Link href={"/"}>Logo</Link>
      </div>
      <span className="text-black grid place-items-center">
        welcome, firstName
      </span>
      <div className="relative flex items-center gap-1 p-2">
        <Image src="/icons/add.png" alt="add symbol" width={20} height={20} />
        <input
          type="text"
          placeholder="Type to search"
          className="pl-7 flex-grow"
        />
      </div>
      <div className="flex justify-center items-center gap-2">
        <Button href={"/login"}>basket</Button>
        <Button href={"/register"}>Account</Button>
      </div>
    </div>
  );
}
