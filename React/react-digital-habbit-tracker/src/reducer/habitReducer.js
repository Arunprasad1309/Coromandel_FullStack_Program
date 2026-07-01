export const habitReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_HABIT':
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
        
        case 'DELETE_HABIT':
        /* Filter out the habit with the matching id from the state array */
            return state.filter((habit) => habit.id !== action.payload);

        case 'COMPLETE_HABIT':
        /* Map through the state array and toggle the completed property of the habit with the matching id */
            return state.map((habit) => 
                habit.id === action.payload
                ? { ...habit, completed: !habit.completed } 
                : habit
            );

        default:
            return state;
    }
};