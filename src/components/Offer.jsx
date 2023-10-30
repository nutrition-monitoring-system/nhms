import Image from "next/image";
const WhatWeOffer = () => (
  <>
    <div className="bg-orange-50 min-h-screen font-opensans text-black py-3">
      <h1 className="font-extrabold text-[30px] text-center">
        What do we offer?{" "}
      </h1>
      <div className="min-h-fit flex justify-around items-center p-6">
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  </>
);

function Card() {
  return (
    <>
      <div className="max-w-sm rounded overflow-hidden m-3 shadow-lg">
        <Image
          className="w-full"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm8oPRV7E_qlUYUZwVZDHiXR-0Sosbb1TujQ&usqp=CAU"
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
          <p className="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #photography
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #travel
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #winter
          </span>
        </div>
      </div>
    </>
  );
}

export default WhatWeOffer;
