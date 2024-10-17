"use client";
import { API } from "@/lib/dataFetching";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/utils/classes.utils";

interface _ICarousel {
  images: string[];
  alt: string;
  className?: string;
}
const Carousel = ({ images, alt, className }: _ICarousel) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Automatically switch images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 5 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [images]);

  // Handle manual image switch
  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <>
      <div className={cn("relative", className)}>
        {/* Carousel arrows */}
        <button
          className={`absolute left-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-700 p-2 rounded-full ${
            images.length === 0 || currentImageIndex === 0
              ? "pointer-events-none opacity-50"
              : ""
          }`}
          onClick={handlePrevious}
        >
          <ArrowLeftIcon className="w-6 h-6 text-black dark:text-white" />
        </button>
        <button
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-700 p-2 rounded-full ${
            images.length === 0 || currentImageIndex === images.length - 1
              ? "pointer-events-none opacity-50"
              : ""
          }`}
          onClick={handleNext}
        >
          <ArrowRightIcon className="w-6 h-6 text-black dark:text-white" />
        </button>

        {/* Image */}
        <Image
          src={
            images.length > 0
              ? `${API}/image/${images[currentImageIndex]}`
              : "/No+Image.png"
          }
          alt={alt}
          width={600}
          height={400}
          priority={images.length > 0 ? true : false}
          className="w-full h-[28rem] rounded-lg"
        />
      </div>
      {/* Optional: Image indicators (dots) */}
      <div className={cn("flex justify-center gap-2 mt-2", className)}>
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentImageIndex === index
                ? "bg-blue-500"
                : "bg-gray-300 dark:bg-gray-600"
            }`}
          />
        ))}
      </div>
    </>
  );
};

export default Carousel;
