import constants from "../../constants";

let initialState = {
    data: []
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.GET_PUBLISH_PROJECT_BUTTON:
            return {
                ...state,
                data: action.payload
            } 

        default:
            return {
                ...state
            }
    }
};

export default reducer;
