import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./util/firebase";
import "./FilterPage.css";

function FilterPage({ handleHideFilter }) {
  const [questions, setQuestions] = useState([]);
  const [filter, setFilter] = useState({ title: "", tags: "", date: "" });
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const questionsCol = collection(db, "questions");
      const snapshot = await getDocs(questionsCol);
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setQuestions(list);
    };
    fetchQuestions();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "questions", id));
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredQuestions = questions.filter(
    (q) =>
      (q.title || "").toLowerCase().includes(filter.title.toLowerCase()) &&
      (q.tags || "").toLowerCase().includes(filter.tags.toLowerCase()) &&
      (filter.date === "" ||
        new Date(q.date).toDateString() === new Date(filter.date).toDateString())
  );

  return (
    <div className="find-questions">
      <div className="filter-header">
        <h2>All Posted Questions</h2>
        <button className="back-btn" onClick={handleHideFilter}>
          Back
        </button>
      </div>

      {/* Filter Inputs */}
      <div className="filter-section">
        <input
          type="text"
          placeholder="Filter by title"
          value={filter.title}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="Filter by tags"
          value={filter.tags}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, tags: e.target.value }))
          }
        />
        <input
          type="date"
          value={filter.date}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, date: e.target.value }))
          }
        />
      </div>

      {/* Questions List */}
      <div className="questions-list">
        {filteredQuestions.map((q) => (
          <div
            key={q.id}
            className={`question-card ${expandedId === q.id ? "expanded" : ""}`}
            onClick={() => handleExpand(q.id)}
          >
            <h3>{q.title}</h3>
            <p>
              <strong>Tags:</strong> {q.tags} |{" "}
              <strong>Date:</strong> {new Date(q.date).toLocaleDateString()}
            </p>

            {expandedId === q.id && (
              <div className="expanded-section">
                <p>{q.description}</p>
                {q.image && (
                  <img
                    src={q.image}
                    alt="Question"
                    className="question-image"
                  />
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(q.id);
                  }}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterPage;
