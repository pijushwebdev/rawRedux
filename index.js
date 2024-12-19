

// 1. initial state

const { createStore, applyMiddleware } = require("redux");

const initialState = {
    todos: []
}

//2. create reducer

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'todos/todoAdded':
            
            return {
                ...state,
                todos: [...state.todos, ...action.payload]
            };
    
        default:
            return state;
    }
}


//6. middlewares

const fetchTodoMiddleware = (store) => (next) =>async (action) => {
    if(action.type === 'todos/todoFetched'){

        const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
        const todos = await res.json();

        store.dispatch({
            type: 'todos/todoAdded',
            payload: todos
        })

        console.log('After dispatch', store.getState().todos.length);
        return;
    }

    return next(action)
}

//3. create store

const store = createStore(todoReducer, applyMiddleware(fetchTodoMiddleware));

//4. subscribe store ====> to see changes in state // in react this would be done by react

store.subscribe(() => {
    console.log("Current state", store.getState());
});


// 5. dispatch the action  // in react it used by react hooks useDispatch

store.dispatch({
    type: 'todos/todoFetched'
});


