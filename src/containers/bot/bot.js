import React,{Component} from 'react'
import './bot.scss'

export default function Bot(props){
    
    function sendTo(){
            props.showHide(false)
     }

    return(
            
        <div className='bot'>
            <div className='bot__informDiv'>Chat with me
            </div> 
            <button className='bot__chatbotBtn' onClick={sendTo}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSN40MBAAgfdFAEuBxnOqDwLjM8X_o5E4fNPAvqX77Z6YUuAs0nBcZqXwuAhozySskH3AdYmVrY9juC1g&usqp=CAU" 
            alt="" className='bot__chatbotImg'>
            </img>
            </button>
        </div>
        )
    
    
}
