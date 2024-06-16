import React from 'react'
import { FaChevronLeft, FaArrowRight } from 'react-icons/fa6'
import { BsStars } from 'react-icons/bs'

const Description = ({setShowComponent, prompt, setPrompt, handleSubmit, handleStepProgress, planName}) => {
  return (
    <>
    <button className='back-button' onClick={() =>{
        setShowComponent('timeframes')
        handleStepProgress('description', 'timeframes')
    }}>
        <span><FaChevronLeft/></span>
        <p>Back</p>
    </button>

    <div className="description-container">
                     <h1 className='title'><span>📝</span>Description</h1>
                     <p>Describe details about your plan: <span style={{fontWeight: 'bold', marginLeft: '8px'}}><span style={{marginRight: '4px', fontSize: '20px'}}>🎯</span>{planName}</span></p>
                    <textarea name="description"  rows="5" placeholder='Plan Description (the more detailed information your provide, the more accurate your plan will be)' value={prompt} onChange={(e) => setPrompt(e.target.value)}></textarea>
                </div> 



    
        <button className={`${prompt.length > 1 && 'active'} next-step-button`} disabled={prompt.length === 0} onClick={handleSubmit}>
            <> Generate Plan <span><BsStars/></span></>
        </button>
    </>
  )
}

export default Description
