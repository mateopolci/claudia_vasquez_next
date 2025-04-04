"use client";

import React from "react";

interface GridSkeletonProps {
  title?: string;
  count?: number;
}

function GridSkeleton({ title = "Portfolio", count = 25 }: GridSkeletonProps) {
  const placeholders = Array.from({ length: count }, (_, i) => i);

  return (
    <div className="container mx-auto px-4">
      {title && (
        <div className="w-full flex justify-center items-center">
          <h1 className="text-3xl font-bold mt-8 mb-8">{title}</h1>
        </div>
      )}
      <div className="p-22">
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
        >
          {placeholders.map((placeholder) => (
            <li key={placeholder} className="relative">
              <div className="skeleton-item group block w-full aspect-square rounded-lg overflow-hidden" />
              <div className="skeleton-item mt-2 h-4 rounded w-3/4" />
              <div className="skeleton-item mt-1 h-4 rounded w-1/2" />
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -468px 0;
          }
          100% {
            background-position: 468px 0;
          }
        }

        .skeleton-item {
          background: linear-gradient(
            to right,
            #f0f0f0 8%,
            #e0e0e0 18%,
            #f0f0f0 33%
          );
          background-color: #f5f5f5;
          background-size: 800px 104px;
          position: relative;
          animation-duration: 1.5s;
          animation-fill-mode: forwards;
          animation-iteration-count: infinite;
          animation-name: shimmer;
          animation-timing-function: linear;
        }
      `}</style>
    </div>
  );
}

export default GridSkeleton;