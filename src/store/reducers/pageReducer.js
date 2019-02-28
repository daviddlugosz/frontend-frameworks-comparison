import {
    GET_PAGES,
    SET_PAGE,
    CHANGE_EDIT_MODE,
    SET_PAGE_LOADED
} from '../actions/types'

const initialState = {
    pages: [],
    pageLoaded: false,
    editMode: false,
    page: {
        name: "",
        path: null,
        content: null
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PAGES:
            return {
                ...state,
                pages: action.pages
            }
        case SET_PAGE: 
            return {
                ...state,
                page: action.page
            }
        case CHANGE_EDIT_MODE:
            return {
                ...state,
                editMode: !action.currentState
            }
        case SET_PAGE_LOADED:
            return {
                ...state,
                pageLoaded: action.flag
            }
        default:
            return state;
    }
}
