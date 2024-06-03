import { useState } from "react";
import SortModal from "./SortModal";
import FilterModal from "./FilterModal";

function Navbar() {
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleSortButtonClick = () => {
    setIsSortModalOpen(true);
  };

  const closeSortModal = () => {
    setIsSortModalOpen(false);
  };

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
          className="ml-52 bg-white text-brown-a rounded-xl px-2 py-1 hover:bg-yellow-100"
          onClick={handleFilterButtonClick}
        >
          필터▼
        </button>
        <button
          className="ml-2 bg-white text-brown-a rounded-xl px-2 py-1 hover:bg-yellow-100"
          onClick={handleSortButtonClick}
        >
          정렬▼
        </button>
      </div>
      {isSortModalOpen && <SortModal onClose={closeSortModal} />}
      {isFilterModalOpen && <FilterModal onClose={closeFilterModal} />}
    </>
  );
}

export default Navbar;
