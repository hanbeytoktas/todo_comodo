import React,{createContext,useContext,useReducer} from 'react';
import {todoReducer,initialTodoState} from './TodoReducer'
import PropTypes from 'prop-types';

const TodoContext = createContext();
const useTodoStateValue = () => useContext(TodoContext);

const TodoProvider =({children})=>{
    const [todoState,todoDispatch] = useReducer(todoReducer,initialTodoState);
    return (
        <TodoContext.Provider value={{todoState,todoDispatch}}>{children}</TodoContext.Provider>
    );
};

TodoProvider.propTypes = {
    children : PropTypes.node.isRequired,
}

export {useTodoStateValue,TodoProvider};