import toHtml from "../util/toHtml";

const ProjectDetails = ({_id, data: project}) => {
  const el = toHtml(`<div class='project-detail' data-id='${_id}'>
  <header class='w-full flex justify-center'>
    <h3 class='text-2xl font-extrabold text-purple-500'>${project.title}</h3>
  </header>
  <ul class='project-todos'></ul>
  <footer>
    add button? 
  </footer>
</div>`);
  el.querySelector('.project-todos').append(...project.collection?.map(Todo) || 'No Todos Yet!')
  return el;
}

const Todo = (todo) => {
  console.log(todo);
  return toHtml(`<li class='todo pb-4' data-id=${todo._id}>
  <h4 class='title'>${todo.data?.title}</h4>
  <p class='pl-2 italic'>${todo.data?.description} (${todo.data?.due ? new Date(todo.data.due).toDateString() : 'NDD' })</p>
</li`)
}

export default ProjectDetails;