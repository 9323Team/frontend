import React from 'react'
import './searchBox.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch} from '@fortawesome/free-solid-svg-icons'
const searchBox=props=>(
    <>
    <FontAwesomeIcon className='searchIcon' icon={faSearch}/>
    <input className='searchBox'>
        
    </input></>
)

export default searchBox;