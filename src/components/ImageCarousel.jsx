import { Carousel } from "flowbite-react";

export default function ImageCarousel() {
  return (
    <div className="w-[50%] min-w-[500px] h-[70%] max-h-[90%] place-self-center text-black">
      <Carousel slide={false}>
        <div className="flex h-full items-center justify-center bg-primary text-black">
          Slide 1
        </div>
        <div className="flex h-full items-center justify-center bg-primary text-black">
          Slide 2
        </div>
        <div className="flex h-full items-center justify-center bg-primary text-black">
          Slide 3
        </div>
      </Carousel>
    </div>
  );
}
