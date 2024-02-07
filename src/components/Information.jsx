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
        x: -20,
        transformOrigin: "bottom",
        opacity: 0.1,
        stagger: 0.1,
      });
    });

    return () => {};
  }, []);

  return (
    <>
      <div5
        className="relative min-h-fit text-black grid place-content-center"
        id="information"
      >
        <section
          className="h-screen bg-white text-center p-10 grid place-content-center font-sans
        "
        >
          <p className="text-lg">
            Welcome to the future of nutrition management!
          </p>
          <p className="font-bold">Scroll down</p>
        </section>
        <section className="h-screen bg-white text-center font-black p-10 grid place-content-center">
          <p className="reveal-type">
            Our web application is your key to a healthier, more informed lifestyle
          </p>
        </section>
        <section className="h-screen bg-black text-white  text-center font-black p-10 grid place-content-center">
          <p className="reveal-type">
            Dive into a world of personalized nutrition with smart insights,
            tailored recommendations, and easy tracking
          </p>
        </section>
        <section className="h-screen bg-white text-center font-black p-10 grid place-content-center">
          <p className="reveal-type">
            Whether you{'\''}re exploring new dietary preferences, managing
            chronic conditions, or simply looking to elevate your well-being,
            we{'\''}ve got you covered. 
          </p>
        </section>
        <section className="h-screen bg-black text-white  text-center font-black p-10 grid place-content-center">
          <p className="reveal-type">Discover a dynamic library of recipes</p>
        </section>
        <section className="h-screen bg-white text-center font-black p-10 grid place-content-center">
          <p className="reveal-type">Set and track your unique health goals</p>
        </section>
        <section className="h-screen bg-white text-center font-black p-10 grid place-content-center">
          <p className="reveal-type">
            Start your journey towards a healthier you today!
          </p>
        </section>
      </div5>
    </>
  );
}
