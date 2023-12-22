import { useState, useEffect } from 'react';
import list from './SelectableList.module.css'

export default function SelectableList(props) {

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
      <ul className={props.listClass + " " + list.list}>
        {props.items.map((item, index) => (
          <li
            key={index}
            onClick={(event)=>handleItemClicked(event, index)}
          >
            <div>
              {props.makeListElement(item)}
            </div>
          </li>
        ))}
    </ul>
    );
}