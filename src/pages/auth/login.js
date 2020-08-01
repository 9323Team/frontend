import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes,faEye,faEyeSlash } from '@fortawesome/fontawesome-free-solid'
import {  Link } from "react-router-dom";
import {userLogin,getUserInfo} from '../../api/api'

import { connect } from "react-redux";
import {getUserInfos} from '../../state/user/user-action-creater';
import './auth.scss';

class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            account:'',
            accountErr:'',
            password:'',
            passwordErr:'',
            eye:false,
            loginreq:false,
            buttonActive:false,
        }
    }
    
    
    async login(){
        
        let res = (await userLogin(this.state.account,this.state.password))
        if(res.status === 200){
            console.log(res.data)
            sessionStorage.setItem('token',res.data.token)
            sessionStorage.setItem('username',this.state.account)
            let res1 = await getUserInfo(this.state.account)
            if(res1.status === 200){
                console.log(res1.data)
                let {getUserInfos}=this.props;
                getUserInfos(this.state.account)
                this.props.history.push("/home")
            }
        }
        // this.props.history.push("/home")
                
          
        

    }
    render(){
        
        
        const regAcc = /^\w+[A-Za-z0-9]+$/;
        const regPw = /^.*(?=.{6,16})(?=.*[A-Za-z]{2,})(?=.*[!@#$%^&*?\(\)]).*$/
        return(
       <div className='authbody' > 
        <div className='auth'>

            <header>    
                <div><FontAwesomeIcon icon={faTimes} style={{marginLeft:'10px',marginTop:'7px'}}/></div>
                <h2>Log in </h2>
            </header>
            <div className='auth__info'>
                <div>
                    <label>Account / (Email Account)</label>
                    <label>Account</label>
                    <input onChange={(e)=>{
                        this.setState({account:e.target.value})  
                        if(!regAcc.test(this.state.account)){
                            this.setState({accountErr:'Account format err'})
                        }else{
                            this.setState({accountErr:''})
                        }   
                        if(e.target.value === '' || this.state.accountErr !== ''){
                            this.setState({buttonActive:false})
                        }else if(this.state.password !== ''  && this.state.passwordErr === ''){
                            this.setState({buttonActive:true})                           
                        }        
                    }} value={this.state.account}></input>
                    <li>{this.state.accountErr}</li>
                </div>
                <div>
                    <label>Password</label>
                    <label>Password</label>
                    <input onChange={(e)=>{
                        let v=e.target.value;

                        if(this.state.eye){
                            //e.target.type='text'
                            this.setState({password:v})
                        }else{
                            //e.target.type='password'
                            this.setState({password:v})
                        }
                        if(!regPw.test(this.state.password)){
                            this.setState({passwordErr:'Password format err!'})
                        }else{
                            this.setState({passwordErr:''})
                        }
                        if(e.target.value === '' || this.state.passwordErr !== ''){
                            this.setState({buttonActive:false})
                        }
                        if(this.state.account !== ''&& this.state.accountErr === ''){
                            this.setState({buttonActive:true})
                            
                        }
                    }} value={this.state.passwords} 
                    type={this.state.eye?'text':'password'}></input>
                    {this.state.eye&&<i onClick={()=>{
                        this.setState({eye:false})

                    }}><FontAwesomeIcon icon={faEye}/></i>}
                    {!this.state.eye&&<i onClick={()=>{
                        this.setState({eye:true})
                    }}><FontAwesomeIcon icon={faEyeSlash}/></i>}
                    <li>{this.state.passwordErr}</li>
                </div>
            </div>
            <div className='auth__bt'>
                <button onClick={this.login.bind(this)} disabled={!this.state.buttonActive}>
                    Log in
                </button>
                
                <Link to='/signup'>Sign up</Link>
                <Link to='/changePassword'>Change password</Link>
                
                
            </div>
        </div>
         </div>
        
        )
    }
}
function mapStateToProps(state) {
    // console.log(state)
    return {
      user: state.user.current_user,     
    }
}
// export default Login
  
export default connect(mapStateToProps, { getUserInfos })(Login);