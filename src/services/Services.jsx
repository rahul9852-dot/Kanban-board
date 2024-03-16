import React, { useEffect, useState } from 'react'
import GroupingOptions from '../components/GroupingOptions';
import SortingOptions from '../components/SortingOptions';
import GroupedColumn from '../components/GroupedColumn';

const Services = ({displayOption}) => {


  const selectingOptions= {
    boxSizing:'border-box',
    width:'350px',
    display:'flex',
    alignItems:'space-between',
    flexDirection: 'column',
    padding:'10px',
    border: '1px solid #f5f6f7',
    borderRadius:'8px',
    boxShadow:'0 0 8px 0.5px #f5f6f7',
    marginBottom:'8px',
  };

  const groupKeyStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  }
  useEffect(()=> {
    fetchData();
  },[])

  const [tickets, setTickets] = useState(null);
  const [users, setUsers] = useState(null);
  const [groupingOption, setGroupingOption] = useState('status');
  const [sortingOption, setSortingOption] = useState('priority');




  const fetchData = async() => {
    const responseData = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
    const fetchData = await responseData.json();
    console.log("fetchData", fetchData)
    const tickets = await fetchData.tickets;
    const users = await fetchData.users;
    setTickets(tickets);
    setUsers(users);
  }

  // Group tickets based on the selected grouping option
const groupedTickets = () => {
  if (!tickets || !users) {
    return {}; // Return empty object if tickets or users are undefined
  }
  // Grouping logic based on the selected option
  switch (groupingOption) {
    case 'status':
      return tickets && tickets.reduce((grouped, ticket) => {
        const status = ticket.status;
        if (!grouped[status]) {
          grouped[status] = [];
        }
        grouped[status].push(ticket);
        return grouped;
      }, {});
    case 'user':
      return tickets.reduce((grouped, ticket) => {
        const user = users.find(user => user.id === ticket.userId);
        if (user) {
          if (!grouped[user.name]) {
            grouped[user.name] = [];
          }
          grouped[user.name].push(ticket);
        }
        return grouped;
      }, {});
    case 'priority':
      return tickets.reduce((grouped, ticket) => {
        const priority = ticket.priority;
        if (!grouped[priority]) {
          grouped[priority] = [];
        }
        grouped[priority].push(ticket);
        return grouped;
      }, {});
    default:
      return {};
  }
};

// Sort tickets based on the selected sorting option
const sortedTickets = (grouped) => {
  if (!tickets || !users) {
    return {}; // Return empty object if tickets or users are undefined
  }
  // Sorting logic based on the selected option

  const sorted = {};
  Object.keys(grouped).forEach(key => {
    sorted[key] = grouped[key].sort((a, b) => {
      switch (sortingOption) {
        case 'priority':
          return b.priority - a.priority;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  });
  return sorted;
};
  // Handle user interactions to change grouping option
  const handleGroupingChange = option => {
    setGroupingOption(option);
  };

  // Handle user interactions to change sorting option
  const handleSortingChange = option => {
    setSortingOption(option);
  };

  const grouped = groupedTickets();
  const sorted = sortedTickets(grouped);

  return (
    <>
      {displayOption && (
        <div style={selectingOptions}>
            <SortingOptions
              sortingOption={sortingOption}
              onSortingChange={handleSortingChange}
            />
            <GroupingOptions
              groupingOption={groupingOption}
              onGroupingChange={handleGroupingChange}
            />
        </div>
      )}
      <main>
          <div className="kanban-board">
          <div style={groupKeyStyles}>
            {/* Render Grouped Columns */}
            {Object.keys(sorted).map(groupKey => (
              <GroupedColumn
                key={groupKey}
                groupKey={groupKey}
                priority={sorted[groupKey].status}
                tickets={sorted[groupKey]}
              />
            ))}
          </div>
        </div>
      </main>
    
    </>
  )
}

export default Services;