export const habbitReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_HABBIT':
        /* Add a new habit object to the state array with a unique id, text from action.payload, 
        and completed set to false */    
            return[
                ...state,
                {
                    id: Date.now(),
                    text: action.payload,
                    completed: false,
                },
            ];
        
        case 'DELETE_HABBIT':
        /* Filter out the habit with the matching id from the state array */
            return state.filter((habbit) => habbit.id !== action.payload);

        case 'COMPLETE_HABBIT':
        /* Map through the state array and toggle the completed property of the habit with the matching id */
            return state.map((habbit) => 
                habbit.id === action.payload
                ? { ...habbit, completed: !habbit.completed } 
                : habbit
            );

        default:
            return state;
    }
};