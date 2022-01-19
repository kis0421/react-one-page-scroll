import React from "react";
import FullPageScrollWrapper from "./FullPageScrollWrapper";


const App = () => {
  return (
    <>
      <FullPageScrollWrapper 
        delay={1000}
        loop={true}
      >
        <div>first</div>
        <div>second</div>
        <div>third</div>        
        <button>bye~</button>
      </FullPageScrollWrapper>
    </>
  );
}

export default App;
