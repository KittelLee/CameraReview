interface FilterModalProps {
  onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">필터 옵션</h2>
        <button className="bg-blue-500 text-white rounded-lg px-4 py-2 mr-2">
          같은 카메라 브랜드
        </button>
        <button className="bg-blue-500 text-white rounded-lg px-4 py-2 mr-2">
          같은 급
        </button>
        <button
          className="mt-4 bg-red-500 text-white rounded-lg px-4 py-2"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
