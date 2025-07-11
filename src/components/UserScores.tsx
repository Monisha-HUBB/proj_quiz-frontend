import { useEffect, useState } from 'react';
import '../style/UserScores.css';
import { useNavigate } from 'react-router-dom';

interface Score {
  quizId: number;
  quizTitle: string;
  score: number;
  userEmail: string;
}

function UserScores() {
  const [scores, setScores] = useState<Score[]>([]);
   const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem('token');
  fetch('http://localhost:8085/user/all-scores', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then(data => setScores(data));
}, []);

  const handleBack = () => {
    navigate('/admin/dashboard')
  }


return (
    <div className="user-scores-container">
              <div className='back-button-container'>
     <button className='back-button' onClick={handleBack}>Back</button>
   </div>
      <h2>User Scores</h2>
      <table>
        <thead>
          <tr>
            <th>Quiz ID</th>
            <th>Quiz Title</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((s, index) => (
            <tr key={index}>
              <td>{s.quizId}</td>
              <td>{s.quizTitle}</td>
              <td>{s.score.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserScores;
