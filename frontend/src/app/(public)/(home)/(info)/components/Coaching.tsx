import React from 'react'
import Coaching_child_1 from './Coaching_child_1';
import Coaching_child_2 from './Coaching_child_2';
import Coaching_child_3 from './Coaching_child_3';
import Coaching_child_4 from './Coaching_child_4';

export default function Coaching() {
  return (
    <div className='mx-auto w-11/12 rounded-lg shadow-[0px_0px_10px_5px_rgba(0,0,0,0.10)] text-deepblue'>
      
      <div className='px-24 py-7'>
      <Coaching_child_1 />
      </div>
      <Coaching_child_2 />
      <div className='px-24 py-7'>
      <Coaching_child_3 />
      <Coaching_child_4 />
      </div>
    </div>
  )
}
