import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <ClipLoader color="#4F46E5" size={80} />
    </div>
  );
};

export default Loader;
