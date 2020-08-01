import userActionTypes from './user-action-types';
import {getUserInfo} from '../../api/api'

export const getUserInfos = (name) =>dispatch=>{
    // dispatch(loadUserRequested());
    getUserInfo(name)
    .then(res=>{
        sessionStorage.setItem('username',res.data.Username)
        dispatch(loadUserSucceed(res))
    })
    .catch(err=>dispatch(loadUserFailed(err)));
}
// const loadUserRequested = ()=>({
//     type:userActionTypes.LOAD_USER_REQUESTED
// });
const loadUserSucceed = res => ({
    type: userActionTypes.LOAD_USER_SUCCEEDED,
    
    data: {
        auth:true,
        username:res.data.Username,
        email:res.data.Email,
        organization:res.data.Organization,
        posts:res.data.Posts,
        usertype:res.data.userType,
        userphoto:res.data.Userphoto
    }
});
const loadUserFailed = err => ({
    type: userActionTypes.LOAD_USER_FAILED,
    data: { err }
});
