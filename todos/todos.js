import { 
    checkAuth, 
    createTodo, 
    completeTodo,
    getTodos,
    logout,
    deleteAllTodos, 
} from '../fetch-utils.js';
import { renderTodo } from '../render-utils.js';

checkAuth();

const todoForm = document.querySelector('.todo-form');
const logoutButton = document.querySelector('#logout');
const deleteButton = document.querySelector('.delete-button');

// create todo state
let todoList = [];

todoForm.addEventListener('submit', async (e) => {
    // on submit, create a todo, reset the form, and display the todos
    e.preventDefault();
    const data = new FormData(todoForm);

    const response = await createTodo({
        todo: data.get('todo'),
    });

    if (response.error) {
        alert('Response Error');
    } else {
        const todo = response.data;
        todoList.push(todo);
        displayTodos();
    }
    todoForm.reset();
});

// add async complete todo handler function
async function handleComplete(todo) {
    const completedTask = {
        todo: todo.complete = true,
    };
    // call completeTodo
    const response = await completeTodo(todo.id, completedTask);
    if (response.error) {
        alert('Response Error');
    } else {
        const completed = response.data;
         // swap out todo in array
        const index = todoList.indexOf(todo);
        if (index !== -1) {
            todoList[index] = completed;
            // todoList.splice(index, 1, completed)
        }
         // call displayTodos
        displayTodos();
    }
}

async function displayTodos() {
    // clear the container (.innerHTML = '')
    const todoContainer = document.querySelector('.todos');
    todoContainer.innerHTML = '';
    // display the list of todos, 
          // call render function, pass in state and complete handler function!
    const listOfTodos = renderTodo(todoList, handleComplete);
          // append to .todos
    todoContainer.append(listOfTodos);
}

// add page load function
function pageLoad() {
       // fetch the todos and store in state
    const response = getTodos();
    if (response.error) {
        alert('Response Error');
    } else {
        todoList = response.data;
             // call displayTodos
        displayTodos();
    }
}

pageLoad();

logoutButton.addEventListener('click', () => {
    logout();
});

deleteButton.addEventListener('click', async () => {
    // delete all todos
    const response = await deleteAllTodos();
    // modify state to match
    todoList = response;
    // re displayTodos
    displayTodos();
});
