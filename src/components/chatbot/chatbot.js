import React, { Component,useState,useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimesCircle, faTimes, faCommentDots, faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import './chatbot.scss'
import {getMessage} from '../../api/api'
export default function Chatbot(props){
    let [showFlag,setFlag] = useState(true);
    let [searchString,setSearch] =useState('');
    let [lists, setList] = useState([]);
    // { flag:'bot',values:'hi'},{ flag:'user',values:'a'},{ flag:'bot',values:'b'}
    let [messagesEnd, setMessage] =useState('');
    let [topic, setTopic] =useState('');
    let [uname, setName] =useState('');
    useEffect( ()=>{
        scrollToBottom();
        
    },[lists,messagesEnd, showFlag, searchString, topic]);

    async function postMessage(m){
        
        let res = (await getMessage("Soandso", m, {
            "topic": topic,
            "name": "Soandso"
        }
    )).data
        console.log(res)
        if (res.status === 'ok'){
            answerFromBot(res);
        }
        // return res.status
        
    }
    function answerFromBot(res) {
        let x = lists
            x.push({flag:'bot' ,values: res.reply})
            // setList([...lists, {flag:'bot' ,values: res.reply}])
            
            setList(x)
            setTopic(res.vars.topic)
            setSearch('')
    }
    function showchat(){
        setFlag(false)
        sendData();
    }
    function sendData(){
        props.setChildData(false)
    }
    async function send(){
        if (searchString !== ''){
            let y = lists
            y.push({flag:'user' ,values:searchString})
            // setList([...lists, {flag:'user' ,values:searchString}])
            setList(y)
            // for(let t = Date.now(); Date.now() - t <= 3000;);
            // setTimeout(()=>postMessage(searchString), 1000)
            postMessage(searchString)
            setSearch(' ')
            // setSearch('')
        }
        
    }
    function returnValue(){
        return (
            lists.map((names, index) => {
                if (names.flag === 'bot'){
                    // for(let t = Date.now(); Date.now() - t <= 200;);
                    return (<div className='chatbot__returnBot'>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSN40MBAAgfdFAEuBxnOqDwLjM8X_o5E4fNPAvqX77Z6YUuAs0nBcZqXwuAhozySskH3AdYmVrY9juC1g&usqp=CAU" alt="" className='chatbot__inlineImg'></img>
                                <span className='chatbot__inlineTitle'>Unihelp chatbot</span>
                                <div className='chatbot__botMessage'>{names.values}</div>
                            </div>)
                } else {
                    // for(let t = Date.now(); Date.now() - t <= 200;);
                    return (
                            <div className='returnUser'>
                                <span className='chatbot__userTitle'>Me</span>
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
      }
    function handleShow(e){
        console.log(1)
        setSearch(e.target.value)
    }
    function showHide(){
        return(
            
            <div className='chatbot'>
            <div className='chatbot__top'>
                <div className="chatbot__colorStatus"></div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSN40MBAAgfdFAEuBxnOqDwLjM8X_o5E4fNPAvqX77Z6YUuAs0nBcZqXwuAhozySskH3AdYmVrY9juC1g&usqp=CAU" alt="" className='chatbot__img'></img>
                {/* https://images.idgesg.net/images/article/2018/02/artificial_intelligence_ai_virtual_assistant_robot_chatbot_thinkstock_856909876-100749925-large.jpg */}
                {/* https://cdn.chatbot.com/widget/5ec388b55e5b6a00078b25ae/oJmzXHfB5w__.png */}
                {/* <div className='chatbot__status'></div> */}
                <div className='chatbot__title'>Unihelp chatbot</div>
                <div className='chatbot__status'>Online</div>
                <div className='chatbot__topCloseIcon' >
                <button className='chatbot__closeButton' onClick={()=>showchat()}><FontAwesomeIcon style={{fontSize:'20px' ,color:' rgb(150, 155, 166)'}} icon={faTimes}/></button>
                </div>
                
            </div>
            <div className='chatbot__frame' ref={(el) => { setMessage(el)  }}>

                {returnValue()}

            </div>
            <div className='chatbot__input'>
                <input className='chatbot__inputLine' type='text' maxLength='256' placeholder='Type your message here' value={searchString} onChange={handleShow}></input>
                {/* <button onClick={()=>send()} type='submit'>send</button> */}
                <button className='chatbot__sendButton' onClick={()=>send()} ><FontAwesomeIcon  style={{fontSize:'25px' ,color:' rgb(150, 155, 166)'}} icon={faPaperPlane}/></button>
            </div>
            <div className='chatbot__bottom'>
                <p className='chatbot__bottomLine'>COMP 9323 - Group 3</p>
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