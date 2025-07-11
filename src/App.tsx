import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ParticipantHome from './pages/ParticipantHome';
import QuizAttempt from './pages/QuizAttempt';
import QuizResults from './pages/QuizResults';
// import LogoutButton from './pages/LogoutButton';
import AdminDashboard from './components/AdminDashboard';
import CreateQuiz from './components/CreateQuiz';
import AddQuestion from './components/AddQuestion';
import UserScores from './components/UserScores';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/participant/results" element={<QuizResults />} />
        <Route path="/participant/home" element={<ParticipantHome />} />
        <Route path="/participant/quiz/:quizId" element={<QuizAttempt />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/participant/logout" element={<LogoutButton/>} /> */}

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/create-quiz" element={<CreateQuiz />} />
        <Route path="/admin/add-question" element={<AddQuestion />} />
        <Route path="/admin/view-scores" element={<UserScores />} />

      </Routes>
    </Router>
  );
}

export default App;
