"use client";
import { useState } from "react";
//import Image from 'next/image'
import Button from "../../components/Button.jsx";
import Accessibility from "../../components/Accessibility.jsx";
import {
  FormOne,
  FormTwo,
  FormThree,
  FormFour,
  FormFive,
} from "../../components/FormCards.jsx";

import { useRouter } from "next/navigation";

export default function Home() {
  const [index, setIndex] = useState(0);
  const router = useRouter();
  //const [formDone, setFormDone] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    if (index >= 5) {
      return;
    }
    setIndex((prevIndex) => prevIndex + 1);
  };

  const handleClickPrev = (e) => {
    e.preventDefault();
    if (index <= 0) {
      return;
    }
    setIndex((prevIndex) => prevIndex - 1);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/home");
  };

  return (
    <>
      <div className="bg-white absolute inset-0 grid grid-cols-4 text-black font-opensans min-h-screen h-fit">
        <div className="bg-primary flex flex-col justify-center items-center gap-4 pl-4 pr-2">
          <h1 className="font-extrabold text-[20px]">Welcome back!</h1>
          <p className="text-center">
            Sign in to unlock a world of nutrition opportunities!
          </p>
          <Button href={"/login"}>Sign In</Button>
        </div>
        <div className="col-span-3 text-black flex flex-col justify-center items-center gap-4">
          <h1 className="font-black text-[40px] font-modak text-center w-1/2 leading-10">
            Create A New Account
          </h1>
          <div className="w-[50%] min-h-fit relative overflow-x-hidden overflow-hidden">
            <form
              className="flex transition-transform duration-300 min-h-fit"
              style={{ transform: `translateX(${index * -100}%)` }}
            >
              <FormOne onClick={handleClick} />
              <FormTwo onClick={handleClick} onClickPrev={handleClickPrev} />
              <FormThree onClick={handleClick} onClickPrev={handleClickPrev} />
              <FormFour onClick={handleClick} onClickPrev={handleClickPrev} />
              <Accessibility
                onClick={handleClick}
                onClickPrev={handleClickPrev}
              />
              <FormFive
                onClickPrev={handleClickPrev}
                handleSubmit={handleSubmit}
              />
            </form>
          </div>
        </div>
      </div>
      ;
    </>
  );
}
