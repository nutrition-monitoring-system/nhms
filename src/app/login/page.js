"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Button from "../../components/Button.jsx";
import { useRouter } from "next/navigation";

//page authentication
import { signIn, useSession } from "next-auth/react";

// for form validation
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

//session
import { SessionProvider } from "next-auth/react";
//import { useSession, signOut } from "next-auth/react";

const userSchema = object().shape({
  email: string().email().required("Please type in your email."),
  password: string().min(5).max(20).required("Please type in your password."),
});

export default function Page() {
  return (
    <>
      <SessionProvider>
        <Home></Home>
      </SessionProvider>
    </>
  );
}
function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });
  const { status } = useSession();
  const router = useRouter();

  const [timer, setTimer] = useState(10);
  const [timerId, setTimerId] = useState(null);

  const modal = useRef(null);
  const handlePopUP = (e) => {
    e.preventDefault();
    modal.current.showModal();
    // this is a timer for forgot password verification.
    const tempId = setInterval(() => {
      setTimer((timer) => {
        if (timer > 0) return timer - 1;
        else {
          clearInterval(timerId);
          setTimerId(null);
          return timer;
        }
      });
    }, 1000);
    setTimerId(tempId);
  };
  const handleClose = (e) => {
    e.preventDefault();
    modal.current.close();
  };
  const submitForm = async (data) => {
    data = { ...data, registration: false };
    const result = await signIn("credentials", {
      redirect: false, // Don't redirect, we'll handle that manually
      ...data, // Pass in the email and password from the form
    });

    if (result.error) {
      // Handle sign-in error, you can display an error message to the user
      //console.error("Sign-in error:", result.error);
      /* router.push("/register"); */
      return alert("Invalid login details! Please try again.");
    } else {
      // Sign-in was successful
      router.push("/home");
    }

    // Sign-in was successful
    router.push("/home");
  };
  const handleSendEmail = (event) => {
    event.preventDefault();
  };
  const handleCountDownStart = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    // if the user is already authenticated, redirect to the home page.
    if (status === "authenticated") {
      router.push("/home");
    }
  }, [status]);
  return (
    <>
      <div className="absolute inset-0 grid grid-cols-4 text-black bg-white font-opensans sm:grid-cols-1 sm:grid-rows-3">
        <div className="flex flex-col items-center justify-center gap-4 pl-4 pr-2 bg-primary sm:gap-2">
          <h1 className="font-extrabold text-[20px]">New Here?</h1>
          <p className="text-center">
            Sign up to explore endless nutrition possibilities. Welcome to the
            future of nutrition management!
          </p>
          <Button href={"/register"}>Sign up Now</Button>
        </div>
        <div className="relative flex flex-col items-center justify-center col-span-3 text-black gap-7 sm:gap-4 sm:row-span-2">
          <Image
            src={"/icons/fruits.png"}
            width={100}
            height={100}
            className="absolute z-0 top-3 left-10 sm:hidden"
            alt="fruit icon"
          />
          <Image
            src={"/icons/fruits.png"}
            width={100}
            height={100}
            className="absolute top-3 right-10 z-0 sm:top-[-4rem] sm:right-3"
            alt="fruit icon 2"
          />
          <h1 className="font-black text-[40px] h-fit font-modak text-center w-1/2 sm:w-3/4 sm:text-[35px] relative z-10">
            Login To Your Account
          </h1>
          <form
            className="flex flex-col justify-center items-left gap-3 w-[50%] p-3 rounded-md sm:w-[90%]"
            onSubmit={handleSubmit(submitForm)}
          >
            <div className="grid w-full grid-cols-5 gap-2 rounded-md place-items-center">
              <Image
                src={"/icons/email.png"}
                width={35}
                height={35}
                alt="email icon"
              />
              <input
                {...register("email", { required: true })}
                type="text"
                placeholder={"Email Address"}
                name="email"
                className="col-span-4"
              ></input>
            </div>
            {errors.email && (
              <p className="text-sm text-rose-600">{errors.email?.message}</p>
            )}
            <div className="grid w-full grid-cols-5 gap-2 rounded-md place-items-center">
              <Image
                src={"/icons/password.png"}
                width={35}
                height={35}
                alt="password icon"
              />
              <input
                {...register("password", { required: true })}
                type={"password"}
                placeholder={"Password"}
                name="password"
                className="col-span-4"
              ></input>
            </div>
            {errors.password && (
              <p className="text-sm text-rose-600">
                {errors.password?.message}
              </p>
            )}
            <div className="flex items-center justify-between w-full p-2 rounded-md">
              <a className="grid place-items-center">
                <span className="cursor-pointer" onClick={handlePopUP}>
                  Forgot Password?
                </span>
              </a>
              <div id="handleLogin">
                <button
                  className="py-3 text-white bg-black tile px-7"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
          {/* <dialog
            ref={modal}
            className="p-3 rounded-md focus:outline-none backdrop-blur-3xl"
          >
            <h1 className="text-lg font-extrabold text-center">
              Forgot Password?{" "}
            </h1>
            <form className="flex flex-col justify-center w-full gap-3 p-3 rounded-md items-left">
              <input
                type={"text"}
                placeholder={"Email Address.."}
                name="email"
              ></input>
              <a
                className="text-purple-600 cursor-pointer"
                onClick={(event) =>
                  handleSendEmail(event) && handleCountDownStart(event)
                }
              >
                Send
              </a>
              <p>You should get a confirmation code on your email</p>
              <input
                type={"text"}
                placeholder={"Confirmation Code.."}
                name="code"
              ></input>
              <div className="flex items-center gap-2 justify-left">
                <span className="p-2 mx-1">
                  {timer}
                  <span className="">s</span>
                </span>
                <a className="text-purple-600 cursor-pointer">reset/resend</a>
              </div>
              <input type={"password"} placeholder={"New Password"}></input>
              <input
                type={"password"}
                placeholder={"Confirm New Password"}
              ></input>
              <div className="flex items-center justify-between">
                <Button onClick={handleClose}>submit</Button>
                <Button onClick={handleClose}>close</Button>
              </div>
            </form>
          </dialog> */}
        </div>
      </div>
      ;
    </>
  );
}
