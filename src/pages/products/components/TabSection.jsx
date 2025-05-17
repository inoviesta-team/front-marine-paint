import { useState } from 'react';

export default function TabSection(children) {
    console.log("children: ", children);
    
  const [activeTab, setActiveTab] = useState('details');
  
  const tabs = [
    { id: 'details', label: 'Detail' },
    // { id: 'specification', label: 'Specification' },
    // { id: 'application', label: 'Application' },
    { id: 'reviews', label: 'Ulasan' }
  ];
  
  return (
    <div className="border-t border-gray-200 pt-6">
      <div className="grid grid-cols-2 sm:flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 text-md font-extrabold ${
              activeTab === tab.id
                ? 'text-blue-800 border-b-2 border-blue-800'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="py-6">
        {activeTab === 'details' && (
            <div>
              {children.details}
            </div>
          )}
          
          {activeTab === 'specification' && (
            <div>
              {children.specification}
            </div>
          )}
          
          {activeTab === 'application' && (
            <div>
              {children.application}
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              {children.reviews}
            </div>
          )}
        </div>
      </div>
    );
  }