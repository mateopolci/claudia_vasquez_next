import React from 'react'

function PageNavigation() {
  return (
    <div className='p-4'>
        <nav className="border-t border-gray-200 flex items-center justify-between sm:px-0">
            <div className="-mt-px w-0 flex-1 flex justify-start mx-8">
                <a href="#" className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-black-500 hover:text-black-700 hover:border-gray-300">
                <svg className="mr-3 h-5 w-5 text-black-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                </a>
            </div>
            <div className="hidden md:-mt-px md:flex">
                <a href="#" className="border-transparent text-black-500 hover:text-black-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"> 1 </a>
                <a href="#" className="border-black text-black border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium" aria-current="page"> 2 </a>
                <a href="#" className="border-transparent text-black-500 hover:text-black-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"> 3 </a>
                <span className="border-transparent text-black-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"> ... </span>
                <a href="#" className="border-transparent text-black-500 hover:text-black-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"> 8 </a>
                <a href="#" className="border-transparent text-black-500 hover:text-black-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"> 9 </a>
                <a href="#" className="border-transparent text-black-500 hover:text-black-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"> 10 </a>
            </div>
            <div className="-mt-px w-0 flex-1 flex justify-end mx-8">
                <a href="#" className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-black-500 hover:text-black-700 hover:border-gray-300">
                <svg className="ml-3 h-5 w-5 text-black-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                </a>
            </div>
        </nav>
    </div>
  )
}

export default PageNavigation