import React, { useEffect, useState } from 'react'
import { FaChevronLeft, FaArrowRight } from 'react-icons/fa6'
import styled from 'styled-components'
import { IoCalendarOutline } from "react-icons/io5";

const Timeframes = ({setShowComponent, startDate, setStartDate, endDate, setEndDate, handleStepProgress}) => {
  const [showTimeframes, setShowTimeframes] = useState(true);

  const handleShowTimeframes = () => {
    if(showTimeframes){
        setStartDate('')
        setEndDate('')
    }

    setShowTimeframes(!showTimeframes)


  }


  return (
    <>
    <Wrapper>
    <button className='back-button' onClick={() =>{
        setShowComponent('goalTitle')
        handleStepProgress('timeframes', 'goalTitle')
    }}>
        <span><FaChevronLeft/></span>
        <p>Back</p>
    </button>

   <div className='date-container'>
          <h1 className='title'>Timeframes</h1>
          <p className='subtitle'>When do you want to accomplish this goal?</p>

        <div className='date-flex'>
            {/* <p>Start Date</p> */}
            <input name='start-date' type='date'  placeholder='Select Date' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <div></div>
            {/* <p>End Date</p> */}
            <input name='end-date' type='date'   placeholder='Select Date' value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
        </div>

    </div> 

    {/* Toggle Timeframes */}
     <div className='flex toggle-timeframes'>
        <button className={showTimeframes && 'active'} onClick={handleShowTimeframes}>
            <span></span>
        </button>
        <p>{showTimeframes ? `Add times for steps on calendar` : `Don't add times for steps on calendar`}</p>
    </div> 

    <button className={`${!showTimeframes || showTimeframes && startDate && endDate ? 'active' : '' } next-step-button`} disabled={!startDate && showTimeframes || !endDate && showTimeframes} onClick={() => 
        {setShowComponent('description')
        handleStepProgress('timeframes', 'description')
        }}>
        <p>Next</p>
        <span><FaArrowRight/></span>
    </button>
    </Wrapper>
    </>

  )
}

export default Timeframes

const Wrapper = styled.div`
     .date-flex{
        display: flex;
        align-items: center;
    }

    .date-flex input{
        flex-basis: 48% !important;
        margin-top: 0px;
    }

    .date-flex input{
        text-transform: uppercase;
    }

    .date-flex div{
        height: 2px;
        flex-basis: 4%;
        background: var(--primary-color);
        margin: 0px 16px;
    }

    .toggle-timeframes{
        margin-top: 24px;
        margin-bottom: 32px;
    }

    .toggle-timeframes button{
        margin-right: 16px;
        position: relative;
        width: 45px;
        height: 20px;
        background: #D9D9D9;
        padding: 4px;
        border-radius: 12px;
        border: none;
    }

    .toggle-timeframes button span{
        position: absolute;
        top: 0;
        right: 0%;
        width: 20px;
        height: 100%;
        background: #898989;
        border-radius: 100%;
        transition: all 0.3s ease;
    }

    .toggle-timeframes button.active{
        background: #B8B5FF;
    }

    .toggle-timeframes button.active span{
        left: 0%;
        right: auto;
        background: var(--primary-color);
    }

    

`