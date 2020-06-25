import React from 'react'
import './topicFilter.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookReader,faHandPaper, faCertificate,faHandsHelping,faPalette,faQuestionCircle,faBullhorn} from '@fortawesome/free-solid-svg-icons'
const topicFilter=props=>(
    <div className='topicFilter'>
        <ul>
            <li onClick={props.clicked}>
                <span><FontAwesomeIcon icon={faCertificate}/></span>All
            </li>
            {props.show&&<>
            <li> <span><FontAwesomeIcon icon={faBookReader}/> </span> News</li>
            <li> <span><FontAwesomeIcon icon={faHandPaper}/> </span> Prevention</li>
            <li> <span><FontAwesomeIcon icon={faHandsHelping}/> </span> Volunteer activities</li>
            <li> <span><FontAwesomeIcon icon={faPalette}/> </span> Arts</li>
            <li> <span><FontAwesomeIcon icon={faQuestionCircle}/> </span> Question(Q&A)</li>
            <li> <span><FontAwesomeIcon icon={faBullhorn}/> </span> Announcement</li>
            </>}
        </ul>
    </div>
)


export default topicFilter;