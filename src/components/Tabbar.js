'use client';

import React, { useState, useRef } from 'react';

const TabBar = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);
    const tabRefs = useRef([]); 
    const handleTabClick = (index) => {
        setActiveTab(index);

        tabRefs.current[index]?.scrollIntoView({
            behavior: 'smooth',
            inline: 'center', 
        });

        document.documentElement.scrollTo({
            "inset-block-start": 0, 
            behavior: 'smooth', 
        });
    };


    return (
        <div className="flex flex-col w-full h-full aid-container">
            {/* Tab Bar */}
            <div className="flex items-center justify-center overflow-x-auto aid-container whitespace-nowrap border-b border-gray-200 bg-white left-0 right-0 ">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        ref={(el) => (tabRefs.current[index] = el)} 
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
            <div className="pt-14 aid-container mt-6">
                {tabs[activeTab]?.content || <p>No content available.</p>}
            </div>
        </div>
    );
};

export default TabBar;
