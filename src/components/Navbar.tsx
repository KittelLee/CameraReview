function Navbar() {
  return (
    <>
      <div className="flex bg-yellow-b items-center h-12">
        <button className="ml-52 bg-white text-brown-a rounded-xl px-2 py-1 hover:bg-yellow-100">
          카테고리▼
        </button>
        <button className="ml-2 bg-white text-brown-a rounded-xl px-2 py-1 hover:bg-yellow-100">
          정렬▼
        </button>
      </div>
    </>
  );
}

export default Navbar;
