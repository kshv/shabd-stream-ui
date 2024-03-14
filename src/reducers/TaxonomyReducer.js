import { TaxonomyActions } from "../reducerActions/TaxonomyActions";

const initialState = {
    loadingLanguages:false,
    languages:undefined,
}

const TaxonomyReducer = (state=initialState,action) => {

    const newState ={...state};

    if(action.type === TaxonomyActions.SAVE_LANGUAGES){
        newState.languages = action.languages;
        newState.loadingLanguages = false;
    }

    return newState;
}

export default TaxonomyReducer;