import React from 'react'
import { FormInput } from './UI'
import { FaArrowRight } from "react-icons/fa";
import styled from 'styled-components';

const quickPlans = [
    {
        title: 'Plan a trip to Europe',
        icon:  <span>✈️</span>
    },

    {
        title: 'Lose weight for summer',
        icon:  <span>💪</span>
    },

    {
        title: 'Start an online business',
         icon:  <span>💵</span>
    },


]




const GoalTitle = ({setShowComponent, planName, setPlanName, handleStepProgress}) => {

  
  const handleQuickPlan = (item) => {
        if(item === planName){
            setPlanName('')
        } else {
            setPlanName(item)
        }
    }

  return (
     <>
        <Wrapper>
            <div className='create-plan-container'>
                <form>  
                    <div className="form-top-flex">
                        <div className='plan-name-container'>
                            <h1 className='title'>New Plan</h1>
                            <p className='subtitle'>What should this plan be called?</p>
                            <FormInput type={'text'} name={'Describe Plan With a Name...'} value={planName} placeholder={'Describe Plan With a Name...'} onChange={setPlanName}/>
                        </div>
                    </div>
                </form>

                <button className={`${planName.length > 0 && 'active'} next-step-button`} disabled={planName.length === 0} onClick={() => {
                    setShowComponent('timeframes')
                    handleStepProgress('goalTitle', 'timeframes')
                    }}>
                    <p>Next</p>
                    <span><FaArrowRight/></span>
                </button>
            </div>

             <div className="quick-plans-grid">
                        {quickPlans.map((item, index) => {
                            return <div className='quick-plan-card-outline' key={item.title} onClick={() => handleQuickPlan(item.title)}>
                                <div className={`${item.title === planName && 'active'} quick-plan-card`}>
                                    <h3>{item.icon} {item.title}</h3>
                                </div>
                            </div>
                        })}
                    </div>
                </Wrapper>
            </>
  )
}

export default GoalTitle

const Wrapper = styled.div`
      

   
    .title{
        margin-top: 24px;
    }
   

    .quick-plans-grid{
        margin-top: 100px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
    }

  .quick-plan-card-outline{
    background: linear-gradient(to bottom, #fff, #fff);
   // box-shadow: 0px 5px 15px rgba(0,0,0,0.1);
    padding: 4px;
    border-radius: 16px;
    margin-bottom: 16px;
    background: transparent;
   }

   .quick-plan-card{
    padding: 16px;
    border-radius: 16px;
    border-radius:4;
    /* background: #fff; */
    cursor: pointer;
    transition: all 0.3s;
   }

   .quick-plan-card:hover{
    transform: scale(1.05);
   }

   /* .quick-plan-card.active[

   ] */

   .quick-plan-card span{
      margin-right: 8px;
   }
`