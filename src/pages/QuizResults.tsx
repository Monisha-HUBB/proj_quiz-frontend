import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/QuizResults.css';

interface QuizResult {
  quizId: number;
  quizTitle: string;
  score: number;
}

function QuizResults() {
  const [results, setResults] = useState<QuizResult[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:8085/user/quiz-results', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(data => setResults(data))
      .catch(err => {
        alert('Please login again');
        navigate('/');
      });
  }, [navigate]);

  const handleBack = () => {
    navigate('/participant/home')
  }

 return (
  <>
<div className="results-container">
    <div className='back-button-container'>
     <button className='back-button' onClick={handleBack}>Back</button>
   </div>
       <h2 className="results-title">Your Quiz Results</h2>
       {results.map(result => (
         <div key={result.quizId} className="result-card">
           <div className="result-title">{result.quizTitle}</div>
           <div className="result-score">Score: {result.score.toFixed(2)}%</div>
         </div>
       ))}
     </div>
     </>
  );
}

export default QuizResults;
