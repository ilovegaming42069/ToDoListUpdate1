import React from 'react';
import { statusSlugToDisplayName } from './StatusMapping'; // Adjust the import path as necessary

function FilterButtons({ currentFilter, setFilter }) {
  const filters = ['all', 'not-started', 'in-progress', 'done'];
  
  return (
    <div className="filter-buttons">
      {filters.map(filter => (
        <button 
          key={filter}
          className={currentFilter === filter ? 'active' : ''}
          onClick={() => setFilter(filter)}
        >
          {statusSlugToDisplayName[filter]}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;
