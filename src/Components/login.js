import React from 'react';
import './login.css';
import {Button} from '@material-ui/core';
import {auth,provider} from '../firebase'; 
import {useStateValue} from '../Components/stateprovider';
import {actionTypes} from '../Components/reducer';

const Login = ()=>{
    const [{},dispatch] = useStateValue()
    const signIn = ()=>{
        auth.signInWithPopup(provider).then(result=>{
            dispatch({
                type:actionTypes.SET_USER,
                user:result.user
            })
        })
        .catch(err=>alert(err.message))
    }
    return(
        <div className="login">
            <div className="login__container">
                <img 
                 src="https://i.pinimg.com/originals/f7/5d/94/f75d94874d855a7fcfcc922d89ac5e80.png"
                 alt=""   
                />
                <div className="login__text">
                    <h1>Sign in to whatsapp web</h1>
                </div>
                <Button
                type="submit"
                onClick={signIn}
                >
                    Sign In with Google
                </Button>
            </div>
        </div>
    )
}


export default Login;