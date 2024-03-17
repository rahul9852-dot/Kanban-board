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
    border: '1px solid #f2f4f7',
    borderRadius:'8px',
    boxShadow:'0 0 10px 0.5px #f5f6f7',
    marginBottom:'8px',
    backgroundColor:'#f2f4f7'
  };

  const groupKeyStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  }
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupingOption, setGroupingOption] = useState(localStorage.getItem('groupingOption') || 'status');
  const [sortingOption, setSortingOption] = useState(localStorage.getItem('sortingOption') || 'priority');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const sortingOption = localStorage.getItem('sortingOption') || 'priority';
      const groupingOption = localStorage.getItem('groupingOption') || 'status';
      
      const responseData = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
      const fetchData = await responseData.json();
      const { tickets, users } = fetchData;
      
      let sortedTickets = sortTickets(tickets, sortingOption);
      let groupedData = groupTickets(sortedTickets, groupingOption, users);
      
      setTickets(groupedData);
      setUsers(users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleGroupingChange = option => {
    setGroupingOption(option);
    localStorage.setItem('groupingOption', option);
    fetchData();
  };

  const handleSortingChange = option => {
    setSortingOption(option);
    localStorage.setItem('sortingOption', option);
    fetchData();
  };

  const sortTickets = (tickets, sortingOption) => {
    switch (sortingOption) {
      case 'priority':
        return tickets.slice().sort((a, b) => b.priority - a.priority);
      case 'title':
        return tickets.slice().sort((a, b) => a.title.localeCompare(b.title));
      default:
        return tickets;
    }
  };

  const groupTickets = (tickets, groupingOption, users) => {
    switch (groupingOption) {
      case 'status':
        return tickets.reduce((grouped, ticket) => {
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
            const userName = user.name;
            if (!grouped[userName]) {
              grouped[userName] = [];
            }
            grouped[userName].push(ticket);
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

  return (
    <>
      {displayOption && (
        <div style={selectingOptions}>
            <GroupingOptions
              groupingOption={groupingOption}
              onGroupingChange={handleGroupingChange}
            />
            <SortingOptions
              sortingOption={sortingOption}
              onSortingChange={handleSortingChange}
            />
        </div>
      )}
      {tickets && (
            <main>
                <div style={groupKeyStyles}>
                  { Object.keys(tickets).map((groupKey, idx) => (
                    <div key={idx}>
                        <GroupedColumn
                          groupKey={groupKey}
                          tickets={tickets[groupKey]}
                        />
                    </div>
                  ))}
                </div>
            </main>
      )}
    
    </>
  )
}

export default Services;