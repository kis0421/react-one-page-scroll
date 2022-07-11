import React, { useEffect, useState } from "react";

const FullPageScrollWrapper = (props) => {
  const delay = props.delay || 1000;
  const useLoop = props.loop || false;

  const getScreenSize = () => {
    const scrollBarWidth = window.innerWidth - document.body.clientWidth;
    return {
      width: window.innerWidth - scrollBarWidth,
      height: window.innerHeight,
    }
  };

  const screenResize = () => {
    setScreenSize(getScreenSize());
  }

  const screenRePosition = (event) => {
    const prev = event.deltaY < 0;
    if (prev) {
      setCurrentPage(
        currentPage === 1 && useLoop
          ? props.children.length
          : Math.max(1, currentPage - 1)
      );
    } else {
      setCurrentPage(
        currentPage === props.children.length && useLoop
          ? 1
          : Math.min(props.children.length, currentPage + 1)
      );
    }
  }

  const [screenSize, setScreenSize] = useState(getScreenSize);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // TODO: delay만큼 debounce 추가  필요
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
        transition: `transform ${delay / 1000}s ease 0s`,
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
