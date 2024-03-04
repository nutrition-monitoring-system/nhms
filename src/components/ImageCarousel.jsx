import React, { useState, useEffect } from 'react';
import { Carousel } from "flowbite-react";
import { TrashIcon, PencilIcon } from '@heroicons/react/outline';

const defaultImageUrl = "../public/photos/person.jpg"; // 替换为你的默认图片路径

export default function ImageCarousel() {
  const [db, setDb] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const request = indexedDB.open('myDB', 1);
    request.onerror = (event) => console.error('IndexedDB error:', event.target.error);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('files')) {
        db.createObjectStore('files', { keyPath: 'id', autoIncrement: true });
      }
    };
    request.onsuccess = (event) => {
      setDb(event.target.result);
      fetchImages(event.target.result);
    };
  }, []);

  const fetchImages = (dbInstance) => {
    const transaction = dbInstance.transaction(['files'], 'readonly');
    const store = transaction.objectStore('files');
    const getRequest = store.getAll();
    getRequest.onerror = (event) => console.error('Error fetching images:', event.target.error);
    getRequest.onsuccess = (event) => {
      const imageFiles = event.target.result.map(record => ({
        id: record.id,
        url: URL.createObjectURL(record.file)
      }));
      if (imageFiles.length === 0) {
        // 没有图片时显示默认图片
        setImages([{ id: 'default', url: defaultImageUrl }]);
      } else {
        setImages(imageFiles);
      }
    };
  };

  const deleteImage = (id) => {
    const transaction = db.transaction(['files'], 'readwrite');
    const store = transaction.objectStore('files');
    const deleteRequest = store.delete(id);

    deleteRequest.onsuccess = () => {
      console.log('Image deleted successfully');
      // 删除后重新获取图片，如果没有图片则显示默认图片
      fetchImages(db);
    };
  };

  const replaceImage = (id) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const transaction = db.transaction(['files'], 'readwrite');
      const store = transaction.objectStore('files');
      const request = store.get(id);
      request.onsuccess = () => {
        const data = request.result;
        data.file = file; // 更新文件
        store.put(data).onsuccess = () => {
          console.log('Image replaced successfully');
          fetchImages(db); // 重新获取所有图片
        };
      };
    };
    fileInput.click();
  };

  return (
	<div className="w-[50%] min-w-[500px] h-[70%] max-h-[90%] place-self-center text-black">
	  <Carousel slide={false}>
		 {images.map((image) => (
			<div key={image.id} className="relative flex h-full items-center justify-center bg-primary text-black">
			  <img src={image.url} alt={`Image ${image.id}`} />
			  <div className="absolute top-2 right-2 flex space-x-2">
				 {image.id !== 'default' && ( // 避免对默认图片显示删除或替换按钮
					<>
					  <button onClick={() => deleteImage(image.id)} className="p-2 text-white bg-red-600 rounded-full focus:outline-none focus:ring">
						 <TrashIcon className="h-6 w-6" />
					  </button>
					  <button onClick={() => replaceImage(image.id)} className="p-2 text-white bg-blue-600 rounded-full focus:outline-none focus:ring">
						 <PencilIcon className="h-6 w-6" />
					  </button>
					</>
				 )}
			  </div>
			</div>
		 ))}
	  </Carousel>
	</div>
 );
}
