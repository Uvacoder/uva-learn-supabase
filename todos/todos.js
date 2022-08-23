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
        response.data;
        displayTodos();
    }
    todoForm.reset();
});


// add async complete todo handler function
async function handleComplete(todo) {
 
    const completedTodo = {
        complete: todo.complete = true,
    };
    // call completeTodo
    const response = await completeTodo(todo.id, completedTodo);
    if (response.error) {
        //eslint-disable-next-line no-console
        console.log(response.error);
    } else {
        const completed = response.data;
         // swap out todo in array
        const todos = await getTodos();
        const index = todos.indexOf(todo);
        if (index !== -1) {
            todos.splice(index, 1, completed);
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
    const todos = await getTodos();
    for (let todo of todos) {
          // call render function, pass in state and complete handler function!
        const todoItem = renderTodo(todo, handleComplete);
          // append to .todos
        todoContainer.append(todoItem);
    }

}

// add page load function
function pageLoad() {
       // fetch the todos and store in state
    const response = getTodos();
    if (response.error) {
        alert('Response Error');
    } else {
        response.data;
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
    // modify state to match 
    deleteAllTodos();
    // re displayTodos
    displayTodos();
});
