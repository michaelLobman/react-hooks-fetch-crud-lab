import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(r => r.json())
      .then(questions => setQuestions(questions))
  }, [])

  function handleAddQuestion(addedQuestion){
    setQuestions([...questions, addedQuestion])
    setPage("List")
  }

  function handleDeleteQuestion(id){
    const updatedQuestions = questions.filter(question => question.id !== id)
    setQuestions(updatedQuestions)
  }

  function handleChangeAnswer(updatedQuestion){
    const updatedQuestions = questions.map(question => {
      if (question.id === updatedQuestion.id){
        return updatedQuestion
      } else {
        return question
      }
    })
    setQuestions(updatedQuestions)
  }


  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion={handleAddQuestion} /> : <QuestionList questions={questions} onDeleteQuestion={handleDeleteQuestion} onChangeAnswer={handleChangeAnswer}/>}
    </main>
  );
}

export default App;
