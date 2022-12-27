const Todo = ({
  title='',
  description='',
  priority='normal',
  created=Date.now(),
  due=Date.now()
}) => {
  return Object.freeze({
    get title(){ return title; },
    get description(){ return description; },
    get priority(){ return priority; },
    set priority(value){ priority=value; },
    get created(){ return created; },
    get due(){ return due; },
    isA: 'Todo'
  })
}

export default Todo;