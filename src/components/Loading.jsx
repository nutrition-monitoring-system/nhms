import Image from "next/image"
export default function Loading() {
  return (
    <div className="bg-none flex dark:bg-black flex-col gap-7 justify-center items-center absolute inset-0">
      <Image
        src="/icons/loading.png"
        width={100}
        height={100}
        className="animate-spin"
        alt="Loading Image"
      />
      <div className="text-center font-bold text-[2rem] dark:text-white">
        Loading...
      </div>
    </div>
  );
}
