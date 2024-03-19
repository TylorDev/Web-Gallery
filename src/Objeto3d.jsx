import { useState, useRef, useEffect } from "react";

/* eslint-disable react/prop-types */
export const Objeto3d = ({
  rotateX,
  rotateY,
  anchor = { x: 50, y: 50 },
  img,
  cover,
}) => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setTimeout(() => {
        setIsHovered(false);
      }, 0);
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const divStyle = (hover) => {
    return {
      transformOrigin: `${anchor.x}% ${anchor.y}%`,
      transform: `perspective(1000px) rotateX(${
        hover ? rotateX : 0
      }deg) rotateY(${hover ? rotateY : 0}deg)`,
      // outline: `7px solid ${hover ? "red" : "green"}`,
      transition: `transform ${hover ? 0.1 : 2}s `,
    };
  };

  return (
    <div className="objecto3d" style={divStyle(isHovered)} ref={containerRef}>
      <div className="face front">
        <img className="marco" src={cover} alt="" />
      </div>

      <div className="face back">
        <img className="foto" src={img} alt="" />
      </div>
    </div>
  );
};
