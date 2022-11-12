/* Vamos a trabajar todo desde la app para aprender a trabajar con la libria de drag and drop */
import { useEffect, useState } from "react"
import {DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
const App = () => { 
  const inititialState = JSON.parse(localStorage.getItem('todos')) || [
    {id:1, text: 'aprender Html'},
    {id:2, text: 'aprender JavaScript'},
    {id:3, text: 'aprender Css'},
    {id:5, text: 'aprendere Node Js'},
    {id:4, text: 'aprendere Css '},
    {id:6, text: 'aprendere React '},
    {id:7, text: 'aprendere Git'},
    {id:7, text: 'aprendere vue js.'},
  ]
  const [todos, setTodos] = useState(inititialState)

  useEffect( () => {
    localStorage.setItem('todos',JSON.stringify(todos))
  }, [todos])

  const handleDragEnd = (result) => {
    if(!result.destination) return
    const startindex = result.source.index
    const endIndex = result.destination.index;
    
    const copyArray = [...todos]
    const [reOrdenItem] = copyArray.splice(startindex,1) 
    copyArray.splice(endIndex, 0, reOrdenItem)
    setTodos(copyArray)
  }

  return(
      < DragDropContext onDragEnd={handleDragEnd}>
        <div className="w-2/5 mx-auto mt-8 border-2 rounded-md   text-stone-50  bg-zinc-900	">
          <h1 className="w-full scroll-py-2.5 mt-5 text-center">TODO</h1>
          <Droppable droppableId="todos">
            {
              (droppableProvider) => (
              <ul className="text-center py-1.5v mb-4  bg-zinc-900" ref={droppableProvider.innerRef} {...droppableProvider.droppableProps}>
                {
                  todos.map((todo, index) => (
                    <Draggable index={index} key={todo.id} draggableId={`${todo.id}`}>
                      {
                        (draggableProvider) => (
                          <li ref={draggableProvider.innerRef} {...draggableProvider.draggableProps} {...draggableProvider.dragHandleProps} className=" mx-2 my-1 border-solid bg-sky-900 rounded-md  border-r-blue-700">
                            {todo.text}
                          </li>
                        )
                      }
                    </Draggable>
                  ))
                }
                {droppableProvider.placeholder}
              </ul>
              )
            }
          </Droppable>
        </div>
      </DragDropContext>
    ) 
}

export default App