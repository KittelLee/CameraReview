import { ViewProps } from "../types/Review";
import { Link } from "react-router-dom";

interface ListViewProps extends ViewProps {
  searchTerm: string;
}

function ListView({ data = [], searchTerm }: ListViewProps) {
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filteredData.map((item) => (
        <Link to={`/detail/${item.id}`} key={item.id}>
          <div key={item.id} className="border-b border-gray-300 py-2">
            <h2 className="text-xl">{item.title}</h2>
            <p>{item.content}</p>
            <p>{item.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ListView;
