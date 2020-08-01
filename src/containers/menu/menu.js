import React,{useState,useEffect} from 'react'
import './menu.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandHoldingMedical} from '@fortawesome/free-solid-svg-icons'
import { Route, withRouter, Link } from "react-router-dom";
import {getUserInfos} from '../../state/user/user-action-creater'
import { connect } from "react-redux";
const Menu = props=>{
    const [sticky,setSticky] = useState(true)
    useEffect(()=>{
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 0) {
              setSticky(false)
            } else {
              setSticky(true)
            }
          });
    },[])
    return(
    <div className={sticky > 0?'menu':'menu sticky'}>
        <Link to='/home' className='menu__logo'>
            <FontAwesomeIcon className='menu__logo-logo' icon={faHandHoldingMedical}/>Unihelp
        </Link>
        <div className='menu__nav'>
            <Link to='/chatbot' className='menu__nav-link'>Chatbot</Link>
            <Link to='/forum' className='menu__nav-link'>Forum</Link>  
            <Link to='/how-it-works' className='menu__nav-link'>How it works</Link>   
        </div>
        {props.user.auth?<div className='menu__auth menu__photo'>
        <img src={props.user.userphoto}/><p> {props.user.username} </p>
        </div>:
            <div className='menu__auth'>
            <Link to='/login' className='menu__nav-link'>Log in</Link> 
            <Link to='/signup'className='menu__nav-link'>Sign up</Link> 
        </div>}
    </div>)
}
function mapStateToProps(state) {
    return {
      user: state.user.current_user,     
    }
}
export default connect(mapStateToProps, { getUserInfos })(Menu);
