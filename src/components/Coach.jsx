import Image from "next/image";
const Coach = () => {
  // This function returns 2 sections a pic div and a description div
  // It tells the user about who the Coach is
  return (
    <>
      <div className="py-4 h-fit md:grid-rows-2">
        <div className="relative grid grid-cols-2 col-span-2 row-span-2 p-2 md:row-span-1 md:grid-cols-1 md:grid-rows-1">
          <div
            style={{ position: "relative", width: "100%", height: "100%" }}
            className="md:hidden"
          >
            <Image
              alt="Monika Gostic's Main photo"
              className="bg-gray-100 rounded-lg"
              src="https://monikagostic.com/wp-content/uploads/2021/06/Banner.jpg"
              width={1200}
              height={400}
              objectFit="contain"
            />
          </div>
          <InfoPart />
        </div>
      </div>
    </>
  );
};

function InfoPart() {
  return (
    <div className="flex flex-col items-center justify-center w-auto h-full gap-4 px-6 py-10 text-center text-black rounded-lg sm:rounded-none text-md font-opensans ">
      <p className="py-3 text-lg shadow-sm">
        <strong className="font-extrabold">Dr. Monika Gostic</strong> is a
        nutrition coach, scientist, lecturer, and mother. She helps people with
        chronic health issues find the root causes and solutions that suit their
        needs. She works with the Rowett Institute and the University of
        Aberdeen, using the latest science to guide her approach. She has a
        background in Microbiology, Genetics, Cancer research, Nutrition, Sports
        Nutrition, Mental health, and Coaching. She has appeared on BBC Scotland
        Radio 1 and TV. She offers various programs on her website, such as a
        90-day plan, a power hour, and daily meal plans.
      </p>
      <p className="p-4 bg-white rounded-lg shadow-lg">
        Whether you&apos;re scheduling appointments or seeking diet
        recommendations, Dr. Gostic&apos;s expertise in Microbiology, Genetics,
        Cancer research, Nutrition, Sports Nutrition, Mental health, and
        Coaching ensures you receive the most effective and
        scientifically-backed advice.
      </p>
    </div>
  );
}
export default Coach;
