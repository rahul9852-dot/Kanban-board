import React from 'react'
import { flushSync } from 'react-dom'

const TicketCard = ({ticket}) => {

  const ticketCardStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#fff', // Light gray background color
    padding: '8px',
    borderRadius: '5px',
    marginBottom: '8px',
    marginLeft: '0px',
    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
    leftSideMenu:{
      display: 'flex',
      flexDirection:'column',
      ticketTitle:{
        fontSize: '16px',
        fontWeight:'500',
        lineHeight:'1rem',
        marginBottom:'12px'
      }
    },
    ticketHeading:{
      fontSize: '14px',
      fontWeight: 700,
      color:'#807d7d',
      lineHeight: '1rem',
      marginBottom: '12px',
      letterSpacing:''
    },
  }


  const tagStyles = {
    display:'flex',
    gap: '16px',
    extras: {
      alignItems:'center',
      justifyContent:'center',
      padding:'4px',
      border:'1px solid #ddd',
      borderRadius:'4px',
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
    ticketHeading:{
      fontSize: '14px',
      fontWeight: 700,
      color:'#807d7d',
      lineHeight: '1rem'
    },

    closedCircle:{
      height:'12px',
      width:'12px',
      borderRadius:'50%',
      backgroundColor:'#ddd'
    },
    profileIcon:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: getRandomColor(),
      border: '1px solid #fff',
      padding: '12px',
      borderRadius: '50%',
      color: 'white',
      height:'36px',
      width:'42px'
    },
    // profileCloseIcon:{
    //   position: 'relative',
    //   bottom: 0,
    //   left: '0px',
    //   bottom:'0px',
    //   zIndex: 1,
    //   height:'16px',
    //   width:'16px',
    //   borderRadius:'50%',
    //   backgroundColor:getRandomColor(),
    // }
  }


  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  return (
      <div style={ticketCardStyle}>
        <div style={ticketCardStyle.leftSideMenu}>
          <span style={ticketCardStyle.ticketHeading}>{ticket.id}</span>
          <span style={ticketCardStyle.leftSideMenu.ticketTitle}>{ticket.title}</span>
          <div style={tagStyles}>
            <div style={tagStyles.extras}>...</div>
            <div style={tagStyles.featureRequest}> 
            <span style={tagStyles.closedCircle}></span>
             <span style={tagStyles.ticketHeading}> {ticket.tag}</span>
          </div>
          </div>
        </div>
        <div style={tagStyles.profileIcon}>
          {ticket.userId}
        </div>
      </div>
      
  )
}

export default TicketCard
