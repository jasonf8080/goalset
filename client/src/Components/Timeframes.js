import React from 'react'
import { FaChevronLeft, FaArrowRight } from 'react-icons/fa6'

const Timeframes = ({setShowComponent, startDate, setStartDate, endDate, setEndDate, handleStepProgress}) => {
  return (
    <>
    <button className='back-button' onClick={() =>{
        setShowComponent('goalTitle')
        handleStepProgress('timeframes', 'goalTitle')
    }}>
        <span><FaChevronLeft/></span>
        <p>Back</p>
    </button>

   <div className='date-container'>
          <h1 className='title'><span>📅</span>Timeframes</h1>
          <p>When do you want to accomplish this goal?</p>

        <div className='date-flex'>
            {/* <p>Start Date</p> */}
            <input name='start-date' type='date' min="2024-01-01" max="2024-12-31" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <div></div>
            {/* <p>End Date</p> */}
            <input name='end-date' type='date'  min="2024-01-01" max="2024-12-31" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
        </div>

    </div> 

    <button className={`${startDate && endDate && 'active'} next-step-button`} disabled={!startDate || !endDate} onClick={() => 
        {setShowComponent('description')
        handleStepProgress('timeframes', 'description')
        }}>
        <p>Next Step</p>
        <span><FaArrowRight/></span>
    </button>
    </>
  )
}

export default Timeframes
