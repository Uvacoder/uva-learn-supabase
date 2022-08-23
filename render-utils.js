export function renderTodo(todo, handleComplete) {
    // create a div and a p tag
    const divTag = document.createElement('div');
    const pTag = document.createElement('p');
    // depending on whether the todo is complete, give the div the appropriate css class 
    // ('complete' or 'incomplete')
    divTag.classList.add(`${todo ? todo === true : todo === false}`);
    // add the 'todo' css class no matter what
    divTag.classList.add('todo');
    // put the todo's text into the p tag
    pTag.textContent = todo.todo;
    // append stuff
    divTag.append(pTag);
    // add event listener for click and call handleComplete function
    divTag.addEventListener('click', () => {
        handleComplete(todo);
    });    
    // return the div
    return divTag;
}
