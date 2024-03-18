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

const FoodAndWaterLog = () => {
  return (
    <Tabs defaultValue="account" className="h-full w-[400px]">
      <TabsList className="grid w-full grid-cols-2 mb-4 h-auto">
        <TabsTrigger value="account">Food Log</TabsTrigger>
        <TabsTrigger value="password">Water Log</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="">
        <div className="min-h-full">
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
              className="bg-primary rounded-full p-3"
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
      <TabsContent value="password">
        <div className="min-h-full">
          <div className="flex justify-start rounded-md items-center gap-3 p-3 shadow-md">
            <Image
              src="/icons/add.png"
              alt="add symbol"
              className="bg-primary rounded-full p-3"
              width={40}
              height={40}
            />
            <div htmlFor="name">Quantity of water</div>
          </div>
          <div className="flex justify-start rounded-md items-center gap-3 p-3 shadow-md">
            <Image
              src="/icons/add.png"
              alt="add symbol"
              className="bg-primary rounded-full p-3"
              width={40}
              height={40}
            />
            <div htmlFor="name">Time of consumption</div>
          </div>
          <div className="flex justify-start rounded-md items-center gap-3 p-3 shadow-md">
            <Image
              src="/icons/add.png"
              alt="add symbol"
              className="bg-primary rounded-full p-3"
              width={40}
              height={40}
            />
            <div htmlFor="name">Type of water</div>
          </div>
          <div className="flex justify-start rounded-md items-center gap-3 p-3 shadow-md">
            <Image
              src="/icons/add.png"
              alt="add symbol"
              className="bg-primary rounded-full p-3"
              width={40}
              height={40}
            />
            <div htmlFor="name">Additional information</div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default FoodAndWaterLog;
