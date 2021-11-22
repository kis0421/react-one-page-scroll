import React, { useEffect, useState } from "react";

const FullPageScrollWrapper = (props) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const getScreenSize = () => ({
    width: window.innerWidth - 17,
    height: window.innerHeight,
  });

  const screenResize = () => {
    console.log(getScreenSize())
    setScreenSize(getScreenSize());
  }

  const screenRePosition = (event) => {
    console.log(event.deltaY, currentPage)
    if (event.deltaY < 0) {
      console.log("위", currentPage);
      setCurrentPage(currentPage - 1);
    } else {
      console.log("아래", currentPage, currentPage + 1);
      setCurrentPage(currentPage + 1);
    }

  }

  const [screenSize, setScreenSize] = useState(getScreenSize);
  const [screenYPosiion, setScreenYPosiion] = useState();

  useEffect(() => {
    window.addEventListener("resize", screenResize);
    window.addEventListener("wheel", screenRePosition);
    return () => {
      window.removeEventListener("resize", screenResize);
      window.removeEventListener("wheel", screenRePosition);
    };
  }, [])
  console.log(currentPage)
  return (<>
  <button onClick={() => setCurrentPage(currentPage + 1)}>ddd</button>
    <div style={{ overflow: "hidden" }}>
      <div style={{
        height: screenSize.height,
        transform: `translateY(${(currentPage * screenSize.height) * -1}px)`,
        transition: "transform 0.9s ease 0s",
      }}>
        {props.children.map((element, index) => (
          <div
            key={index}
            style={{
              width: screenSize.width,
              height: screenSize.height,
            }}>{element}</div>
        ))}
      </div>
    </div>
  </>);
}

export default FullPageScrollWrapper;
