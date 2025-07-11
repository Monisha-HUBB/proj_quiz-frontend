import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../style/QuizAttempt.css';

interface Question {
  id: number;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
}

function QuizAttempt() {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [submittedScore, setSubmittedScore] = useState<string | null>(null);
  console.log(submittedScore);

useEffect(() => {
  const token = localStorage.getItem('token');

 fetch(`http://localhost:8085/user/quiz/${quizId}`, {

  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  }
})

    .then(res => {
      if (!res.ok) {
        throw new Error("Unauthorized or failed to fetch quiz");
      }
      return res.json();
    })
    .then(data => setQuestions(data.questions))
    .catch(err => {
      alert('Please login again');
      navigate('/participant/home');
    });
}, [quizId, navigate]);

 const handleChange = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleCloseModal = () => {
    setShowModal(false);
  setSubmittedScore(null);
  navigate('/participant/home');
};


  const handleBack = () => {
    navigate('/participant/home')
  }



const handleSubmit = async () => {
  const response = await fetch('http://localhost:8085/user/submit-quiz', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      quizId: parseInt(quizId || '0'),
      answers: answers,
    }),
  });

  const score = await response.text();
 setSubmittedScore(score);


  setShowModal(true);
};


return (
  <div className="quiz-container">
        <div className='back-button-container'>
     <button className='back-button' onClick={handleBack}>Back</button>
   </div>
    <h2 className="quiz-title">Quiz #{quizId}</h2>

    {questions.map(q => (
      <div className="question-card" key={q.id}>
        <p className="question-text">{q.questionText}</p>
        <div className="options">
          <label><input type="radio" name={q.id.toString()} value={q.optionA} onChange={() => handleChange(q.id, q.optionA)} /> {q.optionA}</label>
          <label><input type="radio" name={q.id.toString()} value={q.optionB} onChange={() => handleChange(q.id, q.optionB)} /> {q.optionB}</label>
          <label><input type="radio" name={q.id.toString()} value={q.optionC} onChange={() => handleChange(q.id, q.optionC)} /> {q.optionC}</label>
          <label><input type="radio" name={q.id.toString()} value={q.optionD} onChange={() => handleChange(q.id, q.optionD)} /> {q.optionD}</label>
        </div>
      </div>
    ))}

    <button className="submit-btn" onClick={handleSubmit}>Submit Quiz</button>

    {/* ✅ Modal goes here inside the return */}
{showModal && (
  <div className="modal-overlay" onClick={handleCloseModal}>
    <div className="modal-content" onClick={e => e.stopPropagation()}>
      <button className="modal-close-btn" onClick={handleCloseModal}>×</button>
      <h2>Quiz Submitted!</h2>
      <p>Your quiz has been submitted successfully.</p>
      {submittedScore && (
        <>
        <p >You scored  in this quiz.</p>
        <strong>{submittedScore}</strong>
        </>
      )}
      <p>You can check full results in the <strong>"View Results"</strong> page.</p>
      <button onClick={handleCloseModal}>Go to Home</button>
    </div>
  </div>
)}

  </div>
);
}

export default QuizAttempt;
