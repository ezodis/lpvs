import React from 'react';

interface HeaderProps {
  isScrolled: boolean;
  scrollToSlide: (index: number) => void;
  scrollToFirstSlide: () => void;
}

const Header: React.FC<HeaderProps> = ({ isScrolled, scrollToSlide, scrollToFirstSlide }) => {
  return (
    <header
      className="fixed top-0 left-0 w-full z-50 flex items-center px-5 py-4 bg-[rgba(255,255,250,0.9)] shadow-md transition-all"
    >
      {/* Left Navigation */}
      <nav className="flex items-center gap-4">
        <button
          onClick={() => scrollToSlide(1)}
          className="px-2 py-1 bg-pink-600 text-white rounded hover:bg-pink-400 transition cursor-pointer text-xs sm:text-sm sm:px-3 sm:py-2 lg:text-lg lg:px-6 lg:py-3"
        >
          Que senos haga costumbre
        </button>
      </nav>

      {/* Right Navigation */}
      <nav className="ml-auto flex items-center gap-4">
        <button
          onClick={() => scrollToSlide(2)}
          className="px-2 py-1 bg-pink-600 text-white rounded hover:bg-pink-400 transition cursor-pointer text-xs sm:text-sm sm:px-3 sm:py-2 lg:text-lg lg:px-6 lg:py-3"
        >
          Conócenos
        </button>

        <button
          onClick={() => scrollToSlide(3)}
          className="px-2 py-1 bg-pink-600 text-white rounded hover:bg-pink-400 transition cursor-pointer text-xs sm:text-sm sm:px-3 sm:py-2 lg:text-lg lg:px-6 lg:py-3"
        >
          Donar
        </button>
      </nav>
    </header>
  );
};

export default Header;