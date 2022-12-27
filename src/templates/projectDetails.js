import toHtml from "../util/toHtml";

const Todo = (todo) => {
  console.log(todo);
  return toHtml(`<li class='todo pb-4' data-id=${todo._id}>
  <header class='flex justify-between'>
    <h4 class='title text-lg font-bold'>${todo.data?.title}</h4>
    <div>
    <i class='todo-edit btn btn-secondary btn-sm btn-rounded w-0 bi-pencil' data-id='${todo._id}' ></i>
    <i class='todo-delete btn btn-secondary btn-sm btn-rounded w-0 bi-trash' data-id='${todo._id}'></i>
    </div> 
  </header>
  <p class='pl-2 italic'>${todo.data?.description} (${todo.data?.due ? new Date(todo.data.due).toDateString() : 'NDD' })</p>
</li`)
}

const ProjectDetails = ({project:{_id, data: project}, addTodo=()=>{}, removeTodo=()=>{}}) => {
  console.log(_id, addTodo);

  const el = toHtml(`<div class='project-detail' data-id='${_id}'>
  <header class='w-full flex justify-center'>
    <h3 class='text-2xl font-extrabold text-purple-500'>${project.title}</h3>
  </header>
  <ul class='project-todos'></ul>
  <footer>
  <span class='tooltip tooltip-left' data-tooltip='Add Todo'>
  <label class="add-todo btn-rounded btn btn-primary" for="todo-modal"><i class='bi-plus'></i></label>
  <input class="modal-state" id="todo-modal" type="checkbox" />
  <div class="modal">
    <label class="modal-overlay" for="todo-modal"></label>
    <div class="modal-content flex flex-col gap-5">
      <label class="modal-close" for="todo-modal"></label>
      <h2 class="text-xl">Add Todo</h2>
        <form name='new-todo-form' class='flex flex-col'>
          <input type='hidden' name='pid' value='${_id}' />
          <label for='title'>Title: 
            <input type='text' id='title' class='input input-primary' name='title' />
          </label>
          <label for='description'>Description: 
            <input type='text' id='description' class='input input-primary' name='description' />
          </label>
          <label for='priority'>Priority:
            <div class='flex center'>
              <span class='px-3 tooltip tooltip-top' data-tooltip='Critical'>
                <input type='radio' id='priority' class='radio-bordered-error radio' name='priority' value='critical' />
              </span>
              <span class='px-3 tooltip tooltip-top' data-tooltip='High'>
                <input type='radio' id='priority' class='radio-bordered-warning radio' name='priority' value='high' />
              </span>
              <span class='px-3 tooltip tooltip-top' data-tooltip='Normal'>
                <input type='radio' id='priority' class='radio-bordered-success radio' name='priority' value='normal' />
              </span>
              <span class='px-3 tooltip tooltip-top' data-tooltip='Low'>
                <input type='radio' id='priority' class='radio-bordered-primary radio' name='priority' value='low' checked />
              </span>
            </div>
          </label>
          <label for='due'>
            <input type="date" name='due' id='due'
              class="input input-primary " placeholder="Select a date" />
          </label>

          <div class='mt-3 flex justify-around w-full'>
            <button type='reset' class="btn btn-secondary cancel-btn">Cancel</button>
            <button type='submit' class="btn btn-primary">Add</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  </span>
  </footer>
</div>`);

/****
 * With the HTML rendering out of the way, we define interface methods to act as go-betweens.
 * Here, we handle the DOM directly, but we are also being passed handler functions for the
 *   various CRUD operations.
 * For example, below I handle the `deleteTodo` DOM operation, getting DOM nodes and parsing
 *   out the pure data that the `removeTodo` function will expect.
 * By doing this, we can separate the DOM functionality from the model functionality, and
 *   define an interface between them in the main.js
 ****/
  const clearAndClose = ()=>{
    el.querySelector('[name="new-todo-form"]').reset();
    el.querySelector('#todo-modal').checked=false;

  }
  const displayTodos = () =>{
    const todosContainer = el.querySelector('.project-todos');
    while(todosContainer.firstChild) todosContainer.firstChild.remove();
    todosContainer.append(...project.collection?.map(Todo) || 'No todos yet!');
  }

  const deleteTodo = (e) =>{
    const todoId = e.target.dataset.id;
    removeTodo(_id, todoId)
  }

  const createTodo = (e)=>{
    e.preventDefault();
    const {pid:projectId, ...data} = [...new FormData(el.querySelector('[name="new-todo-form"]'))]
          .reduce((acc, [key, value])=>({...acc, [key]:value}), {});
    addTodo(projectId, data);
  }
  /****
   * With the above interface functions (DOM-to-incoming methods) defined, we simply connect
   *   them up. As we add more, we can add more querySelectors/handlers.
   ****/
  el.querySelector('[name="new-todo-form"]').addEventListener('submit', (e)=>{
    createTodo(e);
    displayTodos();
    clearAndClose();
  });
  el.querySelector('.cancel-btn').addEventListener('click', clearAndClose );
  el.querySelector('.project-todos').addEventListener('click', (e)=>{
    if(e.target.classList.contains('todo-delete')){
      deleteTodo(e);
      displayTodos();
    }
  })
  displayTodos();
  return el;
}


export default ProjectDetails;