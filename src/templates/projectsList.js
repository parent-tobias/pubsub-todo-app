import toHtml from "../util/toHtml";

const ProjectsList = ({
  collection,
  selectProject = ()=>{},
  addProject=()=>{},
  removeProject=()=>{},
  updateProject=()=>{}
}) => {
  const el = toHtml(`<div class='projects-list'>
<ul></ul>
<footer>
  <span class='tooltip tooltip-right' data-tooltip='Add Project'>
  <label class="add-project btn-rounded btn btn-lg btn-secondary" for="new-project-modal"><i class='bi-journal-plus'></i></label>
  <input class="modal-state" id="new-project-modal" type="checkbox" />
  <div class="modal">
    <label class="modal-overlay" for="new-project-modal"></label>
    <div class="modal-content flex flex-col gap-5">
      <label class="modal-close" for="new-project-modal"></label>
      <h2 class="text-xl">Add Project</h2>
        <form name='new-project-form'>
          <label for='new-project-title'>Title: 
            <input type='text' id='new-project-title' class='input input-primary name='new-project-title' />
          </label>
          <div class='flex justify-around w-full'>
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
const clearAndClose = ()=>{
  el.querySelector('#new-project-title').value='';
  el.querySelector('.modal-state').checked=false;

}
  el.querySelector('ul').addEventListener('click', (e)=> {
    if(e.target.classList.contains('bi-pencil')){
      const titleEl = e.target.closest('li').querySelector('.project-title')
      updateProject(titleEl.dataset.id, (project)=>{
        project.title= titleEl.textContent;
        return project
      })
    } else if(e.target.classList.contains('bi-trash')){
      removeProject(e.target.closest('.project').dataset.id);
    } else {
      selectProject(e.target.closest(".project").dataset.id)
    }
  });
  el.querySelector('[name="new-project-form"]').addEventListener('submit', ( )=>{
    addProject(el.querySelector('#new-project-title').value);
    clearAndClose();
  });
  el.querySelector('.cancel-btn').addEventListener('click', clearAndClose );
  el.querySelector('ul').append(...collection.map(Project));

  return el;
}

const Project = ({_id, data}) => {
  return toHtml(`<li class='project flex justify-between mb-4 border-purple-300 border-b' data-id=${_id}>
  <h4 class='title'><span class='project-title' data-id=${_id} contenteditable>${data.title}</span> ${data.collection?.length>0 ? `(${data.collection.length})` : ''} </h4>
  <div>
    <i class='btn btn-secondary btn-xs btn-rounded py-0 px-5 w-0 bi-pencil'></i>
    <i class='btn btn-secondary btn-xs btn-rounded py-0 px-5 w-0 bi-trash'></i>
</li`)
}


export default ProjectsList;