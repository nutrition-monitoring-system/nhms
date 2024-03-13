"use client";
import { useState } from "react";
import Link from "next/link";
export default function TermsAndConditions({ onClickPrev, onClickNext }) {
  const [termsConditions, setTermsConditions] = useState(false);
  const [shareHealthDate, setShareHealthData] = useState(false);
  return (
    <>
      <div className="flex flex-col justify-center items-left gap-3 min-w-full min-h-fit p-2 rounded-md flex-1">
        <h1 className="grid place-items-center text-secondary font-extrabold text-[1.3rem]">
          Data Consent
        </h1>
        <div className="h-1/2 w-full flex justify-center items-center gap-2 flex-col">
          <div className="flex">
            <div className="grid place-items-center p-5">
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
            <div className="grid place-items-center p-5">
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
        <div className="w-full flex justify-around items-center ">
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
