import React from 'react';
import './Chats.css'
import Advertisements from './Advertisements';
import ChatingPortion from './ChatingPortion';

function Chats() {
  
  return (
    <div className='InsideChat'>
        <Advertisements/>
        <ChatingPortion/>
    </div>
  )
}

export default Chats;
