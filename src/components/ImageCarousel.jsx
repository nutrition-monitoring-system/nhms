import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Carousel } from "flowbite-react";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import FileUpload from "./fileUpload";

const defaultImageUrl = "/photos/person.jpg";

export default function ImageCarousel() {
  const [db, setDb] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const request = indexedDB.open("myDB", 1);
    request.onerror = (event) =>
      console.error("IndexedDB error:", event.target.error);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("files")) {
        db.createObjectStore("files", { keyPath: "id", autoIncrement: true });
      }
    };
    request.onsuccess = (event) => {
      setDb(event.target.result);
      fetchImages(event.target.result);
    };
  }, []);

  const fetchImages = (dbInstance) => {
    const transaction = dbInstance.transaction(["files"], "readonly");
    const store = transaction.objectStore("files");
    const getRequest = store.getAll();
    getRequest.onerror = (event) =>
      console.error("Error fetching images:", event.target.error);
    getRequest.onsuccess = (event) => {
      const imageFiles = event.target.result.map((record) => ({
        id: record.id,
        url: URL.createObjectURL(record.file),
      }));
      console.log(imageFiles.length);
      if (imageFiles.length === 0) {
        // if no image, dispaly default
        setImages([{ id: "default", url: defaultImageUrl }]);
      } else {
        setImages(imageFiles);
      }
    };
  };

  const deleteImage = (id) => {
    const transaction = db.transaction(["files"], "readwrite");
    const store = transaction.objectStore("files");
    const deleteRequest = store.delete(id);

    deleteRequest.onsuccess = () => {
      console.log("Image deleted successfully");
      // re-fetch image after delete, if no image, dispaly default
      fetchImages(db);
    };
  };

  const replaceImage = (id) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const transaction = db.transaction(["files"], "readwrite");
      const store = transaction.objectStore("files");
      const request = store.get(id);
      request.onsuccess = () => {
        const data = request.result;
        data.file = file; // refresh file
        store.put(data).onsuccess = () => {
          console.log("Image replaced successfully");
          fetchImages(db); // re-fetch all image
        };
      };
    };
    fileInput.click();
  };

  return (
    <div className="flex gap-4 place-content-center w-full bg-gray-100">
      <div className="min-w-[40%] h-full flex justify-center items-center gap-2 text-black p-2">
        <Carousel slide={false}>
          {images.map((image) => (
            <div
              key={image.id}
              className="relative flex h-full items-center justify-center bg-primary text-black"
            >
              <Image src={image.url} fill={true} alt={`Image ${image.id}`} />
              <div className="absolute top-2 right-[30%] flex space-x-2">
                {image.id !== "default" && ( // avoid delete or replace button for default image
                  <>
                    <button
                      onClick={() => deleteImage(image.id)}
                      className="p-2 text-white bg-red-600 rounded-full focus:outline-none focus:ring"
                    >
                      <FaTrash className="h-6 w-6" />
                    </button>
                    <button
                      onClick={() => replaceImage(image.id)}
                      className="p-2 text-white bg-blue-600 rounded-full focus:outline-none focus:ring"
                    >
                      <FaPencilAlt className="h-6 w-6" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </Carousel>

        <FileUpload fetchImages={() => fetchImages(db)}></FileUpload>
      </div>
    </div>
  );
}
