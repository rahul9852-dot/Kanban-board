import React from 'react'
import { flushSync } from 'react-dom'

const TicketCard = ({ticket}) => {

  const ticketCardStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0', // Light gray background color
    padding: '8px',
    borderRadius: '5px',
    marginBottom: '8px',
    marginLeft: '0px',
    // boxShadow: '0px 60px 90px 0px rgba(255, 255, 255, 0.75)'
  }

  const leftSideDetails = {

  }
  const tagStyles = {
    display:'flex',
    gap: '16px',
    extras: {
      display: 'flex',
      border:'1px solid #ddd',
      borderRadius:'4px',
      textAlign:'center',
      padding:'2px'
    },
    featureRequest:{
        display:'flex',
        justifyContent:'center',
        alignItems: 'center',
        border: '1px solid #ddd',
        padding: '4px',
        borderRadius:'4px',
        gap: '12px',
    },
    closedCircle:{
      height:'12px',
      width:'12px',
      borderRadius:'50%',
      backgroundColor:'#ddd'
    }
  }

  // const extras={
  //   display: 'flex',
  //   border:'1px solid #ddd',
  //   borderRadius:'4px',
  //   textAlign:'center',
  //   padding:'2px'
  // }

  return (
      <div style={ticketCardStyle}>
        <div >
          <span>{ticket.id}</span>
          <p>{ticket.title}</p>
          <div style={tagStyles}>
            <div style={tagStyles.extras}>...</div>
            <div style={tagStyles.featureRequest}> 
            <span style={tagStyles.closedCircle}></span>
              {ticket.tag}
          </div>
          </div>

        </div>
        <div>
          <span>{ticket.userId}</span>
        </div>
      </div>
      
  )
}

export default TicketCard
