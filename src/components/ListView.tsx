import { ViewProps } from "../types/Review";
import { Link } from "react-router-dom";

function ListView({
  data = [],
  searchTerm,
}: ViewProps & { searchTerm: string }) {
  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
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
