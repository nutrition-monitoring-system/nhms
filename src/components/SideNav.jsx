import Logo from "./Logo";
import { FaBlog, FaPencilAlt } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";

export default function SideNavBar() {
  return (
    <div className="w-[20%] md:w-full sidebar md:h-fit md:relative md:p-1 mr-2 sticky top-1 p-2 bg-gray-900">
      <div className="sticky flex flex-col items-center justify-start w-full gap-4 p-5 bg-gray-900 top-1 md:rounded-lg">
        <Logo></Logo>
        <Link
          href="/blog"
          className="flex items-center justify-start w-full gap-4 p-5 text-lg tile"
        >
          {" "}
          <Image
            alt="B icon"
            src="/icons/bold.png"
            className=""
            width={20}
            height={20}
          ></Image>
          Blogs
        </Link>
        <Link
          href="#section2"
          className="flex items-center justify-start w-full gap-4 p-5 text-lg tile"
        >
          {" "}
          <Image
            src="/icons/add.png"
            width={20}
            height={20}
            alt="add icon"
          ></Image>
          Plan
        </Link>
        <Link
          href="#section1"
          className="flex items-center justify-start w-full gap-4 p-5 text-lg tile"
        >
          <MdSettings className="size-6" />
          Settings
        </Link>
      </div>
    </div>
  );
}
