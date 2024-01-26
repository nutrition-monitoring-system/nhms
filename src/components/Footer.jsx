import Link from "next/link";
const Footer = () => (
  // This is the footer Section for more information. enables the reader to easily navigate the document.
  <>
    <div className="bg-white flex flex-col h-fit p-4 text-black font-opensans sm:min-h-fit">
      <div className="h-full p-3 grid grid-cols-2 grid-rows-1 w-[95%] m-auto text-sm sm:h-fit sm:w-full sm:py-3 sm:grid-cols-3">
        <div className="grid place-items-center text-center">
          @{new Date().getFullYear()} All Rights Reserved
          <br></br>
          Credits go to Dr Monica Gostic.
        </div>
        <div className="grid grid-cols-5 place-items-center sm:col-span-2">
          <Link href="">About</Link>
          <Link href="">Help</Link>
          <Link href="">Contact</Link>
          <Link href="TermsAndConditions.html">Terms</Link>
          <Link href="PrivacyPolicy.html">Privacy</Link>
          <Link href="">Settings</Link>
          <Link href="">FAQ</Link>
        </div>
      </div>
    </div>
  </>
);
export default Footer;
