"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TomSelect from "tom-select";
import "tom-select/dist/css/tom-select.bootstrap5.css";
import "./index.css";

export default function Symptoms() {
  const [selected, setSelected] = useState([]);
  const router = useRouter();

  const options = [
    { value: "Bloating", text: "Bloating" },
    { value: "Diarrhoea", text: "Diarrhoea" },
    { value: "Stomach Pain", text: "Stomach Pain" },
    { value: "Other", text: "Other" },
  ];

  const handleSelect = (value) => {
    setSelected(value);
  };

  useEffect(() => {
    const inst = new TomSelect("#select-state", {
      options,
      plugins: ["remove_button", "clear_button"],
      onChange: handleSelect,
      create: true, createOnBlur: true,
      render: {
        item: function(data, escape) {
          return '<div class=" !px-3 !bg-primarylight !rounded-lg !hover:bg-primarylight/75">' + escape(data.text) + '</div>';
        },
      }
    });
    return () => inst.destroy();
  }, []);

  const handleSubmit = () => {
    if (selected.length === 0) return;
    console.log(selected);
    const params = new URLSearchParams();
    params.append("selected", selected.join(","));
    router.push(`/symptoms/slide?${params.toString()}`);
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col gap-10 py-4 ">
        <h1 className="text-4xl font-bold">Symptoms:</h1>
        <div className="w-1/2 min-h-[40vh] flex items-center flex-col gap-6">
          <input
            type="date"
            className="appearance-none w-full p-3 rounded-lg !bg-primary "
            placeholder="Enter a date: "
            required
          />
          {/* <input
            type="search"
            placeholder="Type to search symptoms"
            className="w-full p-2 rounded-lg"
            style={{ backgroundColor: 'rgb(220,150,150)' }}
          /> */}
          <select
            id="select-state"
            name="state[]"
            multiple
            placeholder="Type to search symptoms:"
            autoComplete="off"
            className="w-full form-control bg-primary"
            // onChange={handleSelect}
          />
        </div>

        <div className="flex justify-end w-1/2">
          <button
            disabled={selected.length === 0}
            className="bg-black text-white p-2 px-10 rounded-lg text-xl cursor-pointer disabled:opacity-25"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
