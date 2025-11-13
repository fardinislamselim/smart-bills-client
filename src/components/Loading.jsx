import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../lotties/loading.json";
const Loading = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center min-h-screen bg-base-200 px-4">
      <div className="w-48 h-48">
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
      <p className="text-gray-700 dark:text-gray-300 mt-4 text-lg font-medium text-center">
        Loading, please wait...
      </p>
    </div>
  );
};

export default Loading;
