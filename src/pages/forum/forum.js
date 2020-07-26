import React, { Component } from "react";

import './forum.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile, faImages, faTags,faComments, faThumbsUp, faThumbsDown,faChevronCircleDown} from '@fortawesome/free-solid-svg-icons'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import Menu from '../../containers/menu/menu'
import ImageUploading from "react-images-uploading";
import './imgUpload.scss'
import {getPosts,postPost,likePost,dislikePost} from '../../api/api'
import {getUserInfos} from '../../state/user/user-action-creater';
import { connect } from "react-redux";
import FilterBar from "../../containers/filterBar/filterBar";

class Forum extends Component{

    state={
        emoji:'',
        emojiShow:false,
        imgShow:false,
        tagShow:false,
        textAreaShow:false,
        active:[],
        tags:'',
        tagsSubmit:'',
        searchContent:'',
        textContent:'',//postText
        posts:[]
    }
   
    async componentDidMount(){
        // console.log(this.props)
        if(!this.props.user.auth){
            const { getUserInfos } = this.props;
            getUserInfos(sessionStorage.getItem('username'))

        }
        let res = await(getPosts())
        if(res.status === 200){
            // console.log(res.data)
            // this.setState({posts:})
            this.setState({posts:res.data.map((item)=>{
                const UpVotes=item.UpVotes;
                // const DownVotes=item.DownVotes;
                const Comments=item.Comments;
                const PostTime=new Date(item.PostTime).toDateString()
                return({
                    name : item.Author,
                    photo : item.Authorphoto,
                    tag : item.PostType,
                    postTime: PostTime,
                    content : item.Content_Text,
                    img : item.Content_Img,
                    like: (JSON.stringify(UpVotes)==='[]'|| UpVotes.indexOf(this.props.user.username) === -1)?false:true,
                    likeNumber: JSON.stringify(UpVotes)==='[]'?0:UpVotes.length,
                    comments:JSON.stringify(Comments)==='[]'?0:Comments.length,
                    id:item.PostID,
                });
            })})
            
            setTimeout(()=>{
                let arr=[...Array(this.state.posts.length)].map(_=>false)
                this.setState({active:arr})
            },1000)
        }
    }

    handlerLike=async (id,like)=>{
        let res1;
        if(like){
            //delete
            res1 = await(dislikePost(id))
            
            
        }else{
            //put
            let voteinfo = {
                "up": true,
                "username": sessionStorage.getItem('username')
            }
            res1 = await (likePost(id,voteinfo))  
        }
        if(res1.status === 200){
            let res = await(getPosts())
            if(res.status === 200){
                //console.log(res.data)
                // this.setState({posts:})
                this.setState({posts:res.data.map((item)=>{
                    const UpVotes=item.UpVotes;
                    const DownVotes=item.DownVotes;
                    const Comments=item.Comments;
                    const PostTime=new Date(item.PostTime).toDateString()
                    return({
                        name : item.Author,
                        photo : item.Authorphoto,
                        tag : item.PostType,
                        postTime: PostTime,
                        content : item.Content_Text,
                        img : item.Content_Img,
                        like: (JSON.stringify(UpVotes)==='[]'|| UpVotes.indexOf(this.props.user.username) === -1)?false:true,
                        likeNumber: JSON.stringify(UpVotes)==='[]'?0:UpVotes.length,
                        comments:JSON.stringify(Comments)==='[]'?0:Comments.length,
                        id:item.PostID,
                    });
                })})}
        }
        
    }

    handlerPost=async ()=>{
        
        let post = {
            "username": sessionStorage.getItem('username'),
            "title": "",
            "PostType": this.state.tagsSubmit,
            "content_text": this.state.textContent,
            "content_img": ""
        }
        
        let res = await (postPost(post))
        if(res.status === 200){
            alert('posted')
        }
    }

    searchHandler=()=>{
        //search=>this.state.searchContent(later change to this.props.searchContent)

    }

    addEmoji=(emoji)=>{
        
        this.setState({
            textContent:this.state.textContent+emoji.native,
            emojiShow:!this.state.emojiShow
        })
    }

