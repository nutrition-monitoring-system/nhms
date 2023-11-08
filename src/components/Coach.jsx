import Button from "./Button.jsx";
const Coach = () => {
  return (
    <>
      <div className="min-h-screen bg-white gap-1 grid grid-cols-2 grid-rows-2 py-4 md:grid-rows-3 md:grid-cols-1">
        <div className="row-span-2 p-2 md:row-span-1">
          <div className="w-full h-full rounded-lg bg-orange-300 bg-[url('https://monikagostic.com/wp-content/uploads/2021/06/Banner.jpg')] bg-cover"></div>
        </div>
        <div className="bg-orange-50 text-black font-opensans mb-2 shadow-2xl rounded-lg grid place-items-center py-4 px-6">
          <h1 className="text-[30px] font-extrabold ">
            Who is Dr.Monika Gostic?
          </h1>
          <p className="text-sm">
            Dr. Monika Gostic is an award-winning nutrition coach, research
            scientist, lecturer, and a mother. She specializes in identifying
            the underlying causes of chronic health issues and tailors her
            guidance to unique needs, offering sustainable solutions that
            promote long-term health. Dr. Gostic collaborates with the
            prestigious Rowett Institute and the University of Aberdeen,
            ensuring that her approach is backed by the latest scientific
            advancements in the field of nutrition. She designs customized
            nutrition strategies to suit specific needs, so individuals can
            achieve optimal results². In addition to her academic background in
            Microbiology, Genetics, and Cancer research, she also holds
            qualifications in Nutrition, Sports Nutrition, Mental health, and
            Coaching. She has been featured on BBC Scotland Radio 1 and BBC
            Scotland TV programme Food Fest. She offers a variety of programs
            through her website, including a 90-day personalized transformation
            plan, a power hour of personalized nutrition coaching, and daily
            meal plans.
          </p>
        </div>
        <div className="bg-orange-200 shadow-lg rounded-lg grid place-items-center">
          <div className="w-[45%] md:w-[90%] bg-orange-100 h-[90%] rounded-lg shadow-xl text-black flex flex-col gap-2 justify-center items-center py-7 px-5">
            <h1 className="font-semibold">Try for free now</h1>
            <p>
              Whether you're scheduling appointments or seeking diet
              recommendations, Dr. Gostic's expertise in Microbiology, Genetics,
              Cancer research, Nutrition, Sports Nutrition, Mental health, and
              Coaching ensures you receive the most effective and
              scientifically-backed advice.
            </p>
            <button className="tile text-white bg-black">
              Click Here to Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coach;
