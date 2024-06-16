import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FormInput } from '../Components/UI'
import {useDispatch, useSelector} from 'react-redux'
import { registerUser, loginUser, clearRedirect, clearMessage } from '../Features/userSlice'
import Loader from '../Components/UI/Loader'
import { Message } from '../Components/Login'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const dispatch = useDispatch();

    //Message being called from redux not from useContext
    const {loading, message, redirectUser} = useSelector((store) => store.user)
   
    const [login, setLogin] = useState(true)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert to lowercase
    const lowerFirstName = firstName.toLowerCase();
    const lowerLastName = lastName.toLowerCase();
    const lowerEmail = email.toLowerCase();
   // const lowerPassword = password.toLowerCase();

    if (login) {
      await dispatch(loginUser({ email: lowerEmail, password }));
    } else {
      await dispatch(registerUser({
        firstName: lowerFirstName,
        lastName: lowerLastName,
        email: lowerEmail,
        password
      }));
    }
  };

  //When user logs in, handle redirect to the dashboard
  useEffect(() => {
    if(redirectUser){
      setTimeout(() => {
        navigate('/dashboard')
        dispatch(clearMessage())
    }, 3000)
    }
  }, [redirectUser])


  return (
     <Wrapper>
          {message.content && <Message type={message.type} content={message.content}/>}

          <div className='container'>
              <form>
                <div className='logo'><img src='/images/logo.svg'/></div>
                <h1>{login ? 'Login' : 'Sign Up'}</h1>
               {!login && <FormInput id={'login-name'} type={'text'} name={'first name'} value={firstName} onChange={setFirstName}/>}
               {!login && <FormInput id={'login-lastname'} type={'text'} name={'last name'} value={lastName} onChange={setLastName}/>}
                <FormInput id={'login-email'} type={'email'} name={'email'} value={email} onChange={setEmail}/>
                <FormInput id={'login-password'} type={'password'} name={'password'} value={password} onChange={setPassword}/>

                <button className='primary-btn' disabled={loading} onClick={handleSubmit}>
                  {loading ? <Loader classProp={'btn-loader'}/> : login ? 'Login' : 'Sign up'}
                </button>

               

                <p className='toggle-message'>
                  {login ? 
                    <span>Not a member yet? <button onClick={(e) => {
                      e.preventDefault();
                      setLogin(!login)
                    }}>Sign Up</button></span> 
                  : <span>Already a member? <button onClick={(e) => {
                      e.preventDefault();
                      setLogin(!login)
                    }}>Login</button></span> 
                  }
                </p>
              </form>
          </div>
    </Wrapper>
  )
}

export default Login


const Wrapper = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    max-height: 100vh;
    min-width: 100vw;
    max-width: 100vw;

    .container{
       max-width: 700px;
       min-width: 700px;
       padding: 48px 0;
       border-radius: 24px;
       /* box-shadow: 0px 5px 15px rgba(0,0,0,0.5); */
    }

    .logo{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 40px;
    }

    .logo img{
      width: 220px;
    }

    form{
        margin: 0 auto;
        max-width: 500px;
        min-width: 500px;
    }

    h1{
        margin-bottom: 24px;
    }

    input, .primary-btn{
        min-width: 100%;
    }

    input::placeholder, input{
        font-family: 'Poppins';
        font-size: 16px;
    }

    input::placeholder, #login-lastname, #login-name{
        text-transform: capitalize;
    }

    #login-email{
      text-transform: lowercase;
    }

  
    input{
        outline: none;
        padding: 16px 24px;
        border: none;
        background: white;
        border-radius: 8px;
        margin-bottom: 16px;
    }

    .primary-btn{
        padding: 16px;
        border-radius: 8px;
        font-size: 16px;
        margin-bottom: 24px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .primary-btn:disabled{
      cursor: not-allowed;
    }

    .toggle-message{
        text-align: center;
    }

    .toggle-message button{
       margin-left: 8px;
       border: none;
       text-decoration: underline;
       color: var(--primary-color);
       background: transparent;
       font-size: 16px;
    }
`