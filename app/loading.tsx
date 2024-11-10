import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex space-x-6">
        {/* Box 1 */}
        <div className={`w-8 h-8 rounded-md animate-bounce delay-100 bg-sky-600`} />
        {/* Box 2 */}
        <div className={`w-8 h-8 rounded-md animate-bounce delay-500 bg-sky-600`} />
        {/* Box 3 */}
        <div className={`w-8 h-8 rounded-md animate-bounce delay-700 bg-sky-600`} />
      </div>
    </div>
  );
}
