import { useState } from "react";

const DivWithColors = () => {
  const [isHovering, setIsHovering] = useState({
    topLeft: false,
    topRight: false,
    bottomLeft: false,
    bottomRight: false,
  });

  const handleMouseEnter = (area) => {
    console.log(`Mouse entered ${area} area`);
    setIsHovering((prevState) => ({
      ...prevState,
      [area]: true,
    }));
  };

  const handleMouseLeave = (area) => {
    setIsHovering((prevState) => ({
      ...prevState,
      [area]: false,
    }));
  };

  return (
    <div className="container1">
      <div
        className="color-div"
        style={{ backgroundColor: isHovering.topLeft ? 'red' : 'transparent' }}
        onMouseEnter={() => handleMouseEnter('topLeft')}
        onMouseLeave={() => handleMouseLeave('topLeft')}
      ></div>
      <div
        className="color-div"
        style={{ backgroundColor: isHovering.topRight ? 'green' : 'transparent' }}
        onMouseEnter={() => handleMouseEnter('topRight')}
        onMouseLeave={() => handleMouseLeave('topRight')}
      ></div>
      <div
        className="color-div"
        style={{ backgroundColor: isHovering.bottomLeft ? 'purple' : 'transparent' }}
        onMouseEnter={() => handleMouseEnter('bottomLeft')}
        onMouseLeave={() => handleMouseLeave('bottomLeft')}
      ></div>
      <div
        className="color-div"
        style={{ backgroundColor: isHovering.bottomRight ? 'pink' : 'transparent' }}
        onMouseEnter={() => handleMouseEnter('bottomRight')}
        onMouseLeave={() => handleMouseLeave('bottomRight')}
      ></div>
    </div>
  );
};
