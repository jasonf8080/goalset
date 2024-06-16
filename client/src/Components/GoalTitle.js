import React from 'react'
import { FormInput } from './UI'
import { FaArrowRight } from "react-icons/fa";

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
    }


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
            <div className="quick-plans-container">
                    <div className="flex">
                        <h1 className='title'><span>⚡️</span>Quick Plans</h1>
                        {/* <div className="flex">
                            <button>Shuffle 🔀</button>
                         </div> */}
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
                </div>

        
            <div className='create-plan-container'>
                <form>  
                    <div className="form-top-flex">
                        <div className='plan-name-container'>
                            <h1 className='title'><span>🎯</span>Custom Plan</h1>
                            <p>What should this plan be called?</p>
                            <FormInput type={'text'} name={'Plan Name'} value={planName} placeholder={'Plan Name'} onChange={setPlanName}/>
                        </div>
                    </div>
                </form>

                <button className={`${planName.length > 0 && 'active'} next-step-button`} disabled={planName.length === 0} onClick={() => {
                    setShowComponent('timeframes')
                    handleStepProgress('goalTitle', 'timeframes')
                    }}>
                    <p>Next Step</p>
                    <span><FaArrowRight/></span>
                </button>
            </div>
            </>
  )
}

export default GoalTitle
