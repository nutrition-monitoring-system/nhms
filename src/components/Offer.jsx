const WhatWeOffer = () => (
  <>
    <div className="bg-orange-50 min-h-screen font-opensans text-black py-3">
      <h1 className="font-extrabold text-[30px] text-center mb-7">
        What do we offer?
      </h1>
      <div className="min-h-fit grid grid-cols-3 grid-rows-1 p-7 gap-3 bg-orange-100 sm:grid-cols-1 sm:grid-rows-3 sm:gap-4">
        <InfoCardOne />
        <InfoCardTwo />
        <InfoCardThree />
      </div>
    </div>
  </>
);

function InfoCardOne() {
  const title = "1. Personalized Health and Wellness Profiles";
  const content = [
    "Customized user profiles to track nutrition, exercise, mood, and more.",
    "Visual progress comparisons with before-and-after images.",
    "Integration with Dr. Monica's Google Calendar for appointments.",
    "Multiselect chronic condition tracking.",
  ];
  return (
    <>
      <InfoCard title={title} content={content} />
    </>
  );
}
function InfoCardTwo() {
  const title = "2. Smart Nutrition and Recipe Library";
  const content = [
    "Extensive recipe library with filters for time and budget.",
    "Offline access through device caching.",
    "Personalized dietary recommendations.",
    "Consideration of intolerances like IBS.",
  ];
  return (
    <>
      <InfoCard title={title} content={content} />
    </>
  );
}
function InfoCardThree() {
  const title = "3. Comprehensive Health and Well-being Integration:";
  const content = [
    "Integration with other health and well-being apps.",
    "Habit tracking and goal setting.",
    "Shopping list integration with popular stores.",
    "Free and premium feature options.",
  ];

  return (
    <>
      <InfoCard title={title} content={content} />
    </>
  );
}

function InfoCard({ title, content }) {
  return (
    <>
      <div className="max-w-md rounded-lg overflow-hidden shadow-xl bg-white p-1">
        <img
          className="w-full rounded-lg shadow-lg"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm8oPRV7E_qlUYUZwVZDHiXR-0Sosbb1TujQ&usqp=CAU"
          width={100}
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <ul className="text-gray-700 text-sm p-2">
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

export default WhatWeOffer;
