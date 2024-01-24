import Link from "next/link";
export default function Logo({ logoName = "NHMS" }) {
  return (
    <div className="grid place-items-center text-black font-black font-modak text-[35px]">
      <Link
        href={"/"}
        className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-sky-900 cursor-pointer
    "
      >
        {logoName}
      </Link>
    </div>
  );
}
