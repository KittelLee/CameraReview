import { useState, useEffect } from "react";

interface Camera {
  id: string;
  brand: string;
  title: string;
  content: string;
  price: string;
}

interface FilterModalProps {
  onClose: () => void;
  onApply: (filters: string[], sortOption: string) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ onClose, onApply }) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedSortOption, setSelectedSortOption] = useState<string>("");
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // 추가

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/camera`);
        const data = await response.json();
        setCameras(data.camera);
        setIsLoading(false); // 데이터 로딩 완료 후 상태 변경
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // 에러 발생 시에도 상태 변경
      }
    };

    fetchData();
  }, []);

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

  const filteredCameras = cameras
    ? cameras.filter((camera: Camera) => selectedFilters.includes(camera.brand))
    : [];

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
      {/* 로딩 중이면 로딩 메시지 표시 */}
      {isLoading ? (
        <div className="bg-white rounded-lg p-6 w-1/2">
          <h2 className="text-lg font-bold mb-4">로딩 중...</h2>
        </div>
      ) : (
        // 로딩이 완료되면 카메라 목록 표시
        <div className="bg-white rounded-lg p-6 w-1/2">
          <h2 className="text-lg font-bold mb-4">선택된 브랜드 카메라 목록</h2>
          <ul>
            {filteredCameras &&
              filteredCameras.map((camera) => (
                <li key={camera.id}>
                  <p>{camera.title}</p>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterModal;
