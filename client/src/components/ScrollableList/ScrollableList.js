import { useState, useEffect } from 'react';

export default function DnDList(props) {

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
      <ul className={props.listClass}>
        {props.items.map((item, index) => (
          <li onClick={(event)=>handleItemClicked(event, index)}>
          <div>
            {props.makeListElement(item)}
          </div>
        </li>
        ))}
    </ul>
    );
}