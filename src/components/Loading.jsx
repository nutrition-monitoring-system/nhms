import Image from "next/image";
export default function Loading() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-none dark:bg-black gap-7">
      <Image
        src="/icons/loading.png"
        width={100}
        height={100}
        className="animate-spin"
        alt="Loading Image"
      />
      <div className="text-3xl text-center dark:text-white">Loading...</div>
    </div>
  );
}
