import { useState } from "react";
import FilterModal from "./FilterModal";

function Navbar() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const handleFilterButtonClick = () => {
    setIsFilterModalOpen(true);
  };

  const closeFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  return (
    <>
      <div className="flex bg-yellow-b items-center h-12">
        <button
          className="ml-36 bg-white text-brown-a rounded-xl px-2 py-1 hover:bg-yellow-100"
          onClick={handleFilterButtonClick}
        >
          필터 & 정렬 옵션 ▼
        </button>
      </div>
      {isFilterModalOpen && <FilterModal onClose={closeFilterModal} />}
    </>
  );
}

export default Navbar;
