// GroupingOptions.jsx
import React from 'react';

const GroupingOptions = ({ groupingOption, onGroupingChange }) => {

  const groupOptionStyles = {
    groupOptionContainer:{
      display:'flex',
    justifyContent:'space-between',
    marginBottom:'8px',
    },
    selectOption:{
      width:'90px',
      padding:'2px',
      border: '1px solid #ddd',
      borderRadius:'4px'
    }
  }
  const handleGroupingChange = (e) => {
    onGroupingChange(e.target.value);
  };

  return (
    <div style={groupOptionStyles.groupOptionContainer}>
      <label>Group By:</label>
      <select style={groupOptionStyles.selectOption} value={groupingOption} onChange={handleGroupingChange}>
        <option value="status">Status</option>
        <option value="user">User</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
};

export default GroupingOptions;
