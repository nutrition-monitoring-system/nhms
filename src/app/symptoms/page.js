import Footer from '@/components/Footer'
export default function Symptoms() {
  return (

    <>
      <div className="flex justify-center items-center flex-col py-4 h-full w-full">
        <h1 className="font-extrabold text-[20px]">Symptoms:</h1>

        <div className="w-1/3 h-full my-4 pt-10 flex items-center flex-col gap-10">
          <input type="date" className="block appearance-none w-full p-2 rounded-lg bg-primary text-black " />
          <input
            type="search"
            placeholder="Type to search symptoms:"
            className="appearance-none w-full p-2 rounded-lg bg-primary text-black"
          />
        </div>
        {/* <div className="flex items-center gap-8 p-2">
          <ColorCard />
          <ColorCard />
        </div> */}
      </div>
      <div className="absolute inset-x-0 bottom-0 flex-col"><Footer /></div>
    </>
  )
}

function ColorCard() {
  return <div className="w-96 h-96 rounded-lg bg-primary"></div>
}
