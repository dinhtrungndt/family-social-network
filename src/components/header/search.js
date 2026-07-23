import { useEffect, useRef, useState } from "react";
import { IoIosClose, IoMdArrowBack } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import { IMAGE } from '../../constants/image/IMAGE';

const Search = () => {
  const [activateSearch, setActiveSearch] = useState(false);
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  const searchRef = useRef(null);
  const expandedInputRef = useRef(null);
  const sharedInputClass = "w-full h-11 rounded-2xl border-none focus:outline-none text-gray-500 px-4";

  const openSearch = () => {
    setShowSearchPanel(true);
  };

  const closeSearch = () => {
    setActiveSearch(false);
    window.setTimeout(() => {
      setShowSearchPanel(false);
    }, 180);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        closeSearch();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!showSearchPanel) {
      return undefined;
    }

    const frame = window.requestAnimationFrame(() => {
      setActiveSearch(true);
      expandedInputRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [showSearchPanel]);

  return (
    <div
      ref={searchRef}
      className="relative flex w-[320px] items-center space-x-2 bg-white border rounded-2xl px-4 border-gray-300"
      onClick={openSearch}
    >
      <IoSearchSharp className="text-gray-400" />
      <input
        type="text"
        placeholder="Tìm kiếm trên diễn đàn..."
        readOnly
        onFocus={openSearch}
        className={`${sharedInputClass} flex-1 pl-0 cursor-pointer bg-transparent`}
      />
      {
        showSearchPanel && (
          <div
            className={`absolute -left-2 top-0 w-[420px] p-3 bg-white border z-10 border-b-gray-200 rounded-2xl shadow-xl transform transition-all duration-200 ease-out origin-top-left ${activateSearch ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
              }`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center space-x-2">
              <IoMdArrowBack className="text-gray-600 cursor-pointer" onClick={closeSearch} size={24} />
              <input
                ref={expandedInputRef}
                type="text"
                placeholder="Tìm kiếm trên diễn đàn..."
                className={`${sharedInputClass} bg-gray-100`}
              />
            </div>
            <div className="flex justify-between mt-2">
              <p className="font-medium">Mới đây</p>
              <p className="text-blue-600 cursor-pointer hover:underline">Chỉnh sửa</p>
            </div>
            <div className="flex items-center space-x-2 mt-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md justify-between">
              <div className="flex items-center space-x-2">
                <img src={IMAGE.LOGO} alt="Avatar" className="w-8 h-1w-8" />
                <p className="text-gray-600">Nguyễn Văn A</p>
              </div>
              <IoIosClose
                className="text-gray-400 ml-auto cursor-pointer rounded-full border-gray-200 "
                size={24}
              />
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Search;
