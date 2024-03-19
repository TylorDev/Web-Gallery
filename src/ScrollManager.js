const [isdragging, setIsDragging] = useState(false);
const [scrollPosition, setScrollPosition] = useState(0);
const [scrollMaxPosition, setScrollMaxPosition] = useState(0);
const [position, setPosition] = useState({ x: 0, y: 0 });
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
  document.addEventListener("mousedown", handleMouseDown);

  return () => {
    document.removeEventListener("mouseup", handleMouseUp);
    document.removeEventListener("mousedown", handleMouseDown);
  };
}, []);

//Obtiene el valor actual del scroll
useEffect(() => {
  const container = containerRef.current;

  const updateScrollPosition = () => {
    const currentPosition = container.scrollLeft;

    setScrollPosition(currentPosition);
  };

  container.addEventListener("scroll", updateScrollPosition);

  return () => {
    container.removeEventListener("scroll", updateScrollPosition);
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
    const scrollMaxValue =
      containerRef.current.scrollWidth - containerRef.current.clientWidth;
    setScrollMaxPosition(scrollMaxValue);

    setPosition({ x: mouseX, y: mouseY });
  };

  window.addEventListener("mousemove", handleMouseMove);
  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
  };
}, []);
