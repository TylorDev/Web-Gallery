import { useState, useEffect, useRef} from "react";
import "./App.scss";
import { images } from "./images";
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

  //var a = -30;
  var a = -rotation.x; //-30
  var b =  rotation.y; //+30
  const cubo = {

    transform: `rotateX(${a}deg) rotateY(${b}deg) `,
    
  };

  







  





  return (
    <div id="canvas">
      <div ref={containerRef} className="container">
   
        {images.map(image =>(

            
            <Objeto3d key={image.id } rotateX={a} rotateY={b}  anchor={{x:50, y:50}}img={image.imageUrl} cover={image.coverUrl}></Objeto3d>

        ))}
      </div>

      <button style={{backgroundColor: `${false? "green": "red"}`}}   onClick={toggleScrollTracking} >
        {false ? 'Desactivar Seguimiento de Scroll' : 'Activar Seguimiento de Scroll'}
      </button>
 
    </div>
  );
};



export const Objeto3d = ({ rotateX, rotateY,  anchor={x:50, y:50}, img, cover, }) => {




  const divStyle = {
    transformOrigin: `${anchor.x}% ${anchor.y}%`,
    transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    
  };
  


  return (
    
      <div className="objecto3d" style={divStyle}  > 
       
       <div className="centro">
        <div
            className="anchor"
            style={{ left: `${anchor.x}%`, top: `${anchor.y}%` }}
          ></div>
          <div
            className="anchor2"
            style={{ left: `${anchor.x}%`, top: `${anchor.y}%` }}
          ></div>
          <div
            className="anchor3"
            style={{ left: `${anchor.x}%`, top: `${anchor.y}%` }}
          ></div>
       </div>
    
        
        <div className="face front"  >
          <img className="marco" src={cover} alt="" />
        </div>
       
        <div className="face back" >

        <img className="foto" src={img} alt="" />
        </div>

      
      </div>
    
  );
};


























