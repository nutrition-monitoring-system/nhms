"use client";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import useSWR from "swr";


function HomeUserData() {
  const { data: session, status } = useSession();

  // console.log(`User ID = ${session.user.name}`);

  const sendID = { id: session.user.name };
  /* Sends the ID of the user to backend. */

  const fetcher = (...args) =>
    fetch(
      ...args,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        
        },
        body: JSON.stringify(sendID),
      },
      {revalidateIfStale: false}
      
    ).then((res) => res.json());

  const { data, error } = useSWR("/api/userById", fetcher);
  /* Uses the SWR Next hook.  */

  if (error || !data) {
    return null;
  }
  console.log(data);

  return data;
}


export default function ProfileNavigation() {
  const menuItems = useRef(null);

  const handleMenuclick = () => {
    // This function handles the animation for the userMenu. It will animate base on the custom class added
    menuItems.current.classList.toggle("slide-down");
  };

  const { data: session, status } = useSession();

  let name = " ";
  let gender = " ";



  if (status == "authenticated"){
    let data = HomeUserData()

    
    if (data) {
      name = data.name + " " + data.surname;
      gender = data.gender;
    }

    return (
      <>
        <div
          onClick={handleMenuclick}
          id="usercontent"
          className="tile shadow-none hover:shadow-none relative z-10 flex justify-around items-center gap-3 select-none
    before:absolute before:top-[95%] before:h-1 before:w-full before:translate-x-[-100%] before:rounded-md before:hover:bg-gray-200 before:hover:translate-x-0 before:transition-all before:duration-300"
        >
          <Image
            src={gender === "F" ? "/icons/woman.png" : "/icons/man.png"}
            width={25}
            height={25}
            alt="Person icon"
            className="ml-2 rounded-[50px]"
          />
          <span className="shadow-none text-lg">{name}</span>
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
              <Link href={"/user"}>Profile</Link>
            </div>
            <div className="tile grid grid-cols-4">
              <Image
                src="/icons/settings.png"
                alt="Settings icon"
                width={20}
                height={20}
              />
              <Link href={"/user"}>Settings</Link>
            </div>
            <div className="tile grid grid-cols-4">
              <Image
                src="/icons/translate.png"
                alt="Language/translate icon"
                width={20}
                height={20}
              />
              <span>Languages</span>
            </div>
            <div
              id="Logout"
              className="tile grid grid-cols-4"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
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
      </>
    );
  }
  
}
