import { ViewProps } from "../types/Review";

function ListView({ data = [] }: ViewProps) {
  return (
    <div>
      {data.map((item) => (
        <div key={item.id} className="border-b border-gray-300 py-2">
          <h2 className="text-xl">{item.title}</h2>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
}
export default ListView;
