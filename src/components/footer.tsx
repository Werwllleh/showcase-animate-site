

const Footer = () => {

  const currentYear = new Date().getFullYear()

  return (
    <div className="mt-auto pt-4 pb-6 bg-gray-800/80">
      <div className="flex items-center justify-center gap-1 text-white/35 sm:text-xl tracking-widest">
        <span>©</span>
        <span>{currentYear}</span>
      </div>
    </div>
  );
};

export default Footer;