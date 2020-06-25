import userActionTypes from "./user-action-types";




const inititalState = {
    current_user: {auth:false}
}

const user = (state = inititalState, action) => {
    switch (action.type) {
        case userActionTypes.LOGIN_USER:
            return {    
                current_user: action.data
            }
        case userActionTypes.REFRESH_USER:
            return {current_user: action.data};
        default:{
            return state;
        }
            
    }
}
  
export default user;