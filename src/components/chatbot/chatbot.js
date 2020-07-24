import React, { Component,useState,useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimesCircle, faTimes, faCommentDots, faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import './chatbot.scss'
import {getMessage} from '../../api/api'


export default function Chatbot(props){
    let [showFlag,setFlag] = useState(true);
    let [searchString,setSearch] =useState('');
    let [lists, setList] = useState([{ flag:'bot',values:'hi', url:''}]);
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
        x.pop();
        console.log(res)
        let new_list = res.reply.split('<a href = "')
        console.log(new_list)
        if (new_list.length > 1) {
            let new_reply = new_list[1].split('">Click here</a>')
            console.log(new_reply)
            let rep = []
            rep.push(new_list[0])
            rep.push(new_reply[1])
            let z = rep.join('/*/')
            x.push({flag:'bot' ,values: z, url: new_reply[0]})
        } else {
            x.push({flag:'bot' ,values: res.reply, url: ''})
        }
        
        
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
    function inputKeyUp(e){
        // console.log(e.keyCode)
        if(e.keyCode===13){
            send();
        }
    }
    async function send(){
        if (searchString !== ''){
            let y = lists
            y.push({flag:'user' ,values:searchString, url:''})
            // setList([...lists, {flag:'user' ,values:searchString}])
            setList(y)
            // for(let t = Date.now(); Date.now() - t <= 3000;);
            y.push({flag:'bot', values:'. . .', url:''})
            setTimeout(()=>postMessage(searchString), 1000)
            // postMessage(searchString)
            setSearch(' ')
            // setSearch('')
        }
        
    }
    function returnValue(){
        return (
            lists.map((names, index) => {
                if (names.flag === 'bot'){

                    // for(let t = Date.now(); Date.now() - t <= 200;);
                    if (names.values === '. . .'){
                        return (<div className='chatbot__returnBot'>
                        <button className='chatbot__nouseBtn'>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSN40MBAAgfdFAEuBxnOqDwLjM8X_o5E4fNPAvqX77Z6YUuAs0nBcZqXwuAhozySskH3AdYmVrY9juC1g&usqp=CAU" alt="" className='chatbot__inlineImg'></img>
                            </button>
                                <span className='chatbot__inlineTitle'>Unihelp chatbot</span>
                                <div className='chatbot__botMessage'><div className='chatbot__typing'>{names.values}</div></div>
                            </div>)
                    }
                    else{
                        if (names.url === ''){
                            return (<div className='chatbot__returnBot'>
                        <button className='chatbot__nouseBtn'>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSN40MBAAgfdFAEuBxnOqDwLjM8X_o5E4fNPAvqX77Z6YUuAs0nBcZqXwuAhozySskH3AdYmVrY9juC1g&usqp=CAU" alt="" className='chatbot__inlineImg'></img>
                            </button>
                                <span className='chatbot__inlineTitle'>Unihelp chatbot</span>
                                <div className='chatbot__botMessage'>{names.values}</div>
                            </div>)
                        } else {
                            let result_list = names.values.split('/*/')
                            return (<div className='chatbot__returnBot'>
                            <button className='chatbot__nouseBtn'>
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSN40MBAAgfdFAEuBxnOqDwLjM8X_o5E4fNPAvqX77Z6YUuAs0nBcZqXwuAhozySskH3AdYmVrY9juC1g&usqp=CAU" alt="" className='chatbot__inlineImg'></img>
                                </button>
                                    <span className='chatbot__inlineTitle'>Unihelp chatbot</span>
                        <div className='chatbot__botMessage'>{result_list[0]}<a href = {names.url} target="_blank">Click here.</a>{result_list[1]}</div>
                                </div>)
                        }
                        
                    }
                    
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
                <input className='chatbot__inputLine' type='text' maxLength='256' placeholder='Type your message here' value={searchString} onChange={handleShow} onKeyUp={inputKeyUp}></input>
                {/* <button onClick={()=>send()} type='submit'>send</button> */}
                <button className='chatbot__sendButton' onClick={()=>send()} ><FontAwesomeIcon  style={{fontSize:'25px' ,color:' rgb(150, 155, 166)'}} icon={faPaperPlane}/></button>
                
            </div>
            <div className='chatbot__bottom'>
                {/* <p className='chatbot__bottomLine'>COMP 9323 - Group 3</p> */}
            </div>

            </div>
        
        )
    }

    return (
        
        <>

        <div> {showFlag && showHide()}</div>
        

        {/* <ReactCSSTransitionGroup   
            className="example"
            transitionAppear={true}
            transitionAppearTimeout={500}>
        <div> {showFlag && showHide()}</div>
        </ReactCSSTransitionGroup> */}
       </>
        
        
    )
}