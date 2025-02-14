import React from 'react';

const SortSelector = ({ sortBy, setSortBy }) => {
    return (
        <div className="sort-selector mb-3">
            <select 
                className="form-select" 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
            >
                <option value="priority">Sort by Priority</option>
                <option value="deadline">Sort by Deadline</option>
            </select>
        </div>
    );
};

export default SortSelector; 