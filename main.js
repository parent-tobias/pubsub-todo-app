import './style.css'
import toHtml from './src/util/toHtml';

import myTodoAppManager, { Collection, Todo } from './src/components/myTodoAppManager';

import Layout from './src/templates/layout';
import ProjectsList from './src/templates/projectsList';
import ProjectDetails from './src/templates/projectDetails';

const handleSelectProject = (e)=>{
  const id = e.target.closest(".project").dataset.id;
  const content = Layout.el.querySelector('.content-pane');
  while(content.firstChild) content.firstChild.remove();

  content.append(ProjectDetails(myTodoAppManager.byId(id)))
}
const handleAddProject = (title)=>{
  myTodoAppManager.add({title})
  displayProjects();
}

const displayProjects = ()=>{
  const sidebar = Layout.el.querySelector(".sidebar");
  while(sidebar.firstChild) sidebar.firstChild.remove();
  sidebar.append(ProjectsList({
    collection: myTodoAppManager.findAll(),
    selectProject: handleSelectProject,
    addProject: handleAddProject
  }))  
}
document.querySelector('#app').append(Layout.el);

Layout.el.querySelector("h1.title").textContent = myTodoAppManager.title;
displayProjects();

