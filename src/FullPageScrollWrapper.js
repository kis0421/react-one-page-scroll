import React from "react";

const FullPageScrollWrapper = (props) => {
    console.log(props)
    return (
        <div>
            {props.children.map((element, index) => (
                <div key={index}>{element}</div>
            ))}
        </div>
    );
}

export default FullPageScrollWrapper;
