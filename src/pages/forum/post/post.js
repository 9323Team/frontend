// import {userLogin,getUserInfo} from '../../api/api'
import React, { Component } from "react";
import './post.scss';
import '../forum.scss'
import Menu from '../../../containers/menu/menu'
import {getComments,postComment,getOnePost} from '../../../api/api'
export default class Post extends Component{
    state={
        comments:[],
        commentContent:'',
        post:{}
    }
    async componentDidMount(){
        let res=await (getComments(this.props.history.location.pathname.replace('/post/','')))
        if(res.status === 200){
            // console.log(res.data)
            this.setState({comments:res.data.comment})
        }
        let res1=await (getOnePost(this.props.history.location.pathname.replace('/post/','')))
        if(res1.status === 200){
            console.log(res1.data)
            this.setState({post:res1.data})
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
            <div className='postss'>
            
                <div className='postss__post'>
                        <div className='postss__postbar'>   
                            
                            <div className='postss__postbar-img'>
                                <img src={this.state.post.Authorphoto}/>
                            </div>
                            <p>
                                <h4 className={
                                    (this.state.AuthorType==='Admin'&& 'admin-color')||
                                    (this.state.AuthorType==='Expert'&& 'expert-color')
                                }>{this.state.post.Author}</h4> on <span>{new Date(this.state.post.PostTime).toDateString()}</span></p>
                            <span>{this.state.post.postType}</span>  
                        </div>
                        <div className='postss__postcontent'>
                            <p>{this.state.post.Content_Text}</p> 
                        </div>
                        
                        {this.state.post.Content_Img!==''&&
                        <div className='posts__postcontentImg'>
                            {<img src={this.state.post.Content_Img}/>}
                        </div>}
                        <div className='comment'>
                            < textarea 
                            onChange={(e)=>{
                                this.setState({commentContent:e.target.value})
                            }}
                            value={this.state.commentContent}
                            ></ textarea>
                            <button onClick={this.postComment}>Post</button>
                        </div>
                        {this.state.comments.length>0&&this.state.comments.sort((a,b)=>b.CommentTime-a.CommentTime).map((item,index)=>
                        <div className='comments'>
                            <div className='comments__comment'>
                                <img src={item.Userphoto}></img> 
                                <h4 className={
                                    (this.state.UserType==='Admin'&& 'admin-color')||
                                    (this.state.UserType==='Expert'&& 'expert-color')
                                }>{item.Username} on <span>{new Date(item.CommentTime).toDateString()}</span></h4>
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