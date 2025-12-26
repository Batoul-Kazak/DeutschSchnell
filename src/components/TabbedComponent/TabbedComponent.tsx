import React, { useState } from 'react';

interface Tab {
    id: string;
    label: string;
    content: string;
}

const TabbedComponent: React.FC = () => {
    const tabs: Tab[] = [
        { id: 'tab1', label: 'Profile', content: 'Profile content goes here...' },
        { id: 'tab2', label: 'Settings', content: 'Settings content goes here...' },
        { id: 'tab3', label: 'Messages', content: 'Messages content goes here...' },
    ];

    const [activeTab, setActiveTab] = useState<string>(tabs[0].id);

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors duration-200 ${activeTab === tab.id
                            ? 'text-blue-600 bg-white dark:bg-gray-800 dark:text-blue-400 border-b-2 border-blue-500'
                            : 'text-black hover:text-gray-700 dark:text-black dark:hover:text-black'
                            }`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="p-4 bg-white rounded-b-lg dark:bg-gray-800">
                {tabs.map((tab) =>
                    activeTab === tab.id ? (
                        <div key={tab.id} className="py-2">
                            {tab.content}
                        </div>
                    ) : null
                )}
            </div>
        </div>
    );
};

export default TabbedComponent;