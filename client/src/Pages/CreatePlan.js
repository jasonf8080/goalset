import React, { useContext, useEffect, useState, useRef} from 'react'
import styled from 'styled-components'
import { FormInput, PageLoader } from '../Components/UI'
import { StepList } from '../Components/CreatePlan'
import { FaChevronDown, FaRegTrashCan } from 'react-icons/fa6'
import { BsStars } from "react-icons/bs";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import MainContext from '../context'
import GoalTitle from '../Components/GoalTitle'
import Timeframes from '../Components/Timeframes'
import Description from '../Components/Description'
import { FaCheck } from 'react-icons/fa'
import StepProgress from '../Components/StepProgress'

//const componentsArray = ['goalTitle', 'timeframes', 'description']


const CreatePlan = () => {
    const navigate = useNavigate();
    const {updateMessage} = useContext(MainContext)

    const [planName, setPlanName] = useState('')
    const [numberOfSteps, setNumberOfSteps] = useState(5)
    const [showStepList, setShowStepList] = useState(false)
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('')
    const [addNewInput, setAddNewInput] = useState(false)
    const [extraInfo, setExtraInfo] = useState('')
    const [prompt, setPrompt] = useState('')
    const [loading, setLoading] = useState(false)
    const [showComponent, setShowComponent] = useState('goalTitle');



    const firstProgress = useRef(null);
    const secondProgress = useRef(null);

    const handleStepProgress = (beforeComponent, afterComponent) => {
        
        if(beforeComponent === 'goalTitle' && afterComponent === 'timeframes'){
            firstProgress.current.style.width= '100%'
        }

        if(beforeComponent === 'timeframes' && afterComponent === 'goalTitle'){
            firstProgress.current.style.width= '0%'
        }

         if(beforeComponent === 'timeframes' && afterComponent === 'description'){
             secondProgress.current.style.width= '100%'
        }

        if(beforeComponent === 'description' && afterComponent === 'timeframes'){
            secondProgress.current.style.width= '0%'
        }
    }

   

const handleSubmit = async() => {
    
    const options = {
    method: 'POST',
    url: 'https://open-ai21.p.rapidapi.com/qa',
    headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'fb08495336mshc89410ce6a28dadp18702ajsn3a74f03a186d',
        'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
    },

    data: {
        question: prompt,
        context: `Generate a response in a JSON array format that contains 5 objects based on ${prompt}. Each object represents a main step with a key "mainStep", and within each object, there is an array with the key "substeps" containing exactly 5 elements.

All main steps and substeps must be non-empty strings, properly enclosed in double quotes, and separated by commas. Ensure the array has no trailing commas, uses correct brackets, and contains no syntax errors.

Here is an example of the expected output format: [
    {
        "mainStep": "Main Step 1",
        "substeps": ["Substep 1.1", "Substep 1.2", "Substep 1.3", "Substep 1.4", "Substep 1.5"]
    },
    {
        "mainStep": "Main Step 2",
        "substeps": ["Substep 2.1", "Substep 2.2", "Substep 2.3", "Substep 2.4", "Substep 2.5"]
    },
    {
        "mainStep": "Main Step 3",
        "substeps": ["Substep 3.1", "Substep 3.2", "Substep 3.3", "Substep 3.4", "Substep 3.5"]
    },
    {
        "mainStep": "Main Step 4",
        "substeps": ["Substep 4.1", "Substep 4.2", "Substep 4.3", "Substep 4.4", "Substep 4.5"]
    },
    {
        "mainStep": "Main Step 5",
        "substeps": ["Substep 5.1", "Substep 5.2", "Substep 5.3", "Substep 5.4", "Substep 5.5"]
    }
]

Now generate a new JSON array in this exact format with 5 main steps and 5 substeps each. Ensure there are no syntax errors, and the output is well-formatted.

`
    }
    };

        setLoading(true)
    try {
        //console.log("GOAL SUCCESSFULLY CREATED")
        //console.log(response)
        const response = await axios.request(options);

       // console.log(response)
        
        let result = response.data.result;
        console.log(response.data.result)   
        const data = await JSON.parse(result);



        const createResponse = await axios.post('/api/v1/goals/createGoal', {title: planName, startDate, endDate, data});

        navigate(`/plan/${createResponse.data.goalID}`)



    } catch (error) {
        //console.log('FAILED TO GENERATE PROPER GOAL')
        updateMessage({type: 'error', content: 'Could not generate goal, try wording your goal differently'})
        console.log(error);

    }
    setLoading(false)
}

    if(loading){
        return <PageLoader message={'Generating Plan...'}/>
    }


  return (
    <Wrapper>
        <div className="container">
             {/* <h1>Create A New Plan</h1>  */}
             {/* Step Progress Component */}
            <StepProgress showComponent={showComponent} firstProgress={firstProgress} secondProgress={secondProgress} />


        
            {showComponent === 'goalTitle' && <GoalTitle setShowComponent={setShowComponent} planName={planName} setPlanName={setPlanName} handleStepProgress={handleStepProgress}/>}
            {showComponent === 'timeframes' && <Timeframes setShowComponent={setShowComponent} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} handleStepProgress={handleStepProgress}/>}
            {showComponent === 'description' && <Description setShowComponent={setShowComponent} prompt={prompt} setPrompt={setPrompt} handleSubmit={handleSubmit} handleStepProgress={handleStepProgress} planName={planName}/>}
        </div>
    </Wrapper>
  )
}

