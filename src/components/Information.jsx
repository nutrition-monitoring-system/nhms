"use client";
import { useEffect } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import scrollTrigger from "gsap/ScrollTrigger";
export default function Information() {
  //This function is a more detaied description of the website

  useEffect(() => {
    gsap.registerPlugin(scrollTrigger);
    const splitTypes = document.querySelectorAll(".reveal-type");
    splitTypes.forEach((char, i) => {
      const text = new SplitType(char, {
        types: "chars",
      });
      gsap.from(text.chars, {
        scrollTrigger: {
          trigger: char,
          start: "top 80%",
          end: "top 20%",
          scrub: true,
          markers: false,
        },
        y: 5,
        opacity: 0.1,
        stagger: 0.1,
      });
    });

    return () => {};
  }, []);

  return (
    <>
      <div
        className="sm:grid place-items-center hidden h-screen w-full text-lg p-3 text-center"
        id="information"
      >
        Welcome to the future of nutrition management!Our web application is
        your key to a healthier, more informed lifestyle Dive into a world of
        personalized nutrition with smart insights, tailored recommendations,
        and easy tracking. Whether you're exploring specific dietary
        preferences, managing chronic conditions, or simply looking to elevate
        your well-being, we've got you covered. Discover a dynamic library of
        recipes. Set and track your unique health goals. Start your journey
        towards a healthier you today!
      </div>
      <div
        className="relative min-h-fit text-black grid place-content-center sm:hidden"
        id="information"
      >
        <section
          className="h-screen bg-white text-center p-10 grid place-content-center
        "
        >
          <p className="text-lg">
            Welcome to the future of nutrition management!
          </p>
          <p className="font-bold">Scroll down</p>
        </section>
        <section className="h-screen bg-white text-center font-black p-10 grid place-content-center">
          <p className="reveal-type">
            Our web application is your key to a healthier, more informed
            lifestyle
          </p>
        </section>
        <section className="h-screen bg-black shadow-2xl text-white text-center font-black p-10 grid place-content-center">
          <p className="reveal-type">
            dive into a world of personalized nutrition with smart insights and
            tailored recommendations
          </p>
        </section>
        <section className="h-screen bg-yellow-500 text-black  text-center font-black p-10 grid place-content-center">
          <p className="reveal-type">Discover a dynamic library of recipes</p>
        </section>
        <section className="h-screen bg-black text-white text-center font-black p-10 grid place-content-center">
          <p className="reveal-type">Set and track your unique health goals</p>
        </section>
        <section className="h-screen bg-white text-center font-black p-10 grid place-content-center">
          <p className="reveal-type">
            Start your journey towards a healthier you today!
          </p>
        </section>
      </div>
    </>
  );
}
