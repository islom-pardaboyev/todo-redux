import toast from "react-hot-toast";
import { ACTIONS } from "./actions";

const initialState = {
  todos: [],
  filteredTodos: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      if (
        action.payload &&
        !state.todos.some((item) => item.value == action.payload.value)
      ) {
        toast.success("Successfully Added!");
        return {
          ...state,
          todos: [...state.todos, action.payload],
          filteredTodos: [...state.filteredTodos, action.payload],
        };
      } else {
        toast.error("Todo Already Exists!");
        return state;
      }
    case ACTIONS.MAKE_COMPLETED_TODO:
      const clickedTodo = state.filteredTodos.find(
        (item) => item.id == action.payload
      );
      clickedTodo.completed = !clickedTodo.completed;
      console.log(clickedTodo);

      return state;
    case ACTIONS.SHOW_COMPLETED_TODOS:
      return {
        ...state,
        filteredTodos: state.todos.filter((item) => item.completed),
      };
    case ACTIONS.SHOW_UNCOMPLETED_TODOS:
      return {
        ...state,
        filteredTodos: state.todos.filter((item) => !item.completed),
      };
    case ACTIONS.SHOW_ALL_TODOS:
      return {
        ...state,
        filteredTodos: state.todos,
      };
    case ACTIONS.DELETE_TODO:
      return {
        ...state,
        filteredTodos: state.todos.filter(item => item.id !== action.payload),
        todos: state.todos.filter(item => item.id !== action.payload)
      }
    default:
      return state;
  }
};
