import Link from "next/link";
const Footer = () => (
  // This is the footer Section for more information. enables the reader to easily navigate the document.
  <>
    <div className="flex flex-col h-fit p-5 font-opensans sm:min-h-fit">
      <div className="h-full p-3 grid grid-cols-2 grid-rows-1 w-[95%] m-auto text-sm sm:h-fit sm:w-full sm:py-3 sm:grid-cols-3">
        <div className="grid place-items-center text-center">
          @{new Date().getFullYear()} All Rights Reserved
          <br></br>
          Credits go to Dr Monika Gostic.
        </div>
        <div className="flex justify-around items-center ">
          <Link href="">About</Link>
          <Link href="">Help</Link>
          <Link href="">Contact</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="">Settings</Link>
          <Link href="">FAQ</Link>
        </div>
      </div>
    </div>
  </>
);
export default Footer;
