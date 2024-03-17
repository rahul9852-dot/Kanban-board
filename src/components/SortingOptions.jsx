import React from 'react';
import "../App.scss";
const SortingOptions = ({ sortingOption, onSortingChange }) => {

  const sortingOptionsStyles = {
    container:{
      display: 'flex',
      justifyContent:'space-between',
      marginBottom:'8px',
    },

    selectOption:{
      width:'90px',
      padding:'2px',
      border: '1px solid #ddd',
      borderRadius:'4px'
    },

    labelStyles:{
      fontSize: "14px",
      fontWeight: 700,
      color: 'rgb(128, 125, 125)',
      lineHeight: '1rem',
      marginbottom: '12px'
    }


  }
  const handleSortingChange = (e) => {
    onSortingChange(e.target.value);
  };

  return (
    <div style={sortingOptionsStyles.container}>
      <label  style={sortingOptionsStyles.labelStyles}>Ordering</label>
      <select style={sortingOptionsStyles.selectOption} value={sortingOption} onChange={handleSortingChange}>
        <option value="priority">Priority</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
};

export default SortingOptions;