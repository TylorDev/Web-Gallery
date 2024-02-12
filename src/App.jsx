import { useState, useEffect, useRef } from "react";
import "./App.scss";
import { images } from "./images.js";
useState;
function App() {
  return (
    <>
      <div>
        <Container></Container>
      </div>
    </>
  );
}

export default App;

const Container = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

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




  //obtiene la posicion actual de mouse xd
  useEffect(() => {
    const handleMouseMove = (e) => {
      const container = containerRef.current;
      if (!container) return;
      const { left, top } = container.getBoundingClientRect();
      const mouseX = e.clientX - left;
      const mouseY = e.clientY - top;
      const scrollMaxValue = containerRef.current.scrollWidth - containerRef.current.clientWidth;
      setScrollMaxPosition(scrollMaxValue);
      
      setPosition({ x: mouseX, y: mouseY });
    };




    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const [isdragging, setIsDragging] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollMaxPosition, setScrollMaxPosition] = useState(0);


  //Avisa si estas haciendo drag en la pantalla
  useEffect(() => {
    const handleMouseDown = () => {
      console.log("¡Me están arrastrando!");
      setIsDragging(true);
    };
    
    const handleMouseUp = () => {
      console.log("¡Estoy a salvo!");
      setIsDragging(false);
    };
  
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousedown", handleMouseDown)
  
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  },[]);

 
//Obtiene el valor actual del scroll
  useEffect(() => {
    const container = containerRef.current;

    const updateScrollPosition = () => {
      
      const currentPosition = container.scrollLeft;
    
     
      setScrollPosition(currentPosition);

    };

    container.addEventListener('scroll', updateScrollPosition);

    return () => {
      container.removeEventListener('scroll', updateScrollPosition);
    };
  }, []);


  const handleMouseMove = () => {
       // posision.X es la posicion actual del mouse, scrollMaxPosition es el valor maximo de scrollLeft, scrollPosition, es la posicion actual del scroll left.  windows.innerWidth, es el ancho de la pantalla. 
   
      const newPosition = 0;
      // Asigna el nuevo valor de scrollLeft al contenedor
      containerRef.current.scrollLeft = newPosition;
    
  
  };
  


  var a = -rotation.x; //-30
  var b = rotation.y; //+30

  return (
    <div id="canvas">
      <div ref={containerRef} className="container" /* onMouseMove={handleMouseMove} */>
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
      <p style={{backgroundColor:`${isdragging?"red":"green"}`}}> {isdragging?"ME ESTAN ARRASTRANDO!":"YA NO!"}</p>




      <p style={{color:"white"}}>Posición actual del scroll: {scrollPosition} / {Math.floor(scrollPosition/scrollMaxPosition*(scrollMaxPosition*100/window.innerWidth))}%
      <br/> y el valor maximo es {scrollMaxPosition} <br /> 
      ValorMaxObsoluto: {(scrollMaxPosition*100/window.innerWidth)}
      mouseX: {(position.x)}
      
      </p>


    </div>
  );
};

export const Objeto3d = ({
  rotateX,
  rotateY,
  anchor = { x: 50, y: 50 },
  img,
  cover,
}) => {

  const divStyle = {
    transformOrigin: `${anchor.x}% ${anchor.y}%`,
    transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
  };
  
  
  return (
    <div
      className="objecto3d"
      style={divStyle}
    >
      <div className="face front">
        <img className="marco" src={cover} alt="" />
      </div>

      <div className="face back">
        <img className="foto" src={img} alt="" />
      </div>
    </div>
  );
};
