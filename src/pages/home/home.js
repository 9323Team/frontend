import React,{ PureComponent} from 'react'
import Menu from '../../containers/menu/menu'
import Ballon from '../../components/balloon/balloon'
import Popup from '../../containers/popup/popup'
import Footer from '../../components/footer/footer'
import Chatbot from '../../components/chatbot/chatbot'
import './home.scss'
// import chatbot from '../../components/chatbot/chatbot'

class Home extends PureComponent{
    constructor(){
        super();
        this.state = {
            chatFlag: false
        }
    }
    showHide=()=>{
        // console.log(this.state.chatFlag)
        if (this.state.chatFlag === true){
            this.setState({chatFlag: false})
        } else {
            this.setState({chatFlag: true})
        }
    }
    setChildData=(data)=>{
        this.setState({
          chatFlag:data
        })
    }
    render(){
        return(
            <>
            <Popup/>
            <div className="home">
                <Menu/> 
                <div className="home__chat">
                    <Ballon stroke="#16000C" fill="#FCBC40"/>
                    <button onClick={this.showHide}>Chat with me</button>
                    {this.state.chatFlag && <Chatbot setChildData ={this.setChildData}/>}
                </div>
                
                
                <div className="home__forum">
                    <Ballon stroke="#16000C" fill="#F27B86"/>
                    <button onClick={()=>{
                        this.props.history.replace('/forum')
                    }}>Discuss here</button>
                </div>
                <div className="home__vedio">
                <iframe  src="https://www.youtube.com/embed/bPITHEiFWLc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   
                <p>"Hot topic: <br/>Coronavirus"</p>
                </div>
                <div className="home__slogan">
                    <h3>Online Experiences</h3>
                    <h4>Now you can find the most professional info 
                        <br/>and people with medical skills on Unihelp
                    </h4>
                </div>
                
                <span>Pic:Hi<br/>Ig:muitmood</span>
            </div>
            <Footer/>
            </>
        )
    }
}
export default Home;