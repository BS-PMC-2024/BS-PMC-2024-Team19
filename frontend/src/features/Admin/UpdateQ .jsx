import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"; // ייבוא SweetAlert2
import "./UpdateQ.css"; // ייבוא קובץ ה-CSS

const UpdateQ = () => {
  const [questions, setQuestions] = useState({}); // מצב לשמירת השאלות כאובייקט
  const [selectedQuestionId, setSelectedQuestionId] = useState(null); // מצב לשמירת מזהה השאלה שנבחרה
  const [text, setText] = useState(""); // מצב לשמירת הטקסט של השאלה הנבחרת

  useEffect(() => {
    // פשט את השאלות מה-API
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          "http://localhost:6500/backend/auth/getAllQuestions"
        );
        if (response.ok) {
          const data = await response.json();

          // הנחה שהנתונים הם אובייקט עם מזהים כשמות מפתחות
          if (data.questions && Array.isArray(data.questions)) {
            // המרת התשובות לאובייקט
            const questionsObject = data.questions.reduce((acc, question) => {
              acc[question.id] = question;
              return acc;
            }, {});
            setQuestions(questionsObject);
            const firstQuestionId = data.questions[0].id; // קח את המפתח הראשון
            setSelectedQuestionId(firstQuestionId);
            setText(questionsObject[firstQuestionId]?.question_text || "");
          } else {
            console.error("Data is not an array:", data);
          }
        } else {
          console.error("Error fetching questions:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []); // נטען פעם אחת כשהקומפוננטה נטענת

  useEffect(() => {
    // עדכן את הטקסט של השאלה הנבחרת
    if (selectedQuestionId) {
      setText(questions[selectedQuestionId]?.question_text || "");
    }
  }, [selectedQuestionId, questions]);

  const handleQuestionChange = (event) => {
    const id = event.target.value;
    setSelectedQuestionId(id);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleUpdate = async () => {
    // הצגת חלון אישור
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update this question?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "No, cancel",
      customClass: {
        title: "swal-title",
        content: "swal-content",
        confirmButton: "swal-confirm-button",
        cancelButton: "swal-cancel-button",
      },
    });

    if (result.isConfirmed) {
      console.log("Selected Question ID:", selectedQuestionId);
      console.log("Question Text:", text);

      try {
        const response = await fetch(
          "http://localhost:6500/backend/auth/updateQuestions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: selectedQuestionId,
              question_text: text,
            }),
            credentials: "include",
          }
        );

        if (response.ok) {
          setQuestions((prevQuestions) => ({
            ...prevQuestions,
            [selectedQuestionId]: {
              ...prevQuestions[selectedQuestionId],
              question_text: text,
            },
          }));

          Swal.fire(
            "Updated!",
            "The question has been updated successfully.",
            "success"
          );
        } else {
          console.error("Error updating question:", response.statusText);
          Swal.fire(
            "Error!",
            "There was an error updating the question.",
            "error"
          );
        }
      } catch (error) {
        console.error("Error updating question:", error);
        Swal.fire(
          "Error!",
          "There was an error updating the question.",
          "error"
        );
      }
    }
  };

  return (
    <div className="update-q-container">
      <h2 className="title">Update Question</h2>
      <div className="dropdown-container">
        <label htmlFor="questionSelect" className="label">
          Select Question:
        </label>
        <select
          id="questionSelect"
          value={selectedQuestionId || ""}
          onChange={handleQuestionChange}
          className="dropdown"
        >
          {Object.keys(questions).map((id) => (
            <option key={id} value={id}>
              {questions[id].question_text}
            </option>
          ))}
        </select>
      </div>
      <div className="question-container">
        <p className="question-text">
          {questions[selectedQuestionId]?.question_text}
        </p>
      </div>
      <textarea
        value={text}
        onChange={handleTextChange}
        className="textarea"
        rows={6}
      />
      <button onClick={handleUpdate} className="update-button">
        Update Question
      </button>
    </div>
  );
};

export default UpdateQ;
