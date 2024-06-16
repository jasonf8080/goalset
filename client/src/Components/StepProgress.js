import React from 'react'
import { FaCheck } from 'react-icons/fa6'

const StepProgress = ({showComponent, firstProgress, secondProgress}) => {
  return (
     <div className="step-progress-flex">

                <div className='step-number-flex active'>
                    <span className="step-number-circle">
                        <span>{showComponent === 'timeframes' || showComponent === 'description' ? <FaCheck style={{transform: 'translateY(2px)'}}/> : '1'}</span>
                    </span>

                    <p>Goal Title</p>
                </div>

                <div className='step-progress'>
                    <span ref={firstProgress}></span>
                </div>


                <div className={`${showComponent === 'timeframes' || showComponent === 'description' ? 'active' : ''} step-number-flex`}>
                    <span className="step-number-circle">
                        <span>{showComponent === 'description' ? <FaCheck style={{transform: 'translateY(2px)'}}/> : '2'}</span>
                    </span>

                    <p>Timeframes</p>
                </div>
                

                <div className='step-progress'>
                    <span ref={secondProgress}></span>
                </div>

                <div className={`${showComponent === 'description' && 'active'} step-number-flex`}>
                    <span className="step-number-circle">
                        <span>3</span>
                    </span>

                    <p>Describe Plan</p>
                </div>
            </div>
  )
}

export default StepProgress
