import { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { StrictModeDroppable } from './StrictModeDroppable';
import dnd from './DnDList.module.css'

export default function DnDList(props) {

    const handleDragEnd = (result) => {
      console.log(result)
        if (!result.destination) return;

        const srcIndex = result.source.index
        const destIndex = result.destination.index
        if (srcIndex < props.clickedIndex && destIndex >= props.clickedIndex) {
          props.setClickedIndex(props.clickedIndex-1)
        }
        else if (srcIndex > props.clickedIndex && destIndex <= props.clickedIndex) {
          props.setClickedIndex(props.clickedIndex+1)
        }
        else if (srcIndex == props.clickedIndex) {
          props.setClickedIndex(destIndex)
        }

        const updatedList = [...props.list]
        const [reorderedList] = updatedList.splice(result.source.index, 1);
        updatedList.splice(result.destination.index, 0, reorderedList);
        console.log(updatedList);
        props.setList(updatedList);
    };

    const handleRemove = (event, index) => {
      event.stopPropagation();
      console.log(index, props.clickedIndex)
      if (index < props.clickedIndex) {
        props.setClickedIndex(props.clickedIndex-1)
      }
      else if (index == props.clickedIndex) {
        props.setClickedIndex()
      }
      const updatedList = [...props.list];
      updatedList.splice(index, 1);
      props.setList(updatedList);
      props.onRemove(index)
    };

    const handleItemClicked = (event, index) => {
      if (index != props.clickedIndex) {
        props.setClickedIndex(index)
        props.onSelect(event, index)
      }
      else {
        props.setClickedIndex()
        props.onUnselect(event, index)
      }
        

    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <StrictModeDroppable droppableId="itemList">
            {(provided) => (
              <ul
                className={dnd.list}
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ listStyleType: 'none', padding: 0, width: '100%'}}
              >
              {props.list.map((item, index) => (
                <Draggable key={index} draggableId={`item-${index}`} index={index}>
                  {(provided, snapshot) => (
                      <li
                        key={index}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`${dnd.listItem} ${snapshot.isDragging ? dnd.isDragging : ""} ${props.clickedIndex==index ? dnd.isClicked : ""}`}
                        style={{
                          ...provided.draggableProps.style,
                        }}
                        onClick={(event)=>handleItemClicked(event, index)}
                      >
                        <div className={dnd.listElementText}>
                          {props.makeListElement(item)}
                        </div>
                        <button
                          className={dnd.deleteButton}
                          type="button"
                          onClick={(event) => handleRemove(event, index)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                          </svg>
                        </button>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                </ul>
            )}
            </StrictModeDroppable>
        </DragDropContext>
    );
}