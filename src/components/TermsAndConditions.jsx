"use client";
import { useState } from "react";
import Link from "next/link";
export default function TermsAndConditions({ onClickPrev, onClickNext }) {
  const [termsConditions, setTermsConditions] = useState(false);
  const [shareHealthDate, setShareHealthData] = useState(false);
  return (
    <>
      <div className="flex flex-col justify-center flex-1 min-w-full gap-3 p-2 rounded-md items-left min-h-fit">
        <h1 className="grid place-items-center text-secondary font-extrabold text-[1.3rem]">
          Data Consent
        </h1>
        <p className="grid my-1 text-left opacity-50 place-items-center text-slate">
          Please check the boxes before if you agree to continue
        </p>
        <div className="flex flex-col items-center justify-center w-full gap-2 h-1/2">
          <div className="flex">
            <div className="grid p-5 place-items-center">
              <input
                type="checkbox"
                id="terms-privacy"
                name="terms-privacy"
                value={termsConditions ? "1" : "0"}
                onChange={() => setTermsConditions((prev) => !prev)}
              />
            </div>
            <p>
              By ticking this box, you agree to the{" "}
              <a href="/terms" className="text-secondary">
                Terms and Conditions
              </a>{" "}
              and
              <a href="/privacy" className="text-secondary">
                {" "}
                Privacy Policy
              </a>
              .{" "}
            </p>
          </div>
          <div className="flex">
            <div className="grid p-5 place-items-center">
              <input
                className="w-10"
                type="checkbox"
                id="sharing-data"
                name="sharing-data"
                value={shareHealthDate ? "1" : "0"}
                onChange={() => setShareHealthData((prev) => !prev)}
              />
            </div>
            <p>
              {" "}
              By ticking this box, you also consent to the admin of the site
              viewing your health data.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-around w-full ">
          <Link href={"/"} className="tile">
            Home
          </Link>
          <button
            id="register-next"
            className="tile"
            onClick={(event) =>
              termsConditions && shareHealthDate
                ? (function () {
                    event.preventDefault();
                    onClickNext();
                  })()
                : event.preventDefault()
            }
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
