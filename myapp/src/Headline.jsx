import './HeadLine.css';
import { useNavigate } from "react-router-dom";

function HeadLine({ selection, setSelection, handleShowFilter }) {
  const navigate = useNavigate();

  const handleSelect = (type) => {
    setSelection(type);
    if (type === "Article") navigate("/article");
    if (type === "Question") navigate("/description");
  };

  return (
    <div className="headline-container">
      <h2 className="headline">What do you want to Share</h2>
      <h1 className="headline">New Post</h1>

      <div className="post-type-container">
        <p className="type">Select Post Type:</p>

        <label>
          <input
            type="radio"
            name="post-type"
            value="question"
            checked={selection === "Question"}
            onChange={() => handleSelect("Question")}
          />
          <span className="post-type">Question</span>
        </label>

        <label>
          <input
            type="radio"
            name="post-type"
            value="article"
            checked={selection === "Article"}
            onChange={() => handleSelect("Article")}
          />
          <span className="post-type">Article</span>
        </label>
      </div>
 
      <div className="headline-action-row">
       
        <button className="filter-btn" onClick={handleShowFilter}>
          View Questions
        </button>
      </div>
    </div>
  );
}

export default HeadLine;
