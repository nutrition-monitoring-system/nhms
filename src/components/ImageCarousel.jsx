import { Carousel } from "flowbite-react";
import Image from "next/image";
import { MdBrokenImage } from "react-icons/md";

function CarouselElement({ date, image }) {
  if (image == null || date == null) {
    return (
      <div className="flex h-full p-2 bg-primary text-black flex-col place-items-center">
        <MdBrokenImage className="size-10" />
        {/* <Image
          src={"/photos/image.png"}
          alt="Carousel broken image"
          className="p-2 object-scale-down"
          width={200} height={200}
        ></Image> */}
        <div className="w-full h-[40%]"></div>
        <div className="p-1 justify-self-end">Placeholder Image</div>
      </div>
    );
  }
  return (
    <div className="flex h-full items-center justify-center bg-primary text-black">
      <Image src={image} alt="Carousel Image"></Image>
      <div>{date}</div>
    </div>
  );
}

export default function ImageCarousel() {
  return (
    <div className="w-[50%] min-w-[500px] h-[70%] max-h-[90%] place-self-center text-black">
      <Carousel slide={false}>
        <CarouselElement></CarouselElement>
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
