import userActionTypes from "./user-action-types";


const inititalState = {
    current_user: {auth:false}
}

const user = (state = inititalState, action) => {
    switch (action.type) {
        case userActionTypes.LOAD_USER_SUCCEEDED:
            return {    
                current_user: action.data,
            }
        case userActionTypes.LOAD_USER_FAILED:
            return {    
                current_user: 'error',
                error:action.data.err
            }
        default:{
            return state;
        }
            
    }
}
  
export default user;