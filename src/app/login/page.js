"use client";
import { useRef, useState } from "react";
import Button from "../../components/Button.jsx";
import { useRouter } from "next/navigation";

// for form validation
import { useForm } from "react-hook-form";
import { object, string, number, date, InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const userSchema = object().shape({
  email: string().email().required("Please type in your email."),
  password: string().min(10).max(20).required("Please type in your password."),
});

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });

  const [timer, setTimer] = useState(10);
  const [timerId, setTimerId] = useState(null);

  const router = useRouter();

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
    console.log(data);
    router.push("./home");
  };

  return (
    <>
      <div className="bg-white absolute inset-0 grid grid-cols-4 text-black font-opensans">
        <div className="bg-primary flex flex-col justify-center items-center gap-4 pl-4 pr-2">
          <h1 className="font-extrabold text-[20px]">New Here?</h1>
          <p className="text-center">
            Sign up to explore endless nutrition possibilities. Welcome to the
            future of nutrition management!
          </p>
          <Button href={"/register"}>Sign Up</Button>
        </div>
        <div className="col-span-3 text-black flex flex-col justify-center items-center gap-4">
          <h1 className="font-black text-[40px] font-modak text-center w-1/2 leading-10">
            LogIn To Your Account
          </h1>
          <form
            className="flex flex-col justify-center items-left gap-3 w-[40%] p-3 rounded-md"
            onSubmit={handleSubmit(submitForm)}
          >
            <input
              {...register("email", { required: true })}
              type="text"
              placeholder={"Email Address"}
              name="email"
            ></input>
            {errors.email && (
              <p className="text-rose-600">{errors.email.message}</p>
            )}
            <input
              {...register("password", { required: true })}
              type={"password"}
              placeholder={"Password"}
              name="password"
            ></input>
            {errors.password && (
              <p className="text-rose-600">{errors.password.message}</p>
            )}
            <a className="grid place-items-center">
              <span className="cursor-pointer" onClick={handlePopUP}>
                Forgot Password?
              </span>
            </a>
            <div className="grid place-items-center">
              <Button type="submit">Login</Button>
            </div>
          </form>
          <dialog
            ref={modal}
            className="p-3 focus:outline-none rounded-md backdrop-blur-3xl"
          >
            <h1 className="text-center text-lg font-extrabold">
              Forgot Password?{" "}
            </h1>
            <form className="flex flex-col justify-center items-left gap-3 w-full p-3 rounded-md">
              <input type={"text"} placeholder={"Email Address.."}></input>
              <a className="text-purple-600 cursor-pointer">send</a>
              <p>You should get a confirmation code on your email</p>
              <input type={"text"} placeholder={"Confirmation Code.."}></input>
              <div className="flex justify-left items-center gap-2">
                <span className="p-2 mx-1">
                  {timer}
                  <span className="">s</span>
                </span>
                <a className="text-purple-600 cursor-pointer">reset/resend</a>
              </div>
              <input type={"password"} placeholder={"New Password"}></input>
              <input type={"password"} placeholder={"Confirm Password"}></input>
              <div className="flex justify-between items-center">
                <Button>Continue</Button>
                <Button onClick={handleClose}>close</Button>
              </div>
            </form>
          </dialog>
        </div>
      </div>
      ;
    </>
  );
}
