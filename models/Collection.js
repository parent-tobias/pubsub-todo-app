import createUUID from "../util/createUUID";

const Collection = ({_id=createUUID(), title='Default Collection'}) => {
  let listeners = {};

  const subscribe = (message, func) => {
    listeners[message] = listeners[message] ?
      [...listeners[message], func] : [func];
  }
  const unsubscribe = (message, func) => {
    listeners[message] = listeners[message].filter(
      listenerFunc => listenerFunc !== func
    )
  }

  let stuff = [];

  const add = (item) => {
    const thing = {
      _id: createUUID(),
      data: item
    }
    stuff = [...stuff, thing];
    listeners.add?.forEach(
      (subscriber) => subscriber( thing, {_id, title, collection: findAll()} )
    )
    return thing;
  }
  const byId = (id) => stuff.find(thing => thing._id === id)
  const find = (func) => stuff.find((thing)=>func(thing.data));
  const findAll = () => [...stuff];
  const remove = (itemId) => {
    stuff = stuff.filter(thing => thing._id !== itemId);
    listeners.remove?.forEach(
      (subscriber) => subscriber( itemId,  {_id, title, collection: findAll()} )
    )
    return findAll().length;
  }
  const update = (itemId, func) => {
    stuff = stuff.map(thing => thing._id===itemId ? {_id: thing._id, data: func(thing.data)} : thing );
    listeners.update?.forEach(
      (subscriber) => subscriber( byId(itemId),  {_id, title, collection: findAll()} )
    )
    return byId(itemId);
  }

  return Object.freeze({
    get _id(){ return _id; },
    get title(){ return title; },
    get collection(){ return stuff.length ? [...stuff] : undefined },
    isA: 'Collection',
    add,
    byId,
    find,
    findAll,
    remove,
    update,
    subscribe,
    unsubscribe
  })
}

Collection.of = (factory) => (object) => {
  const main = Collection({_id: object._id || undefined, title: object.title});
  object.collection?.forEach( item => {
    console.log(`Creating ${factory.isA}`, item)
    let creator = factory.of(item.data);
    let subcontainer;
    if(item.collection){
      subcontainer = creator(item.collection)
    }
    main.add(subcontainer);
  })
  return main
}

export default Collection;