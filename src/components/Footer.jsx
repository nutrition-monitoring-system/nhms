import Image from "next/image";
const Footer = () => (
  <>
    <div className="bg-orange-50 flex flex-col h-screen p-3 text-black font-opensans px-3">
      <div className="bg-black h-[80%] rounded-lg grid grid-cols-4 grid-rows-1 text-white px-4">
        <div className="grid place-items-center">
          <h3 className="font-grid place-items-center text-white font-modak text-[30px]">
            Logo
          </h3>
        </div>
        <div className="flex flex-col justify-center items-left">
          <h3 className="font-bold text-secondary mb-3">Links</h3>
          <a href="">Home</a>
          <a href="">Blog</a>
          <a href="">Recipes</a>
          <a href="">Dashboard</a>
          <a href="">Login</a>
          <a href="">Register</a>
        </div>
        <div className="flex flex-col justify-center items-left">
          <h3 className="font-bold text-secondary mb-3">Products</h3>
          <a href="">Product 1</a>
          <a href="">Service 1</a>
          <a href="">Product 2</a>
          <a href="">Service 2</a>
          <a href="">Product 3</a>
          <a href="">Service 3</a>
        </div>
        <div className="flex flex-col justify-center items-left">
          <h3 className="font-bold text-secondary mb-3">
            Mobile Version Coming Soon
          </h3>
          <div className="flex justify-around items-center bg-white pb-2 mb-2 rounded-md">
            <button className="px-6 py-3 text-black" disabled>
              apple
            </button>
            <button className="px-6 py-3 text-black" disabled>
              playstore
            </button>
          </div>
          <h3 className="font-bold text-secondary">Get In Touch</h3>
          <div className="flex justify-start items-center gap-3 p-3 m-y-3">
            <a href="">
              <Image src={"/icons/facebook.png"} width={20} height={20} />
            </a>
            <a href="">
              <Image src={"/icons/instagram.png"} width={20} height={20} />
            </a>
            <a href="">
              <Image
                src={"/icons/twitter.png"}
                className="bg-white p-1 rounded-sm"
                width={20}
                height={20}
              />
            </a>
          </div>
          <h3 className="font-bold text-secondary text-sm">Subscribe Now</h3>
          <form
            className="bg-white outline-none min-h-fit max-w-fit rounded-md py-3 px-2 mt-2
            grid place-items-start gap-2"
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
      <div className="h-[20%] grid grid-cols-2 grid-rows-1 w-[95%] m-auto text-sm">
        <div className="grid place-items-center">
          @{new Date().getFullYear()} all rights reserved
        </div>
        <div className="grid grid-cols-4 place-items-center">
          <a href="">About</a>
          <a href="">Help</a>
          <a href="">Contact</a>
          <a href="">Settings</a>
        </div>
      </div>
    </div>
  </>
);
export default Footer;
