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
    <div className="objecto3d" style={divStyle}>
      <div className="face front">
        <img className="marco" src={cover} alt="" />
      </div>

      <div className="face back">
        <img className="foto" src={img} alt="" />
      </div>
    </div>
  );
};
