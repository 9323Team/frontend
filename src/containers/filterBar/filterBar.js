import React, { PureComponent } from 'react'

import TopicFilter from '../../components/topicFilter/topicFilter'
import SearchBox from '../../components/searchBox/searchBox'
import './filterBar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortNumericUpAlt,faSortNumericDownAlt,faFireAlt} from '@fortawesome/free-solid-svg-icons'
class FilterBar extends PureComponent{
    state={
      dropdownShow:false,
      
    }
    dropdownHandler=()=>{
        this.setState({dropdownShow:!this.state.dropdownShow})
    }
   
    render(){
        return(
        <div className='filterBar'>
            <TopicFilter show={this.state.dropdownShow} clicked={this.dropdownHandler}/> 
            <SearchBox searchContent={this.props.searchContent} clicked={this.props.searchHandler}/>
            <div className='filterBar__filter'>
                <div>
                <FontAwesomeIcon className='filterBar__filter-icon' icon={faSortNumericUpAlt}/>
                </div>
                <div>
                <FontAwesomeIcon className='filterBar__filter-icon' icon={faSortNumericDownAlt}/>
                </div>
                <div>
                <FontAwesomeIcon className='filterBar__filter-icon' icon={faFireAlt}/>
                </div>
                
                
                
            </div>
        </div>
    )}
}
export default FilterBar;