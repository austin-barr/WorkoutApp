import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import Navbar from "../Navbar/Navbar.js";
import ScrollableList from "react-scrollable-list";
import ScrollableButtonList from "../SelectLIst/ScrollableButtonList.js";
import modalTest from "../modal/modalTest.js";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalTest from "../modal/modalTest.js";

let listItems = [];
// for (let i = 0; i < 100; i++) {
//   listItems.push({ id: i, content: i });
// }
listItems.push({ content: "workout1" });
listItems.push({ content: "banana" });
listItems.push({ content: "orange" });
listItems.push({ content: "grape" });
listItems.push({ content: "strawberry" });
listItems.push({ content: "blueberry" });
listItems.push({ content: "raspberry" });
listItems.push({ content: "blackberry" });
listItems.push({ content: "watermelon" });
listItems.push({ content: "cantaloupe" });
listItems.push({ content: "honeydew" });
// listItems.push({ id: 11, content: "kiwi" });
// listItems.push({ id: 12, content: "pineapple" });
// listItems.push({ id: 13, content: "mango" });
// listItems.push({ id: 14, content: "papaya" });
// listItems.push({ id: 15, content: "peach" });
// listItems.push({ id: 16, content: "pear" });
// listItems.push({ id: 17, content: "plum" });
// listItems.push({ id: 18, content: "cherry" });
// listItems.push({ id: 19, content: "lemon" });
// listItems.push({ id: 20, content: "lime" });
// listItems.push({ id: 21, content: "coconut" });
// listItems.push({ id: 22, content: "fig" });
// listItems.push({ id: 23, content: "date" });
// listItems.push({ id: 24, content: "nectarine" });
// listItems.push({ id: 25, content: "apricot" });
// listItems.push({ id: 26, content: "guava" });
// listItems.push({ id: 27, content: "persimmon" });
// listItems.push({ id: 28, content: "pomegranate" });
// listItems.push({ id: 29, content: "dragonfruit" });
// listItems.push({ id: 30, content: "starfruit" });
// listItems.push({ id: 31, content: "passionfruit" });
// listItems.push({ id: 32, content: "lychee" });
// listItems.push({ id: 33, content: "jackfruit" });
// listItems.push({ id: 34, content: "durian" });
// listItems.push({ id: 35, content: "breadfruit" });
// listItems.push({ id: 36, content: "tangerine" });
// listItems.push({ id: 37, content: "kumquat" });
// listItems.push({ id: 38, content: "persimmon" });
// listItems.push({ id: 39, content: "tangelo" });
// listItems.push({ id: 40, content: "boysenberry" });
// listItems.push({ id: 41, content: "loganberry" });
// listItems.push({ id: 42, content: "gooseberry" });
// listItems.push({ id: 43, content: "elderberry" });
// listItems.push({ id: 44, content: "cranberry" });
// listItems.push({ id: 45, content: "currant" });
// listItems.push({ id: 46, content: "raisin" });
// listItems.push({ id: 47, content: "prune" });
// listItems.push({ id: 48, content: "tomato" });
// listItems.push({ id: 49, content: "avocado" });
// listItems.push({ id: 50, content: "olive" });
// listItems.push({ id: 51, content: "eggplant" });
// listItems.push({ id: 52, content: "bell pepper" });
// listItems.push({ id: 53, content: "squash" });
// listItems.push({ id: 54, content: "zucchini" });
// listItems.push({ id: 55, content: "cucumber" });
// listItems.push({ id: 56, content: "pumpkin" });
// listItems.push({ id: 57, content: "corn" });
// listItems.push({ id: 58, content: "potato" });

const buttonData = [
  "Button 1",
  "Button 2",
  "Button 3",
  "Button 4",
  "Button 5",
  "Button 6",
  "Button 7",
];

function MyWorkouts() {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <div style={{ float: "left" }}>
      {/* <ScrollableList
          listItems={listItems}
          heightOfItem={30}
          maxItemsToRender={20}
          style={{ color: "#333" }}
        /> */}
      <form className="form-control">
        <Navbar />
        <label>My Workouts</label>
        {/* <ScrollableList
          listItems={listItems}
          // className="form-control2"
          heightOfItem={20}
          maxItemsToRender={20}
          style={{ color: "#333", border: "1px solid black" }}
        /> */}
        <ScrollableButtonList data={buttonData} />
        <button
          type="button"
          className="btn btn-primary btn-block"
          style={{ marginTop: "25px" }}
        >
          Add a new workout
        </button>
        <button
          type="button"
          className="btn btn-primary btn-block"
          style={{ marginTop: "25px" }}
        >
          Log a Workout
        </button>
      </form>
      {/* <form className="form-control2" style={{ float: "right" }}>
        <div className="form-group">
          <label>Workout Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Workout Name"
          />
        </div>
        <div id="button" class="table-item">
          <Button variant="primary" onClick={() => setModalShow(true)}>
            Launch vertically centered modal
          </Button>

          <ModalTest show={modalShow} onHide={() => setModalShow(false)} />
        </div>
      </form> */}
    </div>
  );
}

export default MyWorkouts;
