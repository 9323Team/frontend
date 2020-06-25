import React, { Component } from "react";

import './forum.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile, faImages, faTags,faComments, faThumbsUp, faThumbsDown,faChevronCircleDown} from '@fortawesome/free-solid-svg-icons'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import Menu from '../../containers/menu/menu'
import ImageUploading from "react-images-uploading";
import './imgUpload.scss'


import FilterBar from "../../containers/filterBar/filterBar";
export default class Forum extends Component{

    state={
        emoji:'',
        emojiShow:false,
        imgShow:false,
        tagShow:false,
        textAreaShow:false,
        active:[],
        searchContent:'',
        textContent:'',
        posts:[{name:'Tom Doe',time:'13:24 24 Jun,2015',content:'node.js',contentImg:'https://create-react-app.dev/img/logo-og.png',tag:'#react#',img:'https://pbs.twimg.com/profile_images/1036730403514736650/PCRxFiEt_400x400.jpg',commentsNum:2,thumbUp:3,thumbDown:4},
        {name:'Tom Doe',time:'13:24 24 Jun,2015',content:'node.jsaasasa reactnode.jsaasasa reactnode.jsaasasa reactnode.jsaasasa reactnode.jsaasasa reactnode.jsaasasa reactnode.jsaasasa reactnode.jsaasasa reactnode.jsaasasa reactnode.jsaasasa reactnode.jsaasasa reactnode.jsaasasa reactnode.jsaasasa reactnode.jsaasasa reactnode.jsaasasa reactnode.jsaasasa reactnode.jsaasasa reactnode.jsaasasa reactnode.jsaasasa reactnode.jsaasasa reactnode.jsaasasa reactnode.jsaasasa reactnode.jsaasasa reactnode.jsaasasa reactnode.jsaasasa reactnode.jsaasasa reactnode.jsaasasa reactnode.jsaasasa reactnode.jsaasasa reactnode.jsaasasa reactnode.jsaasasa reactnode.jsaasasa reactnode.jsaasasa reactnode.jsaasasa reactnode.jsaasasa reactnode.jsaasasa reactnode.jsaasasa reactnode.jsaasasa reactnode.jsaasasa reactnode.jsaasasa react',contentImg:'https://create-react-app.dev/img/logo-og.png',tag:'#react#',img:'https://pbs.twimg.com/profile_images/1036730403514736650/PCRxFiEt_400x400.jpg',commentsNum:2,thumbUp:3,thumbDown:4}]
    }
   
    componentDidMount(){
        let arr=[...Array(this.state.posts.length)].map(_=>false)
        this.setState({active:arr})
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
                        <input placeholder="format:#..#,#..#"></input><button className='post-btn'>Submit</button>
                        <p></p>
                    </div>
                    }
                    <button className='post-btn'>Cancel</button>
                    <button className='post-btn'>Post</button>
                    
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
                            <img src={item.img}/>
                        </div>
                        <p><h4>{item.name}</h4> on <span>{item.time}</span></p>
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
                    
                    {item.contentImg!=='none'&&
                    <div className='posts__postcontentImg'>
                        <img src={item.contentImg}/>
                    </div>}
                    <ul>
                        <li><FontAwesomeIcon icon={faComments}/>{item.commentsNum}Comments</li>
                        <li><FontAwesomeIcon icon={faThumbsUp}/>{item.thumbUp}</li>
                        <li><FontAwesomeIcon icon={faThumbsDown}/>{item.thumbDown}</li>
                    </ul>
                </div>)
                }
                
                

            </section>

        </div> 
        </>


        )

    }
}