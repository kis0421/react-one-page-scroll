import React from "react";
import FullPageScrollWrapper from "./FullPageScrollWrapper";


const App = () => {
  return (
    <>
      <FullPageScrollWrapper 
        delay={3000}
        loop={true}
      >
        <div>하나</div>
        <div>둘</div>
        <div>셋</div>        
        <button>킄크크</button>
      </FullPageScrollWrapper>
    </>
  );
}

export default App;
