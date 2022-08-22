import React, { useState ,useEffect, useReducer} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer=(state, action)=>{
  if(action.type==='USER_INPUT'){
    return { value: action.val, isValid: action.val.includes('@')}
  }
  if(action.type==='INPUT_BLUR'){
    return{value: state.value, isValid: state.value.includes('@')}
  }
  return {value: '', isValid: false}
}

const passReducer=(state, action)=>{
  if(action.type==='USER_INPUT'){
    return { value:action.val, isValid: action.val.trim().length > 6}
  }
  if(action.type==='INPUT_BLUR'){
    return{value:state.value, isValid:state.value.trim().length > 6}
  }
  return {value:'', isValid: false}
}
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [enteredClgName,setEnteredClgName]=useState('');
  const [clgNameIsValid, setClgNameIsValid]=useState('');

const[emailState, dispatchEmail]=useReducer(emailReducer,{value:'', isValid:null})

const[passState, dispatchPass]=useReducer(passReducer, {value:'', isValid: null});

useEffect(()=>{
  console.log('testing...')

  return ()=>{}
},[])

  // useEffect(()=>{
  //  const identifier= setTimeout(()=>{
  //     console.log("testing....")
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredClgName.trim().length>3
  //     );
  //   },5000)   
    
  //   return ()=>{ 
  //     console.log("Clean Up")
  //     clearTimeout(identifier)
     
  //   }
  // },[enteredEmail,enteredPassword,enteredClgName])

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val:event.target.value})

    setFormIsValid(
      event.target.value.includes('@') && passState.isValid && enteredClgName.trim().length>3
  );
};

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPass({type: 'USER_INPUT',val:event.target.value})
    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6 && enteredClgName.trim().length>3
    );
  };

   const clgNameChangeHandler=(event)=>{
    setEnteredClgName(event.target.value);
   } 

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));
    dispatchEmail({type: 'INPUT_BLUR'});

  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPass({type: 'INPUT_BLUR'});
  };

  const validateClgNameHandler=()=>{
    setClgNameIsValid(enteredClgName.trim().length>3)
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passState.value, enteredClgName);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div 
        className={`${classes.control} ${clgNameIsValid===false ? classes.invalid:''}`}>
          <label htmlFor='clgName'>College Name</label>
          <input 
          type="text"
          id="clgName"
          value={enteredClgName}
          onChange={clgNameChangeHandler}
          onBlur={validateClgNameHandler}/>
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
 