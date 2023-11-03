import Image from "next/image";
import Link from "next/link";
const Footer = () => (
  <>
    <div className="bg-orange-50 flex flex-col h-screen p-3 text-black font-opensans px-3">
      <div className="bg-black h-[80%] rounded-lg grid grid-cols-4 grid-rows-1 text-white px-4 sm:grid-cols-1 sm:flex sm:justify-around sm:items-center sm:flex-col sm:gap-2 sm:py-5 sm:h-fit">
        <div className="grid place-items-center">
          <h3 className="font-grid place-items-center text-white font-modak text-[30px] text-center">
            Logo
          </h3>
        </div>
        <div className="flex flex-col justify-center items-left sm:w-full sm:items-center sm:py-2">
          <h3 className="font-bold text-secondary mb-3">Links</h3>
          <Link href="">Home</Link>
          <Link href="">Blog</Link>
          <Link href="">Recipes</Link>
          <Link href="">Dashboard</Link>
          <Link href="">Login</Link>
          <Link href="">Register</Link>
        </div>
        <div className="flex flex-col justify-center items-left sm:w-full sm:items-center sm:py-2">
          <h3 className="font-bold text-secondary mb-3">Products</h3>
          <Link href="">Product 1</Link>
          <Link href="">Service 1</Link>
          <Link href="">Product 2</Link>
          <Link href="">Service 2</Link>
          <Link href="">Product 3</Link>
          <Link href="">Service 3</Link>
        </div>
        <div className="flex flex-col justify-center items-left sm:w-full sm:items-center sm:py-2">
          <h3 className="font-bold text-secondary mb-3">Coming Soon</h3>
          <div className="flex justify-around items-center mb-2 rounded-md w-fit bg-white ">
            <button className="px-6 py-3 text-black" disabled>
              <Image
                src={"/icons/game.png"}
                className="bg-white p-1 rounded-lg shadow-md cursor-pointer"
                width={50}
                height={50}
              />
            </button>
            <button className="px-6 py-3 text-black" disabled>
              <Image
                src={"/icons/app-store.png"}
                className="bg-white p-1 rounded-lg shadow-md cursor-pointer"
                width={50}
                height={50}
              />
            </button>
          </div>
          <h3 className="font-bold text-secondary">Get In Touch</h3>
          <div className="flex justify-start items-center gap-3 p-3 m-y-3">
            <Link href="">
              <Image src={"/icons/facebook.png"} width={20} height={20} />
            </Link>
            <Link href="">
              <Image src={"/icons/instagram.png"} width={20} height={20} />
            </Link>
            <Link href="">
              <Image
                src={"/icons/twitter.png"}
                className="bg-white p-1 rounded-sm"
                width={20}
                height={20}
              />
            </Link>
          </div>
          <h3 className="font-bold text-secondary text-sm">Subscribe Now</h3>
          <form
            className="bg-white outline-none min-h-fit max-w-fit rounded-md py-3 px-2 mt-2
            grid place-items-start gap-2 sm:min-w-[80%] sm:max-w-full"
          >
            <input
              type="text"
              placeholder="Email here"
              className="shadow-none"
            ></input>
            <button
              className="min-w-fit grid place-items-center rounded-md
                        bg-secondary text-black px-6 py-2 text-sm
                        shadow-xl transition-all duration-200 ease-in
                        hover:shadow-2xl"
            >
              Send Email
            </button>
          </form>
          <form></form>
        </div>
      </div>
      <div className="h-[20%] grid grid-cols-2 grid-rows-1 w-[95%] m-auto text-sm sm:h-fit sm:w-full sm:py-3 sm:grid-cols-3">
        <div className="grid place-items-center text-center">
          @{new Date().getFullYear()} all rights reserved
        </div>
        <div className="grid grid-cols-4 place-items-center sm:col-span-2">
          <Link href="">About</Link>
          <Link href="">Help</Link>
          <Link href="">Contact</Link>
          <Link href="">Settings</Link>
        </div>
      </div>
    </div>
  </>
);
export default Footer;
