import { useState } from 'react';
import '../style/CreateQuiz.css';
import { useNavigate } from 'react-router-dom';

function CreateQuiz() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

const handleCreate = async () => {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch('http://localhost:8085/admin/create-quiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description }),
    });

    const data = await response.text();
    console.log("Server response:", data);
    alert(data);
  } catch (err) {
    console.error("Error submitting quiz:", err);
  }
};

  const handleBack = () => {
    navigate('/admin/dashboard')
  }


return (
  <>
  <div className="create-quiz-container">
<div className='back-button-container'>
    <button className='back-button' onClick={handleBack}>Back</button>
  </div>
      <h2>Create a New Quiz</h2>
      <input
        type="text"
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)} />
      <textarea
        placeholder="Quiz Description"
        value={description}
        rows={5}
        onChange={(e) => setDescription(e.target.value)} />
      <button className="create-quiz-button" onClick={handleCreate}>Create Quiz</button>
    </div></>
  );
}

export default CreateQuiz;
