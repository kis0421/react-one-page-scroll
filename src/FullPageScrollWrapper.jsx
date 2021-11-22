import React, { useEffect, useState } from "react";

const FullPageScrollWrapper = (props) => {
  const getScreenSize = () => ({
    width: window.innerWidth - 17,
    height: window.innerHeight,
  });

  const screenResize = () => {
    setScreenSize(getScreenSize());
  }

  const screenRePosition = (event) => {
    if (event.deltaY < 0) {
      setCurrentPage(Math.max(1, currentPage - 1));
    } else {
      setCurrentPage(Math.min(currentPage + 1, props.children.length));
    }
  }

  const [screenSize, setScreenSize] = useState(getScreenSize);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.addEventListener("resize", screenResize);
    window.addEventListener("wheel", screenRePosition);
    return () => {
      window.removeEventListener("resize", screenResize);
      window.removeEventListener("wheel", screenRePosition);
    };
  }, [currentPage]);

  return (<>
    <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
      <div style={{
        height: screenSize.height,
        transform: `translateY(-${(currentPage - 1) * screenSize.height}px)`,
        transition: "transform 1s ease 0s",
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
      <ul style={{ position: "fixed", top: `${(screenSize.height / 2) - props.children.length * 21}`, right: "20px" }}>
        {props.children.map((_, index) => (
          <li
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            style={{
              listStyle: "none",
              cursor: "pointer",
            }}>{index + 1 === currentPage ? "●" : "○"}</li>
        ))}
      </ul>
    </div>
  </>);
}

export default FullPageScrollWrapper;
