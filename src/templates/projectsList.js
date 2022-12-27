import toHtml from "../util/toHtml";

const ProjectsList = ({collection, selectProject, addProject}) => {
  const el = toHtml(`<div class='projects-list'>
<ul></ul>
<footer>
  <span class='tooltip tooltip-right' data-tooltip='Add Project'>
  <label class="add-project btn-rounded btn btn-primary" for="modal1"><i class='bi-journal-plus'></i></label>
  <input class="modal-state" id="modal1" type="checkbox" />
  <div class="modal">
    <label class="modal-overlay" for="modal1"></label>
    <div class="modal-content flex flex-col gap-5">
      <label class="modal-close" for="modal1"></label>
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
  el.querySelector('ul').addEventListener('click', (e)=> 
    selectProject(e.target.closest(".project").dataset.id)
  );
  el.querySelector('[name="new-project-form"]').addEventListener('submit', (e)=>{
    addProject(el.querySelector('#new-project-title').value);
    clearAndClose();
  });
  el.querySelector('.cancel-btn').addEventListener('click', clearAndClose );
  el.querySelector('ul').append(...collection.map(Project));

  return el;
}

const Project = ({_id, data}) => {
  return toHtml(`<li class='project' data-id=${_id}>
  <h4 class='title'>${data.title} ${data.collection?.length>0 ? `(${data.collection.length})` : ''} </h4>
</li`)
}

const AddProjectModalContent = ()=> {
  return toHtml(`<div class='add-project-modal-content'>
  <header><h3>Add Project</h3><span class='close-btn'></span></header>
  <form class='add-project-form' action='#'>
    <label for='title'>Title: <input name='title' placeholder='Project title' type='text' /></label>
    <div>
      <button class='cancel'>Cancel</button><button class='add'>Add project</button>
    </div>
  </form>  
</div>`)
}

export default ProjectsList;
export { AddProjectModalContent };