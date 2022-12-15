const Todo = ({
  title='',
  description='',
  created=Date.now(),
  due=Date.now()
}) => {
  return Object.freeze({
    get title(){ return title; },
    get descripton(){ return description; },
    get created(){ return created; },
    get due(){ return due; },
    isA: 'Todo'
  })
}

Todo.of = (object) => {
  return Todo(object);
}

export default Todo;