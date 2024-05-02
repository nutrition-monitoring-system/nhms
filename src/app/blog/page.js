// By default next js renders components on the server for performance
// "use client" tells next js to render the code in the client side
"use client";
import Footer from "../../components/Footer";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";
import NavBar from "@/components/LogoNavigationBar";
import { UpdateAllthemesStoredOnDevice } from "../../utils/otherUtils";

export default function Home() {
  // This function describes the structure of the page
  // The Hero header, the Main Page and the Footer
  UpdateAllthemesStoredOnDevice();
  return (
    <>
      <BlogHeaderParent></BlogHeaderParent>
      <BlogPage></BlogPage>
      <Footer></Footer>
    </>
  );
}

const BlogHeaderParent = () => {
  // Wrapping The session provider Api we have access to the session object
  // And can check if the user is Logged in or Not
  return (
    <SessionProvider>
      <BlogHeader></BlogHeader>
    </SessionProvider>
  );
};

const BlogHeader = () => {
  // Blog
  // - NavBar
  // - Title
  // - Description
  return (
    <div className="relative grid h-screen text-black min-h-fit place-items-center font-opensans">
      <div className="absolute flex bg-primary justify-center items-center flex-col inset-x-0 top-0 min-h-fit h-[85%] sm:h-[70%]">
        <NavBar></NavBar>
        <div className="text-center grid place-items-center min-h-fit h-full p-2 sm:p-0 translate-y-[-50px] animate-enter">
          <h1
            className="text-[4rem] w-3/4 font-black
      sm:text-[35px] sm:w-full xl:text-[70px] xl:w-[80%]"
          >
            Our Blogs and Articles
          </h1>
          <div className="w-1/2 sm:w-full py-2 text-[20px]">
            Explore a vibrant recipe library, set and monitor your health goals,
            and integrate with well-being apps. Embark on your journey to a
            healthier you today!
          </div>
          <div className="flex items-center justify-center py-1 min-h-auto sm:gap-3 gap-7 sm:flex-wrap">
            <Image src="/icons/blog2.png" alt="blog" width={50} height={50} />
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogPage = () => {
  // Main Blog page where a preview of the content is displayed
  return (
    <div className="flex flex-wrap items-center justify-center min-h-screen gap-3 p-5 m-auto w-[70%] md:w-full">
      <ol className="relative border-gray-200 border-s dark:border-gray-700">
        <BlogComponent learnMore={true} time={"November 2023"}/>
        <BlogComponent
          time={"December 2023"}
          heading={"Living with Rheumatoid Arthritis: Beyond the Pain"}
          description={
            "Rheumatoid arthritis (RA) isn't just a joint condition—it's a challenge that affects every aspect of life for those diagnosed with it. This autoimmune disease causes pain and swelling in the joints and can lead to fatigue and widespread inflammation. But beyond the physical symptoms, there's a whole lifestyle adjustment to navigate. This blog post is here to guide you through managing RA, not just to alleviate symptoms but to improve quality of life."
          }
        />
        <BlogComponent
          time={"January 2024"}
          heading={"Journey Through the Fog: Navigating Life with Chronic Kidney Disease"}
          description={
            "Chronic Kidney Disease (CKD) affects millions globally, slowly diminishing kidney function over time. Through the story of \"Emily,\" a fictional character based on common experiences of those with CKD, we'll explore the emotional and physical challenges faced by patients, intertwined with expert advice and coping strategies."
          }
        />
      </ol>
    </div>
  );
};

const BlogComponent = ({
  heading,
  time,
  description,
  content,
  learnMore = false,
}) => {
  // Note - ** The dynamic part of the code has not been implemented yet. **
  // The Blog is not linked to the database yet so all the data displayed is static

  // The Actual preview of the blog
  // - Time
  // - Subtile
  // - Title
  // - A short Description
  if (learnMore == true) {
    return (
      <li className="mb-10 ms-4">
        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
          {time ? time : "February 2022"}
        </time>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {heading
            ? heading
            : "Diabetes Management: Navigating Your Way to a Healthier You"}
        </h3>
        <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
          {description
            ? description
            : "Living with diabetes can feel overwhelming, but with the right        knowledge and support, managing your condition becomes a more         navigable journey. Whether you’re newly diagnosed or have been dealing  with diabetes for years, understanding how to balance your lifestyle    with your health needs is key to maintaining your well-being."}
        </p>
        <a
          href="/blog/blog-num-idadjf"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        >
          Learn more{" "}
          <svg
            className="w-3 h-3 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </li>
    );
  } else {
    return (
      <li className="ms-4 mb-6">
        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
          {time ? time : "February 2022"}
        </time>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {heading
            ? heading
            : "Diabetes Management: Navigating Your Way to a Healthier You"}
        </h3>
        <p className="text-base font-normal text-gray-500 dark:text-gray-400">
          {description
            ? description
            : "One of the pillars of diabetes care is dietary management. Here’s how you can eat well to control your diabetes..."}
        </p>
      </li>
    );
  }
};
