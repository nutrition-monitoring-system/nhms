import Image from "next/image";
import Link from "next/link";
const Footer = () => (
  <>
    <div className="bg-orange-50 flex flex-col h-screen p-4 text-black font-opensans sm:min-h-fit">
      <div
        className="bg-white shadow-2xl h-[75%] px-[20%] rounded-lg grid grid-cols-4 grid-rows-1 
      sm:px-[5%] sm:grid-cols-1 sm:flex sm:justify-around sm:items-center sm:flex-col sm:gap-2 sm:py-5 sm:h-fit"
      >
        <div className="grid place-items-center">
          <h3 className="font-grid place-items-center font-modak text-[30px] text-center">
            Logo
          </h3>
        </div>
        <div className="flex flex-col justify-center items-left sm:w-full sm:items-center sm:py-2">
          <h3 className="font-semibold font-serif mb-3">Links</h3>
          <Link href="">Home</Link>
          <Link href="">Blog</Link>
          <Link href="">Recipes</Link>
          <Link href="">Dashboard</Link>
          <Link href="">Login</Link>
          <Link href="">Register</Link>
        </div>
        <div className="flex flex-col justify-center items-left sm:w-full sm:items-center sm:py-2">
          <h3 className="font-semibold font-serif mb-3">Products</h3>
          <Link href="">Product 1</Link>
          <Link href="">Service 1</Link>
          <Link href="">Product 2</Link>
          <Link href="">Service 2</Link>
          <Link href="">Product 3</Link>
          <Link href="">Service 3</Link>
        </div>
        <div className="flex flex-col justify-center items-left sm:w-full sm:items-center sm:py-2">
          <h3 className="font-semibold font-serif text-center">Get In Touch</h3>
          <div className="flex justify-center items-center gap-3 p-3 m-y-3">
            <Link href="">
              <Image src={"/icons/facebook.png"} width={25} height={25} />
            </Link>
            <Link href="">
              <Image src={"/icons/instagram.png"} width={25} height={25} />
            </Link>
            <Link href="">
              <Image
                src={"/icons/twitter.png"}
                className="bg-white p-1 rounded-sm"
                width={25}
                height={25}
              />
            </Link>
          </div>
          <h3 className="font-semibold font-serif text-center">
            Subscribe Now
          </h3>
          <form
            className="bg-white outline-none min-h-fit max-w-fit rounded-md py-3 px-4 mt-2
            grid place-items-start gap-2 sm:min-w-[80%] sm:max-w-full"
          >
            <input
              type="text"
              placeholder="Email here"
              className="shadow-none bg-orange-100 placeholder:text-black"
            ></input>
            <button className="tile w-full bg-black text-white py-5">
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
