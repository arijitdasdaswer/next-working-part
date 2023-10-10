import React, { useEffect, useState } from "react";
import "../styles/globals.css";

type Props = {};

const WelcomePopup = (props: Props) => {
  const [active, setActive] = useState(1);
  const [fisrtTime, setFirstTime] = useState(true);
  useEffect(() => {
    const isFirst = localStorage.getItem("Welcome");
    if (isFirst) {
      setFirstTime(false);
    }
  }, []);

  const clickHandler = () => {
    if (active == 3) {
      localStorage.setItem("Welcome", "true");
      setFirstTime(false);
    } else {
      setActive(active + 1);
    }
  };
  console.log(active);
  return (
    <>
      {fisrtTime && (
        <section className="fixed z-[1999] w-[100vw] h-[100vh] bg-white">
          {active === 1 && (
            <div className="first h-[70vh]  min-[400px]:h-[80vh]">
              <div
                className="img relative w-full h-[65vh] 
      "
              >
                <img
                  src="/images/popup/firstBgl334.png"
                  alt="bg"
                  className="ml-[-3%] mt-[0%] scale-x-[1.2] min-[400px]:scale-x-[1.5] min-[400px]:mt-[-10vh] z-10"
                />
                <img
                  src="/images/popup/firstPlanet.png"
                  alt="bg"
                  className="z-20 absolute top-[20%] scale-[.9] min-[400px]:scale-[.8] min-[400px]:top-[30%]"
                />
                <img
                  src="/images/popup/firstTrees.png"
                  alt="bg"
                  className="z-20 absolute top-[10%] scale-[.85] left-[4%] min-[400px]:top-[20%]"
                />
                <img
                  src="/images/popup/firstCloud.png"
                  alt="bg"
                  className="z-20 absolute top-[15%] min-[400px]:top-[30%] right-[157px]"
                />
                <img
                  src="/images/popup/firstBirds.png"
                  alt="bg"
                  className="z-20 absolute top-[10%] min-[400px]:top-[25%] right-[48px]"
                />
              </div>
            </div>
          )}
          {active === 2 && (
            <div className="first h-[70vh]">
              <div
                className="img relative w-full h-[65vh] overflow-hidden 
      "
              >
                <img
                  src="/images/popup/secondBg.png"
                  alt="bg"
                  className="ml-[3%] mt-[0%] scale-x-[1.3] z-10 h-[125vh]  "
                />
                <img
                  src="/images/popup/secondImage.png"
                  alt="bg"
                  className="z-20 absolute top-[30%] ml-[8vw] scale-[1.1] "
                />
              </div>
            </div>
          )}
          {active === 3 && (
            <div className="first h-[70vh]">
              <div
                className="img relative w-full h-[65vh] 
      "
              >
                <img
                  src="/images/popup/thirdBg.png"
                  alt="bg"
                  className="ml-[-3%] -mt-[0%] scale-x-[1.2] z-10 -translate-y-[17vh] min-[400px]:translate-y-[-33vh]"
                />
                <div className="text flex absolute top-[12vh]  min-[400px]:top-[8vh] px-[15px]">
                  <img
                    src="/images/popup/thirdLogo.png"
                    alt="logo"
                    className="mr-2 scale-[.9]"
                  />
                  <div className="text-[#4D954D] poppins ">
                    <h2
                      className=" text-[25px]  poppins tracking-[.01em] "
                      style={{ fontWeight: "bold" }}
                    >
                      Binfluence
                    </h2>

                    <p>
                      Helping you reduce waste through making recycling easier
                    </p>
                  </div>
                  <img
                    src="/images/popup/thirdPins.png"
                    alt="bg"
                    className="z-20 absolute -bottom-[240%] right-[3vw] scale-[.9]"
                  />
                </div>
              </div>
            </div>
          )}

          <div className=" flex justify-center -translate-y-[15px] min-[400px]:mt-[0vh] ">
            <span
              className="rounded-full w-[12px] h-[12px]"
              style={{ background: active === 1 ? "#4D954D" : "#999999" }}
            ></span>
            <span
              className="rounded-full w-[12px] h-[12px] mx-3"
              style={{ background: active === 2 ? "#4D954D" : "#999999" }}
            ></span>
            <span
              className="rounded-full w-[12px] h-[12px]"
              style={{ background: active === 3 ? "#4D954D" : "#999999" }}
            ></span>
          </div>
          <div className="text" style={{ fontFamily: "Poppins" }}>
            <div className="firstText mt-[2vh]">
              <h2
                className=" text-[25px] text-center poppins tracking-[.01em] text-[#333]"
                style={{ fontWeight: "bold", color: "#333" }}
              >
                {active === 1 && "Welcome to Binfluence!"}
                {active === 2 && "What we can do"}
                {active === 3 && "Promote Material Reuse"}
              </h2>
              <p className="text-center text-[#999] w-[376px] mx-auto  text-[18px]  poppins mt-3">
                {active === 1 &&
                  "Obtain information and products to reduce waste and promote recyclability."}
                {active === 2 &&
                  "Helping you reduce waste through making recycling easier."}
                {active === 3 &&
                  "Helping you reduce waste through making recycling easier."}
              </p>
            </div>
          </div>
          <div className="btns w-[336px] mt-7 mx-auto flex justify-between items-center">
            <button
              className="text-[#B4B4B4]"
              onClick={() => setFirstTime(false)}
            >
              Skip step
            </button>
            <button
              className="bg-[#4D954D] text-white flex justify-center items-center min-w-[102px] h-[46px] rounded px-2"
              onClick={clickHandler}
            >
              {active === 3 ? <span>Start Recycling</span> : <span>Next</span>}

              <img
                src="/images/popup/btnImage.png"
                alt="next"
                className="ml-[6px] pt-[4px]"
              />
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default WelcomePopup;
