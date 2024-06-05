import { useState } from "react";

interface FilterModalProps {
  onClose: () => void;
  onApply: (filters: string[], sortOption: string) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ onClose, onApply }) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedSortOption, setSelectedSortOption] = useState<string>("");

  const handleFilterChange = (brand: string) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(brand)
        ? prevFilters.filter((filter) => filter !== brand)
        : [...prevFilters, brand]
    );
  };

  const handleSortChange = (option: string) => {
    setSelectedSortOption(option);
  };

  const handleApply = () => {
    onApply(selectedFilters, selectedSortOption);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-1/2">
        <h2 className="text-lg font-bold mb-4">필터 옵션</h2>
        <ul>
          {[
            "캐논",
            "소니",
            "니콘",
            "후지필름",
            "리코",
            "시그마",
            "핫셀블라드",
          ].map((brand) => (
            <li key={brand}>
              <input
                type="checkbox"
                checked={selectedFilters.includes(brand)}
                onChange={() => handleFilterChange(brand)}
              />
              <span className="ml-1">{brand}</span>
            </li>
          ))}
        </ul>
        <h2 className="text-lg font-bold my-4">정렬 옵션</h2>
        {["가격높은순", "가격낮은순", "이름순"].map((option) => (
          <button
            key={option}
            className={`bg-blue-500 text-white rounded-lg px-4 py-2 mr-2 mt-1 ${
              selectedSortOption === option ? "bg-blue-700" : ""
            }`}
            onClick={() => handleSortChange(option)}
          >
            {option}
          </button>
        ))}
        <div className="mt-4">
          <button
            className="bg-green-500 text-white rounded-lg px-4 py-2 mr-2"
            onClick={handleApply}
          >
            확인
          </button>
          <button
            className="bg-red-500 text-white rounded-lg px-4 py-2"
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
