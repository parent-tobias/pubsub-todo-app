import './style.css'
import Collection from './models/Collection';
import Todo from './models/Todo';

const appStoreKey = 'Todo-app-project';

const loadFunc = (key)=>{
  return JSON.parse(localStorage.getItem(key));
}
const addFunc = async ( thing, collection ) => {
  localStorage.setItem(collection._id, JSON.stringify(collection));

}
const updateFunc = ( thing, collection ) => {
  localStorage.setItem(collection._id, JSON.stringify(collection));
  console.log(`Updated ${JSON.stringify(thing)} in collection ${collection.title}, and saved!`)
}
const removeFunc = ( id, collection ) => {
  localStorage.setItem(collection._id, JSON.stringify(collection));
  console.log(`Removed item ${id} from collection ${collection.title}, and saved!`)
}

// This is solely for the purpose of being able to manipulate the Todo App Manager
//  from the console. Remove 'em in production!
window.myTodoAppManager = undefined;
window.Collection = Collection;
window.Todo = Todo;

(()=>{
  const store = loadFunc(appStoreKey);

  if(store){
    const {_id, title, collection=[] } = store;
    myTodoAppManager = Collection({_id, title});
    collection.forEach( ({data}) => {
      const project = Collection({_id: data.id, title: data.title});
      data.collection?.forEach( todoObj => {
        const todo = Todo(todoObj);
        project.add(todo.data);
      })
      myTodoAppManager.add(project);
    })
  } else {
    myTodoAppManager = Collection({title:'My Todo App', _id: 'Todo-app-project'});

    const projects = [
      Collection({title:'Personal tasks'}),
      Collection({title: 'Work projects : team'}),
      Collection({title: 'Work projects : solo'}),
      Collection({title: 'Family tasks'})
    ]

    projects.forEach( project => {
      myTodoAppManager.add(project);
    })
  }

  myTodoAppManager.subscribe('add', addFunc);
  myTodoAppManager.subscribe('update', updateFunc);
  myTodoAppManager.subscribe('remove', removeFunc)

  myTodoAppManager.findAll().forEach( ({_id, data}) => {
    if(data.isA==='Collection'){
      const triggerManager = ()=>myTodoAppManager.update(_id, (data)=>data)
      data.subscribe('add', triggerManager);
      data.subscribe('update', triggerManager);
      data.subscribe('remove', triggerManager);
    }
  })

})()
