import React,{ PureComponent} from 'react'
import Menu from '../../containers/menu/menu'
import Footer from '../../components/footer/footer'
import Chatbot from '../../components/chatbot/chatbot'
import './works.scss'
import Welcome from '../../asserts/tommy.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

class Works extends PureComponent{
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
        intersectionObserver:[]
        // initanimate:[false,false,false,false,false,false]
    }
    showHide=()=>{
        // console.log(this.state.chatFlag)
        if (this.state.chatFlag === true){
            // for(let t = Date.now(); Date.now() - t <= 500;);
            this.setState({chatFlag: false, robotFlag: true})
        } else {
            // for(let t = Date.now(); Date.now() - t <= 500;);
            this.setState({chatFlag: true, robotFlag: false})
        }
    }
    setChildData=(data)=>{
        // for(let t = Date.now(); Date.now() - t <= 500;);
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
        
          
        this.state.dialogExample.map((item,index)=>{
            var intersectionObserver = new IntersectionObserver(function(entries) {
                // If intersectionRatio is 0, the target is out of view
                // and we do not need to do anything.
                document.getElementById(index).classList.add('animate')
                if (entries[0].intersectionRatio <= 0){
                    document.getElementById(index).classList.contains('animate')&&document.getElementById(index).classList.remove('animate')
                    return
                };
                
                
                
              });
              // start observing
            let arr=[...this.state.intersectionObserver,intersectionObserver]
            this.setState({intersectionObserver:arr})
            intersectionObserver.observe(document.getElementById(index));


            
        })
        
    }
    render(){
        return(
            <div className='homebox' ref="myscroll">
       
            {this.state.robotFlag && <div><div className='home__informDiv'>Chat with me</div> <button className='home__chatbotBtn' onClick={this.showHide}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSN40MBAAgfdFAEuBxnOqDwLjM8X_o5E4fNPAvqX77Z6YUuAs0nBcZqXwuAhozySskH3AdYmVrY9juC1g&usqp=CAU" alt="" className='home__chatbotImg'>
                    </img>
                    </button></div> }
            {this.state.chatFlag && <Chatbot setChildData ={this.setChildData}/>}
           
                <Menu/> 
                <div className="home__vedio">
                <section className='home__forumBox-description'>
                    <h2>FAQs</h2>
                    <h3>Frequently asked questions and answers on current hot issues</h3>
                </section>
                <div style={{display:'flex',justifyContent:'center'}}>
                    <iframe width="860" height="455" src="https://www.youtube.com/embed/bPITHEiFWLc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                
   
                
            </div>     
            <div className='home__forumBox'>
                
            <section className='home__forumBox-description'>
                <h2>Forum Community</h2>
                <h3>An online student community by promoting events <br/>being held by the UNSW community</h3>
            </section>
            <section className='home__forumP go-left'>
                {this.state.postsExample.map((item,index)=>
                <div className='home__forumP-post' key={index}>
                        <span>{item.tag}</span>
                        <div className='home__forumP-post-content'>
                            <img src={item.photo}></img>
                            <h5>{item.content}</h5>
                        </div>
                        <div 
                        className={
                            (item.poster === 'Admin' && 'home__forumP-post-role admin')||
                            (item.poster === 'Expert advisor' && 'home__forumP-post-role expert')||
                            (item.poster === 'Student' && 'home__forumP-post-role student')
                            }>
                        <svg height="16" width="16" 
                        className={"star"+' '+(item.poster === 'Admin' && 'admin')||
                        (item.poster === 'Expert advisor' && 'expert')||
                        (item.poster === 'Student' && 'student')}
                         viewBox="0 0 24 24">
                            <path fill={
                                (item.poster === 'Admin' && 'red')||
                                (item.poster === 'Expert advisor' && 'green')||
                                (item.poster === 'Student' && 'black')
                            } d="M16.2 8.16l4.74.73a1.23 1.23 0 0 1 .67 2.11l-3.46 3.28a1.23 1.23 0 0 0-.37 1.1l.77 4.68a1.24 1.24 0 0 1-1.82 1.29L12.5 19.1a1.28 1.28 0 0 0-1.16 0l-4.27 2.17A1.25 1.25 0 0 1 5.27 20l.85-4.68a1.19 1.19 0 0 0-.34-1.09l-3.41-3.4a1.23 1.23 0 0 1 .71-2.1l4.75-.64a1.26 1.26 0 0 0 .95-.67l2.16-4.24a1.25 1.25 0 0 1 2.24 0l2.09 4.28a1.22 1.22 0 0 0 .93.7z"></path>
                        </svg>  {item.poster}
                        </div>
                </div>)}
                
                    <div className='home__forumP-post'>
                        <span>News</span>
                        <div className='home__forumP-post-content'>
                            <img></img>
                            <h5>Content</h5>
                        </div>
                        <div className='home__forumP-post-role'>
                        <svg height="16" width="16" className="star" viewBox="0 0 24 24">
                            <path d="M16.2 8.16l4.74.73a1.23 1.23 0 0 1 .67 2.11l-3.46 3.28a1.23 1.23 0 0 0-.37 1.1l.77 4.68a1.24 1.24 0 0 1-1.82 1.29L12.5 19.1a1.28 1.28 0 0 0-1.16 0l-4.27 2.17A1.25 1.25 0 0 1 5.27 20l.85-4.68a1.19 1.19 0 0 0-.34-1.09l-3.41-3.4a1.23 1.23 0 0 1 .71-2.1l4.75-.64a1.26 1.26 0 0 0 .95-.67l2.16-4.24a1.25 1.25 0 0 1 2.24 0l2.09 4.28a1.22 1.22 0 0 0 .93.7z"></path>
                        </svg>
                          professional
                        </div>
                </div>
            </section>
             <section className='home__forumP go-right'> 
                {this.state.postsExample.map((item,index)=>
                <div className='home__forumP-post' key={index}>
                        <span>{item.tag}</span>
                        <div className='home__forumP-post-content'>
                            <img src={item.photo}></img>
                            <h5>{item.content}</h5>
                        </div>
                        <div 
                        className={
                            (item.poster === 'Admin' && 'home__forumP-post-role admin')||
                            (item.poster === 'Expert advisor' && 'home__forumP-post-role expert')||
                            (item.poster === 'Student' && 'home__forumP-post-role student')
                            }>
                        <svg height="16" width="16" 
                        className={"star"+' '+(item.poster === 'Admin' && 'admin')||
                        (item.poster === 'Expert advisor' && 'expert')||
                        (item.poster === 'Student' && 'student')}
                         viewBox="0 0 24 24">
                            <path fill={
                                (item.poster === 'Admin' && 'red')||
                                (item.poster === 'Expert advisor' && 'green')||
                                (item.poster === 'Student' && 'black')
                            } d="M16.2 8.16l4.74.73a1.23 1.23 0 0 1 .67 2.11l-3.46 3.28a1.23 1.23 0 0 0-.37 1.1l.77 4.68a1.24 1.24 0 0 1-1.82 1.29L12.5 19.1a1.28 1.28 0 0 0-1.16 0l-4.27 2.17A1.25 1.25 0 0 1 5.27 20l.85-4.68a1.19 1.19 0 0 0-.34-1.09l-3.41-3.4a1.23 1.23 0 0 1 .71-2.1l4.75-.64a1.26 1.26 0 0 0 .95-.67l2.16-4.24a1.25 1.25 0 0 1 2.24 0l2.09 4.28a1.22 1.22 0 0 0 .93.7z"></path>
                        </svg>  {item.poster}
                        </div>
                </div>)}
                
                    <div className='home__forumP-post'>
                        <span>News</span>
                        <div className='home__forumP-post-content'>
                            <img></img>
                            <h5>Content</h5>
                        </div>
                        <div className='home__forumP-post-role'>
                        <svg height="16" width="16" className="star" viewBox="0 0 24 24">
                            <path d="M16.2 8.16l4.74.73a1.23 1.23 0 0 1 .67 2.11l-3.46 3.28a1.23 1.23 0 0 0-.37 1.1l.77 4.68a1.24 1.24 0 0 1-1.82 1.29L12.5 19.1a1.28 1.28 0 0 0-1.16 0l-4.27 2.17A1.25 1.25 0 0 1 5.27 20l.85-4.68a1.19 1.19 0 0 0-.34-1.09l-3.41-3.4a1.23 1.23 0 0 1 .71-2.1l4.75-.64a1.26 1.26 0 0 0 .95-.67l2.16-4.24a1.25 1.25 0 0 1 2.24 0l2.09 4.28a1.22 1.22 0 0 0 .93.7z"></path>
                        </svg>
                          professional
                        </div>
                </div>
            </section>
        
            
            </div>
            <div className='home__chatbotBox2'>
                <section className='home__forumBox-description'>
                    <h2>Chatbot</h2>
                    <h3>An easy-to-use chatbot to help address student’s queries and<br/> assist them in finding solutions and resources regarding their queriesregarding their well being</h3>
                </section>
                <section className='home__chatbotBox2-into'>
                    
                </section>
                <section className='home__chatbotBox2-dialog2'>
                    {this.state.dialogExample.map((item,index)=><div className='dialog2'>
                    
                        {item.role ==='User'&&
                        <div className='dialog2__user' id={index} key={index} >
                            <div className='dialog2__user-photo'>
                                <FontAwesomeIcon icon={faUser}/>
                                {/* <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQhr-pGCr0voazj2_UJsHEVkFmiKNyYiSTvu8zfxhIcFfiTD6SGsCmXskQL5bvfEAAr4ZIlS2NqN6Yhr0oJ19rp-A&usqp=CAU&ec=45682161'></img> */}
                            </div>
                            <div className='dialog2__user-frame'><p>{item.content}</p></div>
                        </div>}
                        {item.role ==='Uni'&&<div className='dialog2__robot' id={index} key={index}>
                            <div className='dialog2__robot-photo'>
                                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSN40MBAAgfdFAEuBxnOqDwLjM8X_o5E4fNPAvqX77Z6YUuAs0nBcZqXwuAhozySskH3AdYmVrY9juC1g&usqp=CAU'></img>
                            </div>
                            <div className='dialog2__robot-frame'><p>{item.content}</p></div>
                        </div>}
                    </div>)}
                    
                </section>
                
            </div>
            <div className='home__intro'>
                {/* <img src={Welcome}/> */}
                <h1>Welcome to be here</h1>
                <h2>Get Started now</h2>
                
            </div>
            <Footer/>
            </div>
        )
    }
}
export default Works;