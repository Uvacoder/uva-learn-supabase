const SUPABASE_URL = 'https://gxwgjhfyrlwiqakdeamc.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjQxMTMxMiwiZXhwIjoxOTUxOTg3MzEyfQ.PHekiwfLxT73qQsLklp0QFEfNx9NlmkssJFDnlvNIcA';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function createTodo(todo) {
    // create a single incomplete todo with the correct 'todo' property for this user in supabase
    const response = await client
        .from('todos')
        .insert(todo)
        .single();
    return checkError(response);
}

export async function deleteAllTodos(id) {
    // delete all todos for this user in supabase
    const response = await client
        .from('todos')
        .delete('*')
        .match({ id });
    return checkError(response);
}

export async function getTodos() {
    // get all todos for this user from supabase
    const response = await client
        .from('todos')
        .select();
    return checkError(response);
}

export async function completeTodo(id) {
    // find the todo and update (set complete to true), the todo that matches the correct id
    const response = await client
        .from('todos')
        .update({ complete: true })
        .match({ id })
        .single();
    return checkError(response);
}

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
    const user = getUser();
    if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
    const user = getUser();
    if (user) {
        location.replace('./todos');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });
    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });
    return response.user;
}

export async function logout() {
    await client.auth.signOut();
    window.location.replace('../');
}

function checkError({ data, error }) {
    // eslint-disable-next-line
    return error ? console.error(error) : data;
}

