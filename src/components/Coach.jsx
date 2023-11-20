import Button from "./Button.jsx";
const Coach = () => {
  return (
    <>
      <div className="min-h-screen bg-white gap-1 grid grid-cols-2 grid-rows-1 py-4 md:grid-rows-2 md:grid-cols-1">
        <div className="row-span-2 p-2 md:row-span-1">
          <div className="w-full h-full rounded-lg border-4 border-white shadow-lg bg-[url('https://monikagostic.com/wp-content/uploads/2021/06/Banner.jpg')] bg-cover"></div>
        </div>
        <div className="bg-primary sm:rounded-none text-md text-black font-opensans mb-2 shadow-2xl rounded-lg flex justify-center items-center flex-col gap-4 py-2 px-6">
          <div className="w-full">
            <h1 className="text-[30px] font-extrabold grid place-items-center">
              Dr.Monika Gostic
            </h1>
          </div>
          <p className="py-3 shadow-sm">
            Dr. Monika Gostic is a nutrition coach, scientist, lecturer, and
            mother. She helps people with chronic health issues find the root
            causes and solutions that suit their needs. She works with the
            Rowett Institute and the University of Aberdeen, using the latest
            science to guide her approach. She has a background in Microbiology,
            Genetics, Cancer research, Nutrition, Sports Nutrition, Mental
            health, and Coaching. She has appeared on BBC Scotland Radio 1 and
            TV. She offers various programs on her website, such as a 90-day
            plan, a power hour, and daily meal plans.
          </p>
          <hr className="h-1 bg-black fill-black w-full rounded-sm" />
          <p className="shadow-sm">
            Whether you're scheduling appointments or seeking diet
            recommendations, Dr. Gostic's expertise in Microbiology, Genetics,
            Cancer research, Nutrition, Sports Nutrition, Mental health, and
            Coaching ensures you receive the most effective and
            scientifically-backed advice.
          </p>
          <div className="grid place-items-center w-full">
            <Button href={"/register"}>Click Here to Sign Up</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coach;
