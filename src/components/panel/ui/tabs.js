// components/ui/tabs.js
'use client';

import React, { useRef ,useState,useEffect} from 'react';
import clsx from 'clsx';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export const Tabs = ({ value, onValueChange, children, className }) => {
  return (
    <div className={clsx('w-full', className)}>
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child;
        if (child.type.displayName === 'TabsList') {
          return React.cloneElement(child, { value, onValueChange });
        }
        if (child.props.value === value) {
          return child;
        }
        return null;
      })}
    </div>
  );
};


export const TabsList = ({ children, value, onValueChange }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -150 : 150,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative">
      {/* Left scroll button */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-white shadow rounded-full"
        >
          <FiChevronLeft />
        </button>
      )}

      {/* Scrollable tab list */}
      <div
        ref={scrollRef}
        className="flex gap-2 bg-gray-100 rounded-md p-2 overflow-x-auto no-scrollbar scroll-smooth"
      >
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;
          return React.cloneElement(child, {
            isActive: child.props.value === value,
            onClick: () => onValueChange(child.props.value),
          });
        })}
      </div>

      {/* Right scroll button */}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-white shadow rounded-full"
        >
          <FiChevronRight />
        </button>
      )}
    </div>
  );
};


TabsList.displayName = 'TabsList';

export const TabsTrigger = ({ value, isActive, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'px-4 py-2 rounded-md text-sm font-medium transition',
        isActive ? 'bg-white shadow text-primary' : 'text-gray-600 hover:bg-white hover:shadow'
      )}
    >
           <span className="truncate">{children}</span>

    </button>
  );
};

TabsTrigger.displayName = 'TabsTrigger';

export const TabsContent = ({ children }) => {
  return <div className="mt-4">{children}</div>;
};

TabsContent.displayName = 'TabsContent';
