import React from 'react'
import TicketCard from './TicketCard';

const GroupedColumn = ({key, groupKey, tickets}) => {
  // const groupStyleColumn = {
  //   display:'grid',
  //   gridTemplateColumn:'repeat(auto-fill, minmax(250px, 1fr))',
  //   gap:'10px',
  // }
  // const columnStyle = {
  //   display: 'flex',
  //   gridTemplateRows: 'auto',
  // }

  const statusStyle={
    textAlign:'center'
  }
  
  

  return (
    <div>
          <h2 style={statusStyle}>{groupKey}</h2>
          {tickets.map(ticket => (
            <div key={ticket.id}>
              <TicketCard ticket={ticket} />
            </div>
          ))}
  </div>
  )
}

export default GroupedColumn;