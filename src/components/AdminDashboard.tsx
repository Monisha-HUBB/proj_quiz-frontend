import { useNavigate } from 'react-router-dom';
import '../style/AdminDashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();

    const handleBack = () => {
      localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/')
  }

return (
    <div className="dashboard-container">

    <div className='back-button-container'>
     <button className='back-button' onClick={handleBack}>Back</button>
   </div>

      <h2 className="dashboard-title">Admin Dashboard</h2>
      <div className="dashboard-buttons">
        <button onClick={() => navigate('/admin/create-quiz')}>
          Create New Quiz
        </button>
        <button onClick={() => navigate('/admin/add-question')}>
          Add Question to Quiz
        </button>
        <button onClick={() => navigate('/admin/view-scores')}>
          View User Scores
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;