    render(){
        const maxNumber = 1;
        
        
        return(
        
        <>

        <Menu/>
        <div className='messageBoard'>
            <section className='post'>
                <ul>
                    <li onClick={()=>{
                        this.setState({textAreaShow:!this.state.textAreaShow})
                    }}>
                        <FontAwesomeIcon icon={faChevronCircleDown} style={this.state.textAreaShow?null:{transform:'rotate(180deg)'}}/>
                    </li>
                    <li 
                    onClick={()=>{this.setState({emojiShow:!this.state.emojiShow})}}
                    >
                        <FontAwesomeIcon icon={faSmile} />
                    </li>
                    {this.state.emojiShow&&
                    <div className='emojibox'>
                        <Picker className='emojibox' set='apple' onClick={this.addEmoji}/>
                    </div>
                    }
                    
                    <li 
                    onClick={()=>{this.setState({imgShow:!this.state.imgShow})}}
                    >
                        <FontAwesomeIcon icon={faImages}/>
                    </li>
                    {this.state.imgShow&&
                    <div className='imgbox'>
                        <ImageUploading multiple onChange={(imageList)=>{
                            console.log(imageList);
                        }} maxNumber={maxNumber}>
                            {({ imageList, onImageUpload, onImageRemoveAll }) => (
                            // write your building UI
                            <div className="upload__image-wrapper">
                                
                                <button className='post-btn' onClick={onImageUpload}>Upload</button>
                                <button className='post-btn' onClick={onImageRemoveAll}>Remove</button>
                                {imageList.map(image => (
                                <div key={image.key} className="image-item">
                                    <img src={image.dataURL} alt="" width="100" />
                                    <div className="image-item__btn-wrapper">
                                    <button
                                        className='post-btn btn'
                                        onClick={() => {
                                        image.onUpdate();
                                        }}
                                    >
                                        Update
                                    </button>
                                    {/* <button className='post-btn' onClick={image.onRemove}>Remove</button> */}
                                    </div>
                                </div>
                                ))}
                            </div>
                            )}
                        </ImageUploading>
                    </div>
                    }
                    <li onClick={()=>{this.setState({tagShow:!this.state.tagShow})}}
                    ><FontAwesomeIcon icon={faTags}/></li>
                    {this.state.tagShow&&
                    <div className='tagbox'>
                        <input 
                        placeholder="format:#..#,#..#"
                        onChange={(e)=>{
                            this.setState({tags:e.target.value})
                        }}
                        ></input>
                        <button className='post-btn' onClick={()=>{
                            if(this.state.tags!==''){
                                this.setState({tagsSubmit:this.state.tags})
                            }
                        }}>Submit</button>
                        <p></p>
                    </div>
                    }
                    <button className='post-btn'>Cancel</button>
                    <button 
                    className='post-btn'
                    onClick={this.handlerPost} >
                        Post
                    </button>
                    
                </ul>
                {this.state.textAreaShow&&
                <textarea
                    onChange={(e)=>{
                        this.setState({textContent:e.target.value})
                    }}
                    value={this.state.textContent}
                >

                </textarea>}
                
                
                
            </section>
            <section className='filter'>
                <FilterBar searchContent={this.state.searchContent} searchHandler={this.searchHandler}/>
            </section>
            <section className='posts'>
                {this.state.posts.map((item,index)=>
                    <div className='posts__post'>
                    <div className='posts__postbar'>          
                        <div className='posts__postbar-img'>
                            <img src={item.photo}/>
                        </div>
                        <p><h4 
                        className={
                            (item.usertype==='Admin'&& 'admin-color')||
                            (item.usertype==='Expert'&& 'expert-color')
                        }>
                        {item.name}</h4> on <span>{item.postTime}</span></p>
                        <span>{item.tag}</span>  
                    </div>
                    <div className='posts__postcontent'>
                    
                    {item.content.length>600?this.state.active[index]?
                    <><p>{item.content}</p> <span>
                    <FontAwesomeIcon 
                    className="posts__postcontent-icon posts__postcontent-iconActive"
                    icon={faChevronCircleDown}
                    onClick={()=>{
                        let arr=[...this.state.active]
                        arr[index]=false
                        this.setState({active:arr})
                    }}
                    />
                </span></>:
                    <><p >{item.content.substring(0,600)}...</p>
                    <span>
                        <FontAwesomeIcon 
                        className='posts__postcontent-icon'
                        icon={faChevronCircleDown}
                        onClick={()=>{
                            let arr=[...this.state.active]
                            arr[index]=true
                            this.setState({active:arr})
                        }}
                        />
                    </span></>:
                    <p>{item.content}</p>}
                        
                    
                    
                    </div>
                    
                    {item.img!=='string'&&
                    <div className='posts__postcontentImg'>
                        {<img src={item.img}/>}
                    </div>}
                    <ul>
                        <li onClick={()=>{
                            this.props.history.push(`/post/${item.id}`)
                        }}
                        ><FontAwesomeIcon icon={faComments}/>{item.comments}Comments</li>
                       
                
                        <li>
                            <FontAwesomeIcon 
                            icon={faThumbsUp}
                            onClick={()=>{
                                this.handlerLike(item.id,item.like)}}
                            style={item.like?{color:'#FFDE9C',cursor:'pointer'}:{cursor:'pointer'}}
                            />{item.thumbUp}{item.likeNumber}</li>
                        {/* <li><FontAwesomeIcon icon={faThumbsDown}/>{item.thumbDown}{item.dislike}</li> */}
                    </ul>
                </div>)
                }
                
                

            </section>
            <div id={0}></div>
            <div id={1}></div>
            <div id={2}></div>
            <div id={3}></div>
            <div id={4}></div>
            <div id={5}></div>
        </div> 
        </>


        )

    }
}
function mapStateToProps(state) {
    return {
      user: state.user.current_user,     
    }
}
// export default Login
  
export default connect(mapStateToProps, { getUserInfos })(Forum);