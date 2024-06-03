interface FilterModalProps {
  onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-1/2">
        <h2 className="text-lg font-bold mb-4">필터 옵션</h2>
        <ul>
          <li>
            <input type="checkbox" />
            <span className="ml-1">캐논</span>
          </li>
          <li>
            <input type="checkbox" />
            <span className="ml-1">소니</span>
          </li>
          <li>
            <input type="checkbox" />
            <span className="ml-1">니콘</span>
          </li>
          <li>
            <input type="checkbox" />
            <span className="ml-1">후지필름</span>
          </li>
          <li>
            <input type="checkbox" />
            <span className="ml-1">리코</span>
          </li>
          <li>
            <input type="checkbox" />
            <span className="ml-1">시그마</span>
          </li>
          <li>
            <input type="checkbox" />
            <span className="ml-1">핫셀블라드</span>
          </li>
        </ul>
        <button className="bg-blue-500 text-white rounded-lg px-4 py-2 mr-2 mt-1">
          확인
        </button>

        <h2 className="text-lg font-bold my-4">정렬 옵션</h2>
        <button className="bg-blue-500 text-white rounded-lg px-4 py-2 mr-2">
          가격높은순
        </button>
        <button className="bg-blue-500 text-white rounded-lg px-4 py-2 mr-2">
          가격낮은순
        </button>
        <button className="bg-blue-500 text-white rounded-lg px-4 py-2 mr-2">
          이름순
        </button>
        <button className="bg-blue-500 text-white rounded-lg px-4 py-2 mr-2">
          등급순
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
