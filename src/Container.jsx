import { useState, useEffect, useRef } from "react";
import { images } from "./images.js";
import { Objeto3d } from "./Objeto3d.jsx";

export const Container = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  //Obtiene la posicion de mouse y lo conviente en grados.
  useEffect(() => {
    const handleMouseMove = (e) => {
      const container = containerRef.current;
      if (!container) return;

      const { left, top, width, height } = container.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const angleXDeg = Math.atan2(e.clientY - centerY, 300) * (180 / Math.PI);
      const angleYDeg = Math.atan2(e.clientX - centerX, 300) * (180 / Math.PI);

      setRotation({ x: angleXDeg, y: angleYDeg });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  var a = -rotation.x; //-30
  var b = rotation.y; //+30

  return (
    <div id="canvas">
      <div
        ref={containerRef}
        className="container" /* onMouseMove={handleMouseMove} */
      >
        {images.map((image) => (
          <Objeto3d
            key={image.id}
            rotateX={a}
            rotateY={b}
            anchor={{ x: 50, y: 50 }}
            img={image.imageUrl}
            cover={image.coverUrl}
          ></Objeto3d>
        ))}
      </div>
    </div>
  );
};
