const initialTodoState = {
    todoList: [],
    groupList: [],
    priorityList: [],
    selectedTodo: {
        id: null,
        name: null,
        description: null,
        group: {id: null, name: null},
        priority: null,
        dueDate: null,
        done: false,
    },
    selectedTodos: [],

}

const todoReducer = (state, action) => {
    switch (action.type) {
        case 'setName': {
            let tempData={...state.selectedTodo}
            tempData.name=action.payload;
            return {...state, selectedTodo: tempData};
        }
        case 'setDescription': {
            let tempData={...state.selectedTodo}
            tempData.description=action.payload;
            return {...state, selectedTodo: tempData};
        }
        case 'setGroup': {
            let tempData={...state.selectedTodo};
            let tempGroupList = [...state.groupList];
            let data = action.payload;
            let result=null;
            if (typeof(action.payload)=="number") {
                result = tempGroupList.filter(value => value.id === action.payload);
            }
            if(result!=null){
                tempData.group=result[0];
            }else{
                tempData.group=data;
            }
            return {...state, selectedTodo: tempData};
        }
        case 'setPriority': {
            let tempData={...state.selectedTodo}
            tempData.priority=action.payload;
            return {...state, selectedTodo: tempData};
        }
        case 'setDueDate': {
            let tempData={...state.selectedTodo}
            tempData.dueDate=action.payload;
            return {...state, selectedTodo: tempData};
        }
        case 'setDone': {
            let tempData={...state.selectedTodo}
            tempData.done=action.payload;
            return {...state, selectedTodo: tempData};
        }
        case 'setGroupList': {
            return {...state, groupList: action.payload};
        }
        case 'setTodoList': {
            return {...state, todoList: action.payload};
        }
        case 'setPriorityList': {
            return {...state, priorityList: action.payload};
        }
        case 'setSelectedTodo': {
            return {...state, selectedTodo: action.payload};
        }
        case 'setSelectedTodos': {
            return {...state, selectedTodos: action.payload};
        }
        case 'setDoneOnTodoList': {
            let tempTodoList = [...state.todoList];
            tempTodoList.forEach((value, index) => {
                if (value.id === action.payload.id) {
                    tempTodoList[index] = action.payload;
                }
            });
            return {...state, todoList: tempTodoList};
        }
    }
}

export {initialTodoState, todoReducer};