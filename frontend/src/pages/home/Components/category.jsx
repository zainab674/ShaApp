import React, { useRef, useState, useEffect } from 'react';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';


import Menu from '../../../objects/category';
import CardsContainer from './cards';








function Category() {

    const scrollContainerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [scrolled, setScrolled] = useState(false);

    const scrollLeft = () => {
        console.log("working")
        scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);

    };

    useEffect(() => {
        const checkScrollPosition = () => {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
        };

        // Initial check
        checkScrollPosition();

        // Add event listener to track scroll position
        const container = scrollContainerRef.current;
        container.addEventListener('scroll', checkScrollPosition);

        return () => {
            container.removeEventListener('scroll', checkScrollPosition);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 1) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <>
            <div

                className={`${scrolled ? "top-14 pt-5 md:pt-10 pb-5" : "md:top-44 lg:top-40 top-16"
                    } fixed z-40 bg-white py-4 w-full flex items-center px-4 md:px-10`}

            >
                {canScrollLeft && (
                    <button
                        onClick={scrollLeft}
                        className="hidden absolute left-0 z-10 p-2 md:flex lg:flex"
                    >
                        <IoIosArrowDropleft className="text-gray-500 text-4xl" />
                    </button>
                )}

                {/* Scrollable Menu */}
                <div className="flex-1 flex overflow-hidden mx-2 md:mx-10 relative">
                    <ul
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto scrollbar-hide space-x-4 md:space-x-6"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Hide scrollbar for Firefox & IE
                    >
                        {Menu.map((item) => (
                            <li
                                key={item.id}
                                className={`flex flex-col items-center px-4 whitespace-nowrap cursor-pointer text-sm  ${selectedCategory === item.type
                                    ? "border-b-2 border-gray-600 pb-1"
                                    : "hover:border-b-2 hover:border-gray-300 hover:pb-1"
                                    }`}
                                onClick={() => handleCategoryClick(item.type)}
                            >
                                <item.icon className="text-xl md:text-xl text-gray-600" />
                                <span className="text-gray-600">{item.type}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right arrow button (visible only if scrolling is possible) */}
                {canScrollRight && (
                    <button
                        onClick={scrollRight}
                        className="hidden absolute right-0 z-10 p-2 md:flex lg:flex"
                    >
                        <IoIosArrowDropright className="text-gray-500 text-4xl" />
                    </button>
                )}
            </div >

            <CardsContainer selectedCategory={selectedCategory} />
        </>

    );
}







export default Category;

