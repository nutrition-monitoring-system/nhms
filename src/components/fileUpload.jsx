import React, { useState, useEffect, useRef } from "react";
import { FaCamera } from "react-icons/fa";

const dbName = "myDB";
const storeName = "files";
const dbVersion = 1;

const FileUpload = () => {
  const [db, setDb] = useState(null);
  const fileInputRef = useRef(null); // Step 2: Use a ref for the file input

  // initialize IndexedDB
  useEffect(() => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onerror = (event) => {
      console.error("IndexedDB error:", event.target.errorCode);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      setDb(event.target.result);
    };
  }, []);

  // New method to handle the actual file upload process
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    if (!db) {
      console.error("Database not initialized");
      return;
    }

    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.add({ file: file });

    request.onsuccess = () => {
      console.log("File uploaded successfully");
    };

    request.onerror = (event) => {
      console.error("Upload failed", event.target.errorCode);
    };
  };

  // Modified handleUpload to trigger file input click
  const triggerFileInputClick = () => {
    fileInputRef.current.click(); // Programmatically click the hidden file input
  };

  return (
    <div>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      {/* Visible button */}
      <button
        className="log-bar bg-white flex px-5 space-x-3 py-2 shadow-lg w-full rounded-md hover:bg-white/75"
        onClick={triggerFileInputClick} // Use the new method here
      >
        <FaCamera className="size-6" />
        <p className="text-left w-full">Add Photo</p>
      </button>
    </div>
  );
};

export default FileUpload;
