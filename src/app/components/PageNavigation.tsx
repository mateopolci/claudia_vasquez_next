"use client";

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface PageNavigationProps {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  } | null;
}

function PageNavigation({ pagination }: PageNavigationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  if (!pagination) {
    return null;
  }
  
  const currentPage = pagination.page;
  const totalPages = pagination.pageCount;
  
  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    return `?${params.toString()}`;
  };

  const getPageNumbers = () => {
    const pages = [];
    
    pages.push(1);
    
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (!pages.includes(i)) pages.push(i);
    }
    
    if (totalPages > 1 && !pages.includes(totalPages)) {
      if (totalPages > pages[pages.length - 1] + 1) {
        pages.push(-1);
      }
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className='p-4'>
      <nav className="border-t border-gray-200 flex items-center justify-between sm:px-0">
        <div className="-mt-px w-0 flex-1 flex justify-start mx-2 sm:mx-8">
          {currentPage > 1 && (
            <a 
              href={createPageURL(currentPage - 1)} 
              className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-black-500 hover:text-black-700 hover:border-claudiapurple"
            >
              <svg className="mr-3 h-5 w-5 text-black-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              <span className="hidden sm:inline">Previous</span>
            </a>
          )}
        </div>
        
        <div className="-mt-px flex">
          {pageNumbers.map((pageNumber, index) => {
            if (pageNumber === -1) {
              return (
                <span key={`ellipsis-${index}`} className="border-transparent text-black-500 border-t-2 pt-4 px-2 sm:px-4 inline-flex items-center text-sm font-medium">
                  ...
                </span>
              );
            }
            
            return (
              <a 
                key={pageNumber}
                href={createPageURL(pageNumber)}
                className={`${
                  pageNumber === currentPage
                    ? "border-black text-black"
                    : "border-transparent text-black-500 hover:text-black-700 hover:border-claudiapurple"
                } border-t-2 pt-4 px-2 sm:px-4 inline-flex items-center text-sm font-medium`}
                aria-current={pageNumber === currentPage ? "page" : undefined}
              >
                {pageNumber}
              </a>
            );
          })}
        </div>
        
        <div className="-mt-px w-0 flex-1 flex justify-end mx-2 sm:mx-8">
          {currentPage < totalPages && (
            <a 
              href={createPageURL(currentPage + 1)} 
              className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-black-500 hover:text-black-700 hover:border-claudiapurple"
            >
              <span className="hidden sm:inline">Next</span>
              <svg className="ml-3 h-5 w-5 text-black-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          )}
        </div>
      </nav>
    </div>
  )
}

export default PageNavigation