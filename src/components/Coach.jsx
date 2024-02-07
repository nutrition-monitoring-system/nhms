const Coach = () => {
  // This function returns 2 sections a pic div and a description div
  // It tells the user about who the Coach is
  return (
    <>
      <div className="min-h-screen bg-white grid grid-cols-2 grid-rows-1 py-4 md:grid-rows-2 md:grid-cols-1">
        <div className="relative row-span-2 col-span-2 p-2 md:row-span-1">
          <div className="w-[98%] m-auto h-full rounded-lg shadow-xl bg-[url('https://monikagostic.com/wp-content/uploads/2021/06/Banner.jpg')] bg-cover"></div>
          <InfoPart />
        </div>
      </div>
    </>
  );
};

function InfoPart() {
  return (
    <div
      className="absolute top-1 right-10 w-1/2 h-full sm:rounded-none text-center
    text-md text-black font-opensans rounded-lg flex justify-center items-center flex-col gap-4 py-2 px-6"
    >
      <p className="py-3 shadow-sm text-lg">
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
      <p className="shadow-lg bg-white rounded-lg p-4">
        Whether you&apos;re scheduling appointments or seeking diet recommendations,
        Dr. Gostic&apos;s expertise in Microbiology, Genetics, Cancer research,
        Nutrition, Sports Nutrition, Mental health, and Coaching ensures you
        receive the most effective and scientifically-backed advice.
      </p>
    </div>
  );
}
export default Coach;
