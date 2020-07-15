import React, { Component,useState,useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimesCircle, faTimes, faCommentDots} from '@fortawesome/free-solid-svg-icons'
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
    },[showFlag, searchString, lists,messagesEnd, topic]);

    async function postMessage(m){
        
        const res = (await getMessage("Soandso", m, {
            "topic": topic,
            "name": "Soandso"
        }
    )).data
        console.log(res)
        if (res.status === 'ok'){
            let x = lists
            x.push({flag:'bot' ,values: res.reply})
            // setList([...lists, {flag:'bot' ,values: res.reply}])
            setList(x)
            setTopic(res.vars.topic)

        }
        return res.status
        
    }
    function showchat(){
        setFlag(false)
        sendData();
    }
    function sendData(){
        props.setChildData(false)
    }
    async function send (e){
        if (searchString !== ''){
            let y = lists
            y.push({flag:'user' ,values:searchString})
            // setList([...lists, {flag:'user' ,values:searchString}])
            setList(y)
            setTimeout(()=>postMessage(searchString), 2000)
            setSearch('')
        }
        
    }
    function returnValue(){
        return (
            lists.map((names, index) => {
                if (names.flag === 'bot'){
                    return <div className='chatbot__botMessage'>{names.values}</div>
                } else {
                    return <div className='chatbot__userMessage'>{names.values}</div>
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
      setSearch(e.target.value)
    }
    function showHide(){
        return(
            
            <div className='chatbot'>
            <div className='chatbot__top'>
                <img src="https://cdn.chatbot.com/widget/5ec388b55e5b6a00078b25ae/oJmzXHfB5w__.png" alt="" className='chatbot__img'></img>
                {/* <div className='chatbot__status'></div> */}
                <p className='chatbot__title'>Unihelp chatbot</p>
                <div className='chatbot__topCloseIcon' >
                <button className='chatbot__closeButton' onClick={()=>showchat()}><FontAwesomeIcon style={{fontSize:'35px' ,color:' rgb(150, 155, 166)'}} icon={faTimes}/></button>
                </div>
                
            </div>
            <div className='chatbot__frame' ref={(el) => { setMessage(el)  }}>

                {returnValue()}

            </div>
            <div className='chatbot__input'>
                <input className='chatbot__inputLine' type='text' maxLength='256' placeholder='Type your message here' value={searchString} onChange={handleShow}></input>
                {/* <button onClick={()=>send()} type='submit'>send</button> */}
                <button onClick={()=>send()} type='submit'><FontAwesomeIcon  style={{fontSize:'30px' ,color:' rgb(150, 155, 166)', paddingLeft:'20px' }} icon={faCommentDots}/></button>
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