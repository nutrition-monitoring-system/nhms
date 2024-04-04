"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
export default function PopModal({ children, showModal, setShowModal }) {
  const modalRef = useRef();
  const handleModalClose = (event) => {
    event.preventDefault();
    setShowModal(false);
    modalRef.current.close();
  };
  useEffect(() => {
    if (showModal) {
      modalRef.current.showModal();
    } else {
      modalRef.current.close();
    }
  }, [showModal]);
  return (
    <>
      <dialog ref={modalRef} className="w-[30%] p-2 rounded-md md:w-full">
        <div className="w-full p-2">
          <button onClick={handleModalClose} className="tile">
            <Image
              alt="add image icon"
              src="/icons/add.png"
              className="rotate-45"
              width={20}
              height={20}
            ></Image>
            close
          </button>
        </div>
        {children}
      </dialog>
    </>
  );
}
