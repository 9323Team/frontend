import React, { Component,useState,useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimesCircle, faTimes, faCommentDots, faPaperPlane, faUser} from '@fortawesome/free-solid-svg-icons'
import './chatbot.scss'
import {getMessage} from '../../api/api'


export default function Chatbot(props){
    let [showFlag,setFlag] = useState(true);
    let [searchString,setSearch] =useState('');
    let [lists, setList] = useState([{ flag:'bot',values:'Hi!', url:''}]);
    //default message from chatbot
    let [messagesEnd, setMessage] =useState('');
    let [topic, setTopic] =useState('');
    let [uname, setName] =useState('');

    useEffect( ()=>{
        scrollToBottom();   
    },[lists,messagesEnd, showFlag, searchString, topic]);

    

    async function postMessage(m){
        //send message to backend
        let res = (await getMessage("Student", m, {
            "topic": topic,
            "name": "Student"
        }
        )).data
        if (res.status === 'ok'){
            answerFromBot(res);
        }      
    }
    function answerFromBot(res) {
        let x = lists
        x.pop();
        let new_list = res.reply.split('&*&')
        //check if there are urls in message
        let ret = []
        let rel = []
        if (new_list.length > 1) {
            x.push({flag:'bot' ,values: res.reply, url: '1'})
        } else {
            x.push({flag:'bot' ,values: res.reply, url: ''})
        }        
        setList(x)
        setTopic(res.vars.topic)
        setSearch('')
    }
    function showchat(){
        //close
        setFlag(false)
        sendData();
    }
    function sendData(){
        //when click close button, send action to father class by using the given function
        props.setChildData(false)
    }
    function inputKeyUp(e){
        //press enter to trick the send action
        if(e.keyCode===13){
            send();
        }
    }
    async function send(){
        //send user's message to backend
        if (searchString !== ''){
            let y = lists
            y.push({flag:'user' ,values:searchString, url:''})
            setList(y)
            y.push({flag:'bot', values:'. . .', url:''})
            //add typing process
            setTimeout(()=>postMessage(searchString), 1000)
            //make sure typing is showing
            setSearch(' ')
        }
        
    }
    function changeColor(){
        let newColor = document.getElementsByClassName('chatbot__linkBtn')[0].style.backgroundColor = 'rgb(149, 157, 165)'
        //change the button's color
    }
    function returnValue(){
        return (
            lists.map((names, index) => {
                if (names.flag === 'bot'){
                    if (names.values === '. . .'){
                        //typing animation
                        return (<div className='chatbot__returnBot'>
                        <button className='chatbot__nouseBtn'>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSN40MBAAgfdFAEuBxnOqDwLjM8X_o5E4fNPAvqX77Z6YUuAs0nBcZqXwuAhozySskH3AdYmVrY9juC1g&usqp=CAU" 
                            alt="" className='chatbot__inlineImg'></img>
                            </button>
                                <div className='chatbot__botMessage'><div className='chatbot__typing'>{names.values}</div></div>
                            </div>)
                    }
                    else{
                        if (names.url === ''){
                            //if returned message from backend doest contain url
                            return (<div className='chatbot__returnBot'>
                        <button className='chatbot__nouseBtn'>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSN40MBAAgfdFAEuBxnOqDwLjM8X_o5E4fNPAvqX77Z6YUuAs0nBcZqXwuAhozySskH3AdYmVrY9juC1g&usqp=CAU"
                             alt="" className='chatbot__inlineImg'></img>
                            </button>
                                <div className='chatbot__botMessage'>{names.values}</div>
                            </div>)
                        } else {
                            //if returned message from backend has url
                            let result_list = names.values.split('&*&')
                            //spilt url and words
                            let result_final = []
                            return (<div className='chatbot__returnBot'>
                                <button className='chatbot__nouseBtn'>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSN40MBAAgfdFAEuBxnOqDwLjM8X_o5E4fNPAvqX77Z6YUuAs0nBcZqXwuAhozySskH3AdYmVrY9juC1g&usqp=CAU" 
                                alt="" className='chatbot__inlineImg'></img>
                                </button>
                                <div className='chatbot__botMessage'>
                                {result_list.map((ids, index)=>{
                                if (index === 0 || index % 2 === 0){
                                    return <span><span>{ids}</span><br></br></span>
                                } else {
                                    return <button className='chatbot__linkBtn'><a href = {ids} className='chatbot__link' target="_blank">Click here</a></button>
                                }
                            })}
                            </div>
                                </div>)
                        }
                        
                    }                    
                } else {
                    //user part, avatar and the message
                    return (
                            <div className='returnUser'>
                                <button className='chatbot__nBtn'>
                                <FontAwesomeIcon className='chatbot__userTitle' icon={faUser}/>
                                </button>
                                <div className='chatbot__userMessage'>                                    
                                    {names.values}</div>
                            </div>
                            )
                }             
            }))
        
    }
    function scrollToBottom() {
        if (messagesEnd) {
            const scrollHeight = messagesEnd.scrollHeight;
            const height = messagesEnd.clientHeight;
            const maxScrollTop = scrollHeight - height; 
            messagesEnd.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
        }
        //control the scroll at the bottom of div
      }
    function handleShow(e){
        setSearch(e.target.value)
    }
    function showHide(){
        return(
            
            <div className='chatbot'>
            <div className='chatbot__top'>
                <div className="chatbot__colorStatus"></div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSN40MBAAgfdFAEuBxnOqDwLjM8X_o5E4fNPAvqX77Z6YUuAs0nBcZqXwuAhozySskH3AdYmVrY9juC1g&usqp=CAU" 
                alt="" className='chatbot__img'></img>
                <div className='chatbot__title'>Unihelp</div>
                <div className='chatbot__status'>Online</div>
                <div className='chatbot__topCloseIcon' >
                <button className='chatbot__closeButton' onClick={()=>showchat()}><FontAwesomeIcon className='chatbot__closeIcon' icon={faTimes}/></button>
                </div>
                
            </div>
            <div className='chatbot__frame' ref={(el) => { setMessage(el)  }}>
                {returnValue()}
            </div>
            <div className='chatbot__input'>
                <input className='chatbot__inputLine' type='text' maxLength='256' placeholder='Type your message here' 
                value={searchString} onChange={handleShow} onKeyUp={inputKeyUp}></input>
                <button className='chatbot__sendButton' onClick={()=>send()} ><FontAwesomeIcon className='chatbot__sendIcon' icon={faPaperPlane}/></button>
            </div>
            <div className='chatbot__bottom'>
            </div>

            </div>
        
        )
    }

    return (
        
        <>
        <div> {showFlag && showHide()}</div>
       </>
        
        
    )
}
