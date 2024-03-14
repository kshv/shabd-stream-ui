import { SystemActions } from "../reducerActions/SystemActions";

const initialState = {
   width:0,
   height:0,
   feedbackDrawerOpen:false
}

const SystemReducer = (state=initialState,action) => {

    const newState ={...state};
    
    if(action.type === SystemActions.SAVE_DIMENSIONS){
        newState.width = action.width;
        newState.height = action.height;
    }

    else if(action.type === SystemActions.OPEN_FEEDBACK_DRAWER){
        newState.feedbackDrawerOpen = action.open;
    }

    return newState;
}

export default SystemReducer;