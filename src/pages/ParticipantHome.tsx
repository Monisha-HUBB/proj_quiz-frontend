import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/ParticipantHome.css';

interface Quiz {
  id: number;
  title: string;
  description: string;
}

function ParticipantHome() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem('token');

  fetch('http://localhost:8085/user/quizzes', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => {
      if (!res.ok) throw new Error("Unauthorized");
      return res.json();
    })
    .then(data => setQuizzes(data))
    .catch(err => {
      alert('Please login again');
      navigate('/');
    });
}, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

 return (
    <div className="container">
      <div className="top-bar">
        <button className="btn logout" onClick={handleLogout}>Logout</button>
        <button className="btn results" onClick={() => navigate('/participant/results')}>View Results</button>
      </div>

      <h2 className="title">Available Quizzes</h2>

      <ul className="quiz-list">
        {quizzes.map(quiz => (
          <li className="quiz-card" key={quiz.id}>
            <h3>{quiz.title}</h3>
            <p>{quiz.description}</p>
            <button className="btn start" onClick={() => navigate(`/participant/quiz/${quiz.id}`)}>
              Start Quiz
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ParticipantHome;
