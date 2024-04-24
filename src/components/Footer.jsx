import Link from "next/link";
const Footer = () => (
  // This is the footer Section for more information. enables the reader to easily navigate the document.
  <>
    <div className="flex flex-col p-5 h-fit font-opensans sm:min-h-fit">
      <div className="grid w-full h-full grid-cols-2 grid-rows-1 gap-2 p-3 m-auto text-sm sm:h-fit sm:w-full sm:py-3 sm:grid-cols-3">
        <div className="grid text-center place-items-center">
          @{new Date().getFullYear()} All Rights Reserved
          <br></br>
          <p>
            Credits go to{" "}
            <a
              href="https://monikagostic.com/"
              style={{ textDecoration: "underline" }}
            >
              Dr Monika Gostic
            </a>
            .
          </p>
        </div>
        <div className="flex items-center justify-around w-full md:col-span-2">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/faq">FAQ</Link>
        </div>
      </div>
    </div>
  </>
);
export default Footer;
