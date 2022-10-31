import produce from "immer";
import { createStore } from "redux";

export const initialState = {
    loading: false
}

export const GLOBAL_LOADING = "LOADING"
export const GLOBAL_LOADED = "LOADED"

const Reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case GLOBAL_LOADING: {
                draft.loading = true
                break
            }
            case GLOBAL_LOADED: {
                draft.loading = false
                break;
            }
        }
    })
}


const store = createStore(Reducer);
export default store;