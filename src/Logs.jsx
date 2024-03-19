export function Logs({
  isdragging,
  scrollPosition,
  scrollMaxPosition,
  position,
}) {
  return (
    <div className="Logs">
      <p style={{ backgroundColor: `${isdragging ? "red" : "green"}` }}>
        {" "}
        {isdragging ? "ME ESTAN ARRASTRANDO!" : "YA NO!"}
      </p>

      <p style={{ color: "white" }}>
        Posición actual del scroll: {scrollPosition} /{" "}
        {Math.floor(
          (scrollPosition / scrollMaxPosition) *
            ((scrollMaxPosition * 100) / window.innerWidth)
        )}
        %
        <br /> y el valor maximo es {scrollMaxPosition} <br />
        ValorMaxObsoluto: {(scrollMaxPosition * 100) / window.innerWidth}
        mouseX: {position.x}
      </p>
    </div>
  );
}
