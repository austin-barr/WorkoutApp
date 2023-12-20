import temp from "./TempPage.module.css"
import Navbar from "../Navbar/Navbar";

function TempPage() {

  return (
    <div className={"id-flex justify-content-center align-items-center "+ temp.body} >
      <Navbar />
      <form className="form-container">
        <h1>Big Fellas</h1>
        <div className="p-4">
          Work in Progress
        </div>
      </form>
    </div>
);
}
export default TempPage;