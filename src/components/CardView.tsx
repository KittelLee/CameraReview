import { ViewProps } from "../types/Review";
import { Link } from "react-router-dom";

function CardView({ data = [] }: ViewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item) => (
        <Link to={`/detail/${item.id}`} key={item.id}>
          <div key={item.id} className="border rounded-lg p-4 shadow">
            <h2 className="text-xl">{item.title}</h2>
            <p>{item.content}</p>
            <p>{item.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CardView;
