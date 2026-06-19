import { Link } from "react-router-dom";

const ProductActions = () => {
  return (
    <div className="flex flex-col gap-2 w-full">

      {/* EDIT BUTTON */}
      <Link
        to="/edit"
        className="inline-block w-full text-center shadow-md text-sm bg-gray-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-gray-600 hover:cursor-pointer"
      >
        Edit
      </Link>

      {/* DELETE BUTTON */}
      <button
        className="inline-block w-full text-center shadow-md text-sm bg-red-600 text-white rounded-sm px-4 py-1 font-bold hover:bg-red-500 hover:cursor-pointer"
        onClick={() => {
          console.log("Delete clicked");
          // later you will call API here
        }}
      >
        Delete
      </button>

    </div>
  );
};

export default ProductActions;