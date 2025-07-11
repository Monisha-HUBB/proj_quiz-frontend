import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import '../style/AddQuestion.css';
import { useNavigate } from 'react-router-dom';

interface Quiz {
  id: number;
  title: string;
  description: string;
}


function AddQuestion() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  console.log('quiz list', quizzes);
  const [selectedQuiz, setSelectedQuiz] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem('token');
  fetch('http://localhost:8085/admin/quiz-list', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch quiz list");
      return res.json();
    })
    .then(data => setQuizzes(data))
    .catch(err => {
      console.error("Error fetching quiz list:", err);
    });
}, []);


  const handleAdd = async () => {
     const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:8085/admin/questions/add', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
     },
      body: JSON.stringify({
        questionText, optionA, optionB, optionC, optionD, correctAnswer,
        quiz: { id: selectedQuiz }
      }),
    });

    const result = await res.text();
    // alert(result);

   toast.success(`✅ ${result}`, {
    position: "top-center",
    autoClose: 4000,
  
  });

  // setTimeout(() => {
  //   navigate('/participant/home');
  // }, 4200); // Wait for toast to finish
  };

    const handleBack = () => {
    navigate('/admin/dashboard')
  }

  return (
    <div className="add-question-container">
              <div className='back-button-container'>
     <button className='back-button' onClick={handleBack}>Back</button>
   </div>
      <h2>Add Question</h2>
      <select value={selectedQuiz} onChange={(e) => setSelectedQuiz(e.target.value)}>
        <option value="">Select Quiz</option>
        {quizzes.map(q => (
          <option key={q.id} value={q.id}>{q.title}</option>
        ))}
      </select>

      <input placeholder="Question" value={questionText} onChange={(e) => setQuestionText(e.target.value)} />
      <input placeholder="Option A" value={optionA} onChange={(e) => setOptionA(e.target.value)} />
      <input placeholder="Option B" value={optionB} onChange={(e) => setOptionB(e.target.value)} />
      <input placeholder="Option C" value={optionC} onChange={(e) => setOptionC(e.target.value)} />
      <input placeholder="Option D" value={optionD} onChange={(e) => setOptionD(e.target.value)} />
      <input placeholder="Correct Answer" value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} />
      
      <button className='add-question-button' onClick={handleAdd}>Add Question</button>
        <ToastContainer />
    </div>
  );
}

export default AddQuestion;
