'use client';

import React, { useState, useRef } from 'react';

const TabBar = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);
    const tabRefs = useRef([]); // To store references to tab elements

    const handleTabClick = (index) => {
        setActiveTab(index);

        // Scroll the active tab into view horizontally
        tabRefs.current[index]?.scrollIntoView({
            behavior: 'smooth',
            inline: 'center', // Centers the tab horizontally
        });

        // Scroll the tab content to the top
        document.documentElement.scrollTo({
            top: 0, // Scroll to the top of the page
            behavior: 'smooth', // Smooth scrolling
        });
    };


    return (
        <div className="flex flex-col w-full h-full">
            {/* Tab Bar */}
            <div className="flex overflow-x-auto whitespace-nowrap border-b border-gray-200 fixed bg-white left-0 right-0 z-[10000]">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        ref={(el) => (tabRefs.current[index] = el)} // Store tab references
                        onClick={() => handleTabClick(index)}
                        className={`px-4 py-2 mr-2 text-xl font-medium ${activeTab === index
                            ? 'border-b-2 border-blue-500 text-blue-500'
                            : 'text-gray-600 hover:text-blue-500'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className=" pt-14">
                {tabs[activeTab]?.content || <p>No content available.</p>}
            </div>
        </div>
    );
};

export default TabBar;
