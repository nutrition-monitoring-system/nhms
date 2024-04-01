import Logo from "./Logo";
import { FaBlog, FaPencilAlt } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import Link from "next/link";

export default function SideNavBar() {
  return (
    <div className="w-[20%] md:w-full sidebar h-screen md:h-fit sticky top-0 md:relative ">
      <div className="flex flex-col items-center justify-start w-full h-full gap-4 p-5 bg-black">
        <Logo logoName="Navigation"></Logo>
        <Link
          href="/blog"
          className="flex items-center justify-start w-full gap-5 p-5 text-lg tile"
        >
          {" "}
          <FaBlog className="size-6" />
          Blogs
        </Link>
        <Link
          href="#section2"
          className="flex items-center justify-start w-full gap-5 p-5 text-lg tile"
        >
          {" "}
          <FaPencilAlt className="size-6" />
          Plan
        </Link>
        <Link
          href="#section1"
          className="flex items-center justify-start w-full gap-5 p-5 text-lg tile"
        >
          <MdSettings className="size-6" />
          Settings
        </Link>
      </div>
    </div>
  );
}
