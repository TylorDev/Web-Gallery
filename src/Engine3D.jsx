import { useState, useEffect } from "react";
import { RotatingDiv } from "./App";

const Engine3D = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  var maxDeg = 88;
  var negX = Math.floor((mousePosition.x * 180) / window.innerWidth) - 90;
  var negY = Math.floor((mousePosition.y * 180) / window.innerHeight) - 90;

  var posX = negX <= -maxDeg || negX >= maxDeg ? 0 : negX;

  var posY = negY <= -maxDeg || negY >= maxDeg ? 0 : negY;

  var PorcentajeX = (mousePosition.x / window.innerWidth) * 100;
  var bandera = PorcentajeX > 50 ? "true" : "false";

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div
        style={{
          fontSize: `33px`,
          color: "red",
          textAlign: "center",
          border: "1px solid white",
        }}
      >
        Porcentaje: <strong>[{Math.floor(PorcentajeX)}%] </strong>
        Bandera: [{bandera}] X-Neg:[{negX}] Y-Neg:[{negY}]
      </div>

      <RotatingDiv rotateX={-posY} rotateY={posX}></RotatingDiv>
    </>
  );
};
