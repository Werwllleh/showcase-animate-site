
const Hero = () => {
  return (
    <div className="relative h-dvh flex items-center justify-center">
      <div className="relative flex p z-1">
        <p className="shadow-indigo-950 font-bold text-white text-8xl">ICELAND</p>
      </div>
      <div className="absolute -z-0 inset-0 w-full h-full shading">
        <img fetchPriority="high"
             src="https://globatur.travel/wp-content/uploads/2026/02/islandia-1.jpg"
             alt="Hero banner"
             className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;
