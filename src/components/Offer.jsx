import Image from "next/image";
const Offer = () => (
  // Offer
  // This function returns more what we offer as a server and how it can benefit you.
  // <InfoCardOne /> ---------------|
  //<InfoCardTwo />  ---------------|----------- These functions just tell you what the site offers by looping through a content array and rendering the data to in the WhatWeOfferSection
  // <InfoCardThree /> -------------|
  <>
    <div className="min-h-fit font-opensans text-black py-3">
      <h1 className="font-extrabold text-[30px] text-center mb-7">
        What do we offer?
      </h1>
      <div className="min-h-fit grid grid-cols-3 p-5 gap-3 xl:bg-prim shadow-lg sm:grid-cols-1 sm:grid-rows-3 sm:gap-4 xl:flex xl:flex-wrap xl:justify-center">
        <>
          {Information.map((item, idx) => (
            <div key={idx}>
              <InfoCard title={item.title} content={item.content} />
            </div>
          ))}
        </>
      </div>
    </div>
  </>
);

const Information = [
  {
    title: "1. Personalized Health and Wellness Profiles",
    content: [
      "Customized user profiles to track nutrition, exercise, mood, and more.",
      "Visual progress comparisons with before-and-after images.",
      "Integration with Dr. Monika's Google Calendar for appointments.",
      "Multiselect chronic condition tracking.",
    ],
  },
  {
    title: "2. Smart Nutrition and Recipe Library",
    content: [
      "Extensive recipe library with filters for time and budget.",
      "Offline access through device caching.",
      "Personalized dietary recommendations.",
      "Consideration of intolerances like IBS.",
    ],
  },
  {
    title: "3. Comprehensive Health and Well-being Integration:",
    content: [
      "Integration with other health and well-being apps.",
      "Habit tracking and goal setting.",
      "Shopping list integration with popular stores.",
      "Free and premium feature options.",
    ],
  },
];

function InfoCard({ title, content }) {
  return (
    <>
      <div className="max-w-md rounded-lg overflow-hidden shadow-xl bg-primarylight p-1 xl:flex xl:max-w-full">
        <Image
          className="w-full rounded-lg shadow-xl"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm8oPRV7E_qlUYUZwVZDHiXR-0Sosbb1TujQ&usqp=CAU"
          width={500}
          height={300}
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <ul className="text-gray-900 text-sm p-2">
            {content.map((item, idx) => (
              <li key={idx} className="list-disc">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Offer;