export default CreatePlan

const Wrapper = styled.div`
    .container{
        padding: 16px;
        max-width: 75%;
        margin: 0 auto;
        margin-top: 48px;
    }


    .step-progress-flex{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        border-bottom: 2px solid #ddd;
        padding-bottom: 24px;
    }

    .step-number-flex{
        display: flex;
        align-items: center;
        color: #aaa;
        font-weight: bold;
    }


    .step-number-circle{
        color: white;
        background: #ccc;
        border-radius: 100%;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 16px;
        font-weight: bold;
    }

    .step-number-flex.active .step-number-circle{
        background: var(--primary-color);
    }

    .step-number-flex.active p {
        color: var(--primary-color);
    }

    /* .step-number-flex.active span, {
        transform: translate(2px);
    } */






    .step-progress{
        position: relative;
        background: #ccc;
        width: 25%;
        height: 5px;
        margin: 0 auto;
        border-radius: 2px;
    }

    .step-progress span{
        position: absolute;
        top: 0;
        left: 0;
        //width: 0%;
        height: 100%;
      //  border: 1px solid red;
        border-radius: inherit;
        background: var(--primary-color);
        transition: all 0.6s;
    }

    

    h1{
        margin-bottom: 24px;
        font-size: 40px;
    }

 
    .form-top-flex{
        margin-top: 32px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .title{
        margin-bottom: 8px;
        font-size: 24px;
    }

    .subtitle{
        font-size: 20px;
    }

    .title span{
        font-size: 40px;
        margin-right: 16px;
    }

    .plan-name-container, .date-container{
        flex-basis: 100%;
    }

    .steps-container{
        flex-basis: 20%;
        margin-left: 24px;
        margin-right: 72px;
    }


    .form-top-flex input:not(.date-flex input){
        min-width: 100%;
        max-width: 100%;
    }
    
    input,  .steps-toggle-btn, textarea{
        background: transparent !important;
        border: none;
        border-bottom: 2px solid #B8B5FF;
        padding: 16px 0px;
       // border-radius: 8px;
        outline: none;
        font-family: 'Poppins';
    }


    input{
        margin-top: 16px;
    }

    input, input::placeholder, textarea, textarea::placeholder{
         color: var(--primary-color) !important;
         font-size: 18px;
    }

    
  
    .steps-toggle-btn{
        display: flex;
        align-items: center;
        min-width: 100%;
        justify-content: space-between;
    }

    .steps-container{
        position: relative;
    }

   
    /* .description-container{
        margin-top: 32px;
    } */

    textarea{
        min-width: 100%;
        resize: none;
        position: relative;
    }

    .add-new-btn{
        margin-top: 24px;
        background: transparent;
        text-decoration: underline;
        border: none;
    }
    
    .primary-btn{
        margin-top: 40px;
        padding: 16px;
        display: flex;
        align-items: center;
        border-radius: 8px;
    }

    .primary-btn span{
        margin-right: 8px;
    }

    .next-step-button, .back-button{
        display: flex;
        align-items: center;
    }

    .next-step-button{
        margin-top: 24px;
        background: #aaa;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        font-size: 20px;
    }

    .next-step-button:disabled{
        cursor: not-allowed;
    }

    .next-step-button.active{
        background: var(--primary-color);
    }

    .next-step-button span, .back-button span{
       transform: translateY(3px);
    }

    .next-step-button span{
          margin-left: 8px;
    }

    .back-button span{
        margin-right: 8px;
    }

    .back-button{
        margin-bottom: 32px;
       color: var(--primary-color);
        background: transparent;
        border: none;
    }

    .date-flex{
        margin-top: 8px;
    }

    textarea{
        margin-top: 16px;
    }

`
