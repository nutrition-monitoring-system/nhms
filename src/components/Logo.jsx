import Link from "next/link";
export default function Logo({ logoName = "NHMS" }) {
  return (
    <div className="grid place-items-center text-black font-black font-modak text-[35px]">
      <Link
        href={"/"}
        className="text-transparent cursor-pointer bg-clip-text bg-gradient-to-r from-primary to-sky-900 "
      >
        {logoName}
      </Link>
    </div>
  );
}
