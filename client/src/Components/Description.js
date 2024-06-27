import React from 'react'
import { FaChevronLeft, FaArrowRight } from 'react-icons/fa6'
import { BsStars } from 'react-icons/bs'
import styled from 'styled-components'

const Description = ({setShowComponent, prompt, setPrompt, handleSubmit, handleStepProgress, planName}) => {
  return (
    <>
    <Wrapper>
    <button className='back-button' onClick={() =>{
        setShowComponent('timeframes')
        handleStepProgress('description', 'timeframes')
    }}>
        <span><FaChevronLeft/></span>
        <p>Back</p>
    </button>

    <div className="description-container">
                     <h1 className='title'>Description</h1>
                     <p className='subtitle'>Add details about: <span style={{marginLeft: '4px', fontWeight: 'bold'}}>{planName}</span></p>
                     <span className='optional' style={{color: '#A8A8A8', fontSize: '14px'}}>Description (Optional)</span>
                    <textarea name="description"  rows="1" placeholder='Describe Plan in depth...' value={prompt} onChange={(e) => setPrompt(e.target.value)}></textarea>
                </div> 



    
        <button className={`${prompt.length > 1 && 'active'} next-step-button`} disabled={prompt.length === 0} onClick={handleSubmit}>
            <> Create Plan <span><BsStars/></span></>
        </button>
        </Wrapper>
    </>
  )
}

export default Description

const Wrapper = styled.div`
    .subtitle{
        margin-bottom: 8px;
    }
    .optional{
        margin-bottom: 24px;
    }
`