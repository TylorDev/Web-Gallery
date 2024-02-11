import { useState, useEffect, useRef} from "react";
import "./App.scss";
useState;
function App() {
  return (
    <>
      <div>
        <h1>Efecto de seguimiento del mouse con perspectiva 3D</h1>

        <Container></Container>
        
        <MouseTracker></MouseTracker>
      </div>
    </>
  );
}

export default App;


const Container = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const container = document.getElementById("container");
      const { left, top, width, height } = container.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const angleXRad = Math.atan2(e.clientY - centerY, 300);
      const angleYRad = Math.atan2(e.clientX - centerX, 300);
      const angleXDeg = angleXRad * (180 / Math.PI);
      const angleYDeg = angleYRad * (180 / Math.PI);
      setRotation({ x: angleXDeg, y: angleYDeg });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  //var a = -30;
  var a = -rotation.x; //-30
  var b = rotation.y; //+30
  var c = 0;
  var d = -b;
  var e = -a;

  return (
    <div id="container">
      <div className="container">
        <RotatingDiv id="1" rotateX={a} rotateY={b} numero={1}></RotatingDiv>
        <RotatingDiv id="2" rotateX={a} rotateY={b} numero={2}></RotatingDiv>
        <RotatingDiv id="3" rotateX={a} rotateY={b}></RotatingDiv>
      </div>


     
       

      
   
    </div>
  );
};

export const RotatingDiv = ({ rotateX, rotateY, numero }) => {
  const [anchor, setAnchor] = useState({ x: 0, y: 0 })
  const divStyle = {
    transformOrigin: `${anchor.x}px ${ anchor.y}px`,
    transform: `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
  };


  const handleAnchor =(x, y)=>{
    setAnchor({ x, y });
  }
  const seleccionarImagen = (numero) => {
    if (numero === 1) {
      return (
        <img
          src="https://i.pinimg.com/736x/c7/02/0f/c7020f6a8f96a6172fe197db9ed674b4.jpg"
          alt="Imagen 1"
        />
      );
    } else if (numero === 2) {
      return (
        <img
          src="https://i.pinimg.com/564x/bf/20/bd/bf20bd054e5cbf581e05230ec9d969f8.jpg"
          alt="Imagen 2"
        />
      );
    } else {
      return (
        <img
          src="https://i.pinimg.com/564x/47/f3/46/47f346e3e9bf57c301950bdbebb8d2ca.jpg"
          alt="Imagen por defecto"
        />
      );
    }
  };

  return (
    <div className="rotating-div" style={divStyle}>
      {/*seleccionarImagen(numero)*/}
    
      <ContainerWithAnchor setAnchoPos={handleAnchor}></ContainerWithAnchor>
    </div>
  );
};


const ContainerWithAnchor = ({setAnchoPos}) => {
  const parentRef = useRef(null);
  const childRef = useRef(null);
  const [localPosition, setLocalPosition] = useState({ x: 0, y: 0 });
  const [globalPosition, setGlobalPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = () => {
      if (childRef.current && parentRef.current) {
        const parentRect = parentRef.current.getBoundingClientRect();
        const childRect = childRef.current.getBoundingClientRect();
        
        const localX = childRect.left - parentRect.left;
        const localY = childRect.top - parentRect.top;
        
        const globalX = childRect.left + window.scrollX;
        const globalY = childRect.top + window.scrollY;

        setLocalPosition({ x: localX, y: localY });
        setGlobalPosition({ x: globalX, y: globalY });
       
      }
    };
   
    updatePosition();
    window.addEventListener('mousemove', updatePosition);
    return () => {
      window.removeEventListener('mousemove', updatePosition);
    };
  }, []);


  useEffect(()=>{

    setAnchoPos(localPosition.x, localPosition.y);
  },[localPosition,globalPosition])

  return (
    <div>
      <div
        ref={parentRef}
        style={{ width: '200px', height: '200px', border: '1px solid white', position: 'relative' }}
      >
        <div
          ref={childRef}
          style={{ width: '20px', height: '20px', background: 'red', position: 'absolute', top: '0px', left: '100px' }}
        ></div>
      </div>

      <div>
        Local  <br />
        X: {localPosition.x},  
        Y: {localPosition.y}
      </div>
      <div>
        Global <br />
        X:{globalPosition.x},
          Y: {globalPosition.y}
      </div>
    
    </div>
  );
};
const MouseTracker = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []); // Solo se suscribe una vez al montar el componente

  return (
    <div className="mouse-tracker" style={{ left: position.x, top: position.y, color: "white"}}>
      Posición actual: {position.x}, {position.y}
    </div>
  );
};