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
        postsExample:[
            {tag:'News',photo:'http://img4.a0bi.com/upload/ttq/20190115/1547565135450.jpeg?imageView2/0/w/600/h/800',content:'Today\'s covid19 update',poster:'Admin'},
            {tag:'Disccuss',photo:'http://img.qqzhi.com/uploads/2018-11-30/073745358.jpg',content:'New advises',poster:'Expert advisor'},
            {tag:'News',photo:'https://pbs.twimg.com/profile_images/1036730403514736650/PCRxFiEt_400x400.jpg',content:'News here!',poster:'Student'},
            {tag:'News',photo:'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',content:'Daily briefing',poster:'Student'},
            {tag:'Projects',photo:'https://m.96weixin.com/Upload/20190813/1565664062266270.jpg',content:'Today\'s national figures',poster:'Admin'},
            {tag:'Activities',photo:'http://m.imeitou.com/uploads/allimg/2018112616/0duynksoxpy.jpg',content:'Online Meeting of covid 19',poster:'Expert advisor'},
            {tag:'Qustion(Q&A)',photo:'http://m.imeitou.com/uploads/allimg/2018112616/l2lu0xxcmai.jpg',content:'What are the numbers in brackets?',poster:'Student'},
            {tag:'News',photo:'http://m.imeitou.com/uploads/allimg/2018092512/4plf33op4i3.jpg',content:'Highlight charts',poster:'Expert advisor'},
            {tag:'News',photo:'http://m.imeitou.com/uploads/allimg/2018112616/5uv0zdjau20.jpg',content:'Currently a large number of cases ',poster:'Student'},
            {tag:'Projects',photo:'https://i.redd.it/i8gcpj6gfig11.png',content:'Victorian epicurves ',poster:'Expert advisor'},
            {tag:'Activities',photo:'http://m.imeitou.com/uploads/allimg/2018092512/p3jlvqgvem3.jpg',content:'Case breakdowns',poster:'Admin'},
            {tag:'Qustion(Q&A)',photo:'http://m.imeitou.com/uploads/allimg/2018112616/fa2blcywepf.jpg',content:'How can I get a test?',poster:'Student'},
            {tag:'News',photo:'http://www.ghost64.com/qqtupian/zixunImg/local/2018/09/04/15360417389636.jpeg',content:'State and territory breakdowns ',poster:'Admin'},
            {tag:'Disccuss',photo:'https://img2.woyaogexing.com/2019/08/06/54e69736b55a41bba256f024ef4c88c2!400x400.webp',content:'Recoveries',poster:'Expert advisor'},
            {tag:'News',photo:'https://img2.woyaogexing.com/2019/08/06/986a9ea48e4d4d368625284e081400fd!400x400.webp',content:'When does an active case become a recovery?',poster:'Expert advisor'},
            {tag:'News',photo:'https://img2.woyaogexing.com/2019/08/06/668446d0e2df42a494f84f597a168d5e!400x400.webp',content:'daily cases versus reported ',poster:'Student'},
            {tag:'Projects',photo:'http://www.ghost64.com/qqtupian/zixunImg/local/2018/09/04/153604173826.jpeg',content:'New find!',poster:'Expert advisor'},       
            {tag:'Qustion(Q&A)',photo:'http://www.ghost64.com/qqtupian/zixunImg/local/2018/09/04/15360417395968.jpeg',content:'Timeline',poster:'Student'},
        ],
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