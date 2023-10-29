import Link from "next/link";

export default function Header() {
  return (
    <>
      <div className="h-screen relative bg-white text-black grid place-items-center font-opensans">
        <div className="absolute bg-primary flex justify-center items-center flex-col inset-x-0 top-0 h-[85%]">
          <NavBar></NavBar>
          <div className="text-center grid place-items-center h-full p-2">
            <h1 className="text-[50px] w-3/4 font-black">
              A Smart and Personalised Nutrition Management System
            </h1>
            <p className="w-1/2">
              Explore Link vibrant recipe library, set and monitor health goals,
              and integrate with well-being apps. Embark on your journey to Link
              healthier you today!"
            </p>
            <ImageIcon
              src={"angle-double-small-down.png"}
              link={"#information"}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function NavBar() {
  return (
    <div className="w-full grid grid-cols-2 py-2 bg-white">
      <div className="grid place-items-center text-black font-modak text-[30px]">
        Logo
      </div>
      <div className="flex justify-center items-center gap-2">
        <Button href={"/login"}>Login</Button>
        <Button href={"/register"}>Register</Button>
      </div>
    </div>
  );
}

function Button({ children, href }) {
  return (
    <Link href={href}>
      <button
        className="m-2 min-w-fit grid place-items-center rounded-md
          bg-white px-8 py-3 text-sm
          shadow-xl transition-all duration-200 ease-in
          hover:shadow-2xl"
      >
        {children}
      </button>
    </Link>
  );
}

function ImageIcon({ link, src }) {
  return (
    <>
      <Link href={link}>
        {" "}
        <img
          className="hover:translate-y-2 transition-transform duration-200 ease-in-out"
          src={"./icons/" + src}
          loading="lazy"
          width={30}
          height={30}
        />
      </Link>
    </>
  );
}
