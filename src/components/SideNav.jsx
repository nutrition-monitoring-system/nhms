import Logo from "./Logo";
import { FaBlog, FaPencilAlt } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import Link from "next/link";

export default function SideNavBar() {
  return (
    <div className="w-[20%] md:w-full sidebar h-screen md:h-fit sticky top-0 md:relative ">
      <div className="bg-black p-5 flex flex-col justify-start items-center gap-4 w-full h-full">
        <Logo logoName="Navigation"></Logo>
        <Link
          href="/blog"
          className="tile w-full text-lg p-5 flex justify-start gap-5 items-center"
        >
          {" "}
          <FaBlog className="size-6" />
          Blogs
        </Link>
        <Link
          href="#section2"
          className="tile w-full text-lg p-5 flex justify-start gap-5 items-center"
        >
          {" "}
          <FaPencilAlt className="size-6" />
          Plan
        </Link>
        <Link
          href="#section1"
          className="tile w-full text-lg p-5 flex justify-start gap-5 items-center"
        >
          <MdSettings className="size-6" />
          Settings
        </Link>
      </div>
    </div>
  );
}
