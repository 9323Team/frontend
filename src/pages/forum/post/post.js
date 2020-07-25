// import {userLogin,getUserInfo} from '../../api/api'
import React, { Component } from "react";
import './post.scss';
import '../forum.scss'
import Menu from '../../../containers/menu/menu'
import {getComments,postComment} from '../../../api/api'
export default class Post extends Component{
    state={
        comments:[],
        commentContent:''
    }
    async componentDidMount(){
        let res=await (getComments(this.props.history.location.pathname.replace('/post/','')))
        if(res.status === 200){
            // console.log(res.data)
            this.setState({comments:res.data.comment})
        }
    }
    postComment=async ()=>{
        let res = await (postComment(
            this.props.history.location.pathname.replace('/post/',''),
            {"content":this.state.commentContent,"username":sessionStorage.getItem('username')}
            ))
        if(res.status === 200){
            this.setState({commentContent:""})
            alert('posted')
            
            // console.log(res.data)
            let res2=await (getComments(this.props.history.location.pathname.replace('/post/','')))
            if(res2.status === 200){
                // console.log(res.data)
                this.setState({comments:res2.data.comment})
            }
        }
    }
    render(){
        
        return(
            <>
            <Menu/>
            <div className='posts'>
            
                <div className='posts__post'>
                        <div className='posts__postbar'>   
                            
                            <div className='posts__postbar-img'>
                                <img src=''/>
                            </div>
                            <p><h4>item.name</h4> on <span>postTime}</span></p>
                            <span>item.tag</span>  
                        </div>
                        <div className='posts__postcontent'>
                            <p>{this.state.comments.length}</p> 
                        </div>
                        
                        {/* {item.img!==''&&
                        <div className='posts__postcontentImg'>
                            {<img src={item.img}/>}
                        </div>} */}
                        <div className='comment'>
                            < textarea 
                            onChange={(e)=>{
                                this.setState({commentContent:e.target.value})
                            }}
                            value={this.state.commentContent}
                            ></ textarea>
                            <button onClick={this.postComment}>Post</button>
                        </div>
                        {this.state.comments.length>0&&this.state.comments.map((item,index)=>
                        <div className='comments'>
                            <div className='comments__comment'>
                                <img src=''></img> 
                                <h4>{item.Username} on <span>{item.CommentTime}</span></h4>
                                <div className='comments__comment-content'>
                                <p>{item.Content}</p>
                                </div>
                                
                            </div>

                        </div>)}
                        
                </div>
               
            </div>
            
            </>
        )
    }
}