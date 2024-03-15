import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const FoodAndWaterLog = () => {
  /* This changes the colour + value of what tab is currently selected based on the press. */
  const [ColorLogToggle, setColorLogToggle] = useState("food");
  return (
    <Tabs defaultValue="food" className="min-h-[200px]" value={ColorLogToggle}>
      <TabsList className="flex flex-row w-full place-content-evenly mb-4 h-auto bg-primarylight rounded-md p-2 shadow-inner shadow-primary/75 bg-blend-multiply">
        <TabsTrigger
          value="food"
          className={
            ColorLogToggle === "food"
              ? "bg-primary px-4 rounded-md shadow-inner shadow-black/10"
              : "px-4 rounded-md"
          }
          onClick={() => {
            setColorLogToggle("food");
          }}
        >
          Food Log
        </TabsTrigger>
        <span className="w-0.5 min-h-full bg-[#C2897C]"></span>
        <TabsTrigger
          value="water"
          className={
            ColorLogToggle === "water"
              ? "bg-primary px-4 rounded-md shadow-inner shadow-black/10"
              : "px-4 rounded-md"
          }
          onClick={() => {
            setColorLogToggle("water");
          }}
        >
          Water Log
        </TabsTrigger>
      </TabsList>
      <TabsContent value="food" className="">
        <div className="min-h-full grid grid-cols-2 grid-rows-2">
          <div className="flex justify-start rounded-md items-center gap-3 p-3 shadow-md">
            <Image
              src="/icons/add.png"
              alt="add symbol"
              className="bg-primary rounded-full p-3"
              width={40}
              height={40}
            />
            <div htmlFor="name">Breakfast</div>
          </div>
          <div className="flex justify-start rounded-md items-center gap-3 p-3 shadow-md">
            <Image
              src="/icons/add.png"
              alt="add symbol"
              className="bg-primary rounded-full p-3 hover:bg-primarylight"
              width={40}
              height={40}
            />
            <div htmlFor="name">Lunch</div>
          </div>
          <div className="flex justify-start rounded-md items-center gap-3 p-3 shadow-md">
            <Image
              src="/icons/add.png"
              alt="add symbol"
              className="bg-primary rounded-full p-3"
              width={40}
              height={40}
            />
            <div htmlFor="name">Dinner</div>
          </div>
          <div className="flex justify-start rounded-md items-center gap-3 p-3 shadow-md">
            <Image
              src="/icons/add.png"
              alt="add symbol"
              className="bg-primary rounded-full p-3"
              width={40}
              height={40}
            />
            <div htmlFor="name">Snack</div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="water">
        <div className="min-h-full">
          <button className="flex justify-start rounded-md items-center gap-3 p-3 shadow-md w-full">
            <Image
              src="/icons/add.png"
              alt="add symbol"
              className="bg-primary rounded-full p-3"
              width={40}
              height={40}
            />
            <div htmlFor="name">Water Amount</div>
          </button>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default FoodAndWaterLog;
