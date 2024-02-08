import Link from "next/link";
const Footer = () => (
  // This is the footer Section for more information. enables the reader to easily navigate the document.
  <>
    <div className="bg-gray-100 flex flex-col h-fit p-4 text-black font-opensans sm:min-h-fit mt-2">
      <div className="h-full p-3 sm:p-0 grid grid-cols-2 sm:grid-cols-1 grid-rows-1 sm:grid-rows-2 w-full m-auto text-sm sm:h-fit sm:w-full sm:py-3">
        <div className="grid place-items-center text-center">
          @{new Date().getFullYear()} All Rights Reserved
          <br></br>
          Credits go to Dr Monica Gostic.
        </div>
        <div className="flex justify-around items-center sm:col-span-2">
          <Link href="#about">About</Link>
          <Link href="">Help</Link>
          <Link href="">Contact</Link>
          <Link href="terms">Terms</Link>
          <Link href="privacy">Privacy</Link>
          <Link href="user/user3iq3">Settings</Link>
          <Link href="">FAQ</Link>
        </div>
      </div>
    </div>
  </>
);
export default Footer;
