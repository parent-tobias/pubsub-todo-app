import './style.css'
import toHtml from './src/util/toHtml';

import myTodoAppManager, { Collection, Todo } from './src/components/myTodoAppManager';

import Layout from './src/templates/layout';
import ProjectsList from './src/templates/projectsList';
import ProjectDetails from './src/templates/projectDetails';


const handleAddProject = (title)=>{
  myTodoAppManager.add({title})
}

const handleAddTodo = (projectId, todoObj)=>{
  myTodoAppManager.byId(projectId).data.add(Todo(todoObj))
}
const handleRemoveTodo = (projectId, todoId) =>{
  myTodoAppManager.byId(projectId).data.remove(todoId);
}

const handleSelectProject = (projectId)=>{
  const content = Layout.el.querySelector('.content-pane');
  while(content.firstChild) content.firstChild.remove();

  content.append(ProjectDetails({
    project: myTodoAppManager.byId(projectId),
    addTodo: handleAddTodo,
    removeTodo: handleRemoveTodo
  }))
}

const displayProjects = ()=>{
  const sidebar = Layout.el.querySelector(".sidebar");
  while(sidebar.firstChild) sidebar.firstChild.remove();
  sidebar.append(ProjectsList({
    collection: myTodoAppManager.findAll(),
    selectProject: handleSelectProject,
    addProject: handleAddProject,
  }))  
}
document.querySelector('#app').append(Layout.el);

Layout.el.querySelector("h1.title").textContent = myTodoAppManager.title;
displayProjects();

myTodoAppManager.subscribe("add", displayProjects )
myTodoAppManager.subscribe("update", displayProjects )
myTodoAppManager.subscribe("delete", displayProjects )

