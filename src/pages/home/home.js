import React,{ PureComponent} from 'react'
import Menu from '../../containers/menu/menu'
import Ballon from '../../components/balloon/balloon'
import Popup from '../../containers/popup/popup'
import Bot from '../../containers/bot/bot'
import Footer from '../../components/footer/footer'
import Chatbot from '../../components/chatbot/chatbot'
import './home.scss'
import Welcome from '../../asserts/tommy.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import {getUserInfos} from '../../state/user/user-action-creater';
import { connect } from "react-redux";

class Home extends PureComponent{
    state={
        
        dialogExample:[
            {role:'User',photo:'🎃',content:'Hello!'},
            {role:'Uni',photo:'🤖',content:'Hi! How can I help you?'},
            {role:'User',photo:'🎃',content:'I’m sick and I want to see a doctor.'},
            {role:'Uni',photo:'🤖',content:'Oh, sorry hear this. Is an emergency?'},
            {role:'User',photo:'🎃',content:'No，I’m sick and I want to see a doctor.'},
            {role:'Uni',photo:'🤖',content:'Of course, you can make an appointment with the UNSW Health Service by calling 9385 5425 or by logging in to our Appointuit appointment booking system through this link: https://widget. appointuit. com/prac_40675/log_in'},
        ],
        chatFlag: false,
        robotFlag: true,
        initanimate:[false,false,false,false,false,false],
        intersectionObserver:[]
    }
    showHide=()=>{
       
        if (this.state.chatFlag === true){
            
            this.setState({chatFlag: false, robotFlag: true})
        } else {
            
            this.setState({chatFlag: true, robotFlag: false})
        }
    }
    setChildData=(data)=>{
       
        this.setState({
          chatFlag:data,
          robotFlag:true
        })
    }
    componentWillUnmount(){
        this.state.intersectionObserver.map((item,index)=>{
            item.unobserve(document.getElementById(index));
        })
    }
    componentDidMount(){
        
        const {getUserInfos}=this.props
        if(!this.props.user.auth){
            getUserInfos(sessionStorage.getItem('username'))
        }
        this.state.dialogExample.map((item,index)=>{
            var intersectionObserver = new IntersectionObserver(function(entries) {
                
                document.getElementById(index).classList.add('animate')
                
                if (entries[0].intersectionRatio <= 0&&document.getElementById(index).classList.contains('animate')){
                    document.getElementById(index).classList.remove('animate')
                    
                    return
                };
                
                
               
                
              });
           
            let arr=[...this.state.intersectionObserver,intersectionObserver]
            this.setState({intersectionObserver:arr})
            intersectionObserver.observe(document.getElementById(index));


            
        })
        
    }
    render(){
        return(
            <div className='homebox' ref="myscroll">
            <Popup/>
            {/* {this.state.robotFlag && <Bot showHide={this.showHide}/> }
            {this.state.chatFlag && <Chatbot setChildData ={this.setChildData}/>} */}
            <div className="home">
                <Menu/> 
                <div className="home__info">
                    <h1>Hello, Welcome to UniHelp.</h1>
                    <h2>
                        We are here to help you with your struggles.<br/>
                        Please visit our forums and speak with our chatbot<br/> and 
                        we will do our best to support you.
                    </h2>
                    <div className='home__btnbox'>

                        <button className='home__btn' onClick={()=>{
                            this.props.history.replace('/how-it-works')
                        }}>How this works</button>

                        <button className='home__btn' onClick={()=>{
                            this.props.history.replace('/forum')
                        }}>Discuss here</button>
                    </div>
                    
                </div>
                
                
                
                
                 
                
            
                
                
            </div>
            <div className='home__chatbotBox'>
                <section className='home__forumBox-description'>
                    <h2>Chatbot</h2>
                    <h3>An easy-to-use chatbot to help address student’s queries and<br/> assist them in finding solutions and resources regarding their queriesregarding their well being</h3>
                </section>
                <section className='home__chatbotBox-into'>
                    
                </section>
                <section className='home__chatbotBox-dialog'>
                    {this.state.dialogExample.map((item,index)=><div className='dialog'>
                    
                        {item.role ==='User'&&
                        <div className='dialog__user' id={index} key={index} >
                            <div className='dialog__user-photo'>
                                <FontAwesomeIcon icon={faUser}/>
                                {/* <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQhr-pGCr0voazj2_UJsHEVkFmiKNyYiSTvu8zfxhIcFfiTD6SGsCmXskQL5bvfEAAr4ZIlS2NqN6Yhr0oJ19rp-A&usqp=CAU&ec=45682161'></img> */}
                            </div>
                            <div className='dialog__user-frame'><p>{item.content}</p></div>
                        </div>}
                        {item.role ==='Uni'&&<div className='dialog__robot' id={index} key={index}>
                            <div className='dialog__robot-photo'>
                                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSN40MBAAgfdFAEuBxnOqDwLjM8X_o5E4fNPAvqX77Z6YUuAs0nBcZqXwuAhozySskH3AdYmVrY9juC1g&usqp=CAU'></img>
                            </div>
                            <div className='dialog__robot-frame'><p>{item.content}</p></div>
                        </div>}
                    </div>)}
                    
                </section>
                
            </div>
           
            <Footer/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      user: state.user.current_user,     
    }
}
// export default Login
  
export default connect(mapStateToProps, { getUserInfos })(Home);
