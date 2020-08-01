import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/fontawesome-free-solid'
import {signUp} from '../../api/api'


import './signup.scss';
import './auth.scss';

export default class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            account:'',
            password:'',
            passwordR:'',
            passwordErr:'',
            passwordRErr:'',
            email:'',
            emailErr:'',
            role:'',
        }
    }
    
    
    async signUpHandler(){ 
        if(this.state.password !== this.state.passwordR){
            alert('Two inputs are different!')
            return
        }
        if(this.state.account !== '' && 
        this.state.password !== '' &&
        this.state.passwordR !== ''&&
        this.state.role !== ''&&
        this.state.email !== ''
        ){
            let res =(await signUp({
                "username": this.state.account,
                "userphoto": "",
                "password": this.state.password,
                "email": this.state.email,
                "organization": 'Unihelp',
                "role": this.state.role
                
            }));
                
             
            if(res.status === 200){
                alert('Sign up success!')
                this.props.history.replace("/login")
            }
        
        }else{
            alert('Input can not be null')
        }
      
        

    }
    render(){
        const regAcc = /^\w+[A-Za-z0-9]+$/;
        const regPw = /^.*(?=.{6,16})(?=.*[A-Za-z]{2,})(?=.*[!@#$%^&*?\(\)]).*$/
        return(
            <div className='authbody' > 
        <div className='auth' style={{height:'700px'}}>

            <header>    
                <div><FontAwesomeIcon icon={faTimes} style={{marginLeft:'10px',marginTop:'7px'}}/></div>
                <h2 style={{width:'210px',marginLeft:'calc(50% - 105px)'}}>Sign Up </h2>
            </header>
            <div style={{fontSize:'15px',textAlign:'center',width:'80%',marginLeft:'8%',color:'#E51E56'}}>
            <label >(Password must contain more than 2 letter, 1 special character & <br/>At least 6 characters, at most 16 characters)</label>
            </div>
            
            <div className='pw__info'>
            
                <div>                  
                    <label>Account</label>
                    <input onChange={(e)=>{
                        
                        this.setState({account:e.target.value})
                                   
                    }} value={this.state.account}></input>
                    
                </div>
                <div>                  
                    <label>Email</label>
                    <input onChange={(e)=>{
                        
                        this.setState({email:e.target.value})
                        const regAcc = /^\w+(-\w+)*@[A-Za-z0-9]+((.|-)*[A-Za-z0-9]+).[A-Za-z0-9]+$/;
                        if(!regAcc.test(this.state.email)){//校验account是否符合邮件格式
                            this.setState({emailErr:'Account format err'})
                        }else{
                            this.setState({emailErr:''})
                        }            
                    }} value={this.state.email}></input>
                    <li>{this.state.emailErr}</li>
                </div>
                <div>                  
                    <label>Role</label>
                    <input onChange={(e)=>{
                        
                        this.setState({role:e.target.value})

                                   
                    }} value={this.state.role}></input>
                  
                </div>
                <div>

                    
                    <label>Password</label>
                    <input onChange={(e)=>{
                        
                        let v=e.target.value;
                        
                        this.setState({password:v})
                        if(!regPw.test(this.state.password)){//校验account是否符合邮件格式
                            this.setState({passwordErr:'Password format err'})
                        }else{
                            this.setState({passwordErr:''})
                        }
                        
                    }} type='password' value={this.state.password}></input>
                    <li>{this.state.passwordErr}</li>
                </div>
                <div>                 
                    <label>Repeat The Password</label>
                    <input onChange={(e)=>{
                       
                        let v=e.target.value;
                        
                        this.setState({passwordR:v})
                        setTimeout(()=>{if(this.state.passwordR !== this.state.password){
                            this.setState({passwordRErr:'Two inputs are different'})
                        }else if(!regPw.test(this.state.passwordR)){
                            this.setState({passwordRErr:'Password format err'})
                        }else{
                            this.setState({passwordRErr:''})
                        }},100)
                        
                    }} type='password' value={this.state.passwordR}></input>
                    <li>{this.state.passwordRErr}</li>
                </div>
            </div>
            <div className='auth__bt' style={{width:'75%'}}>
                <button style={{marginTop:'55px'}}
                onClick={this.signUpHandler.bind(this)}
                >Submit</button>               
            </div>
        </div>
        </div>
        )
    }
}
