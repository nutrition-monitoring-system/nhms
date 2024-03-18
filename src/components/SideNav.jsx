import { useState } from "react";
import Logo from "./Logo";
import { FaBlog, FaPencilAlt } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import Link from "next/link";

export default function SideNavBar() {
    
    return (
      <div className="w-[20%] lg:hidden sidebar h-screen sticky top-0">
  
        <div className="bg-black p-5 grid grid-cols-1 gap-2 w-full h-full">
          <Logo></Logo>
          <Link
            href="/blog"
            className="tile text-lg place-content-center text-center min-h-[30%] max-h-[50%] min-w-[20%] w-full"
          >
            {" "}
            <FaBlog className="size-6" />
            Blogs
          </Link>
          <Link
            href="#section2"
            className="tile text-lg md:text-xl place-content-center text-center min-h-[30%] max-h-[50%] min-w-[20%] w-full"
          >
            {" "}
            <FaPencilAlt className="size-6" />
            Plan
          </Link>
          <Link
            href="#section1"
            className="tile text-lg place-content-center text-center min-h-[30%] max-h-[50%] min-w-[20%] w-full"
          >
            <MdSettings className="size-6" />
            Settings
          </Link>
        </div>
      </div>
    );
  }
