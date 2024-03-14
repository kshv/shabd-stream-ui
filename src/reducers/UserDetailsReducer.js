import { UserActions } from "../reducerActions/UserActions";

const initialState = {
    user:{},
    loadingUser:false,
    isUserLoggedIn:false,
    signInRedirect:undefined
}

const UserDetailsReducer = (state=initialState,action) => {

    const newState ={...state};

    if(action.type === UserActions.SAVE_USER_DETAILS){
        newState.isUserLoggedIn = true;
        newState.loadingUser = false;
        newState.user = action.user;
    }
    else if(action.type === UserActions.LOAD_USER_BOOT){
        newState.loadingUser = action.status;
        newState.signInRedirect = action.redirect;
    }
    else if(action.type === UserActions.SIGN_OUT){
        newState.isUserLoggedIn = false;
        newState.user = undefined;
    }

    else if(action.type === UserActions.REFERENCE_UPDATED){
        newState.user = {...state.user, refCheck:true};
    }

    return newState;
}

export default UserDetailsReducer;