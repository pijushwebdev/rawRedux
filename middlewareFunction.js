

const fetchTodos = async (dispatch, getState) => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
        const todos = await res.json();

        dispatch({
            type: 'todos/todoAdded',
            payload: todos
        })

        console.log('After dispatch', getState().todos.length);
}

module.exports = {
    fetchTodos
}