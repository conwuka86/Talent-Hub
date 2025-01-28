import { useState } from 'react';
import { Routes, Route } from 'react-router';
import { getUser } from '../../services/authService';
import './App.css';
import HomePage from '../HomePage/HomePage';
import ProjectListPage from '../ProjectListPage/ProjectListPage';
import NewProjectPage from '../NewProjectPage/NewProjectPage';
import TalentListPage from '../TalentListPage/TalentListPage';
import NewTalentPage from '../NewTalentPage/NewTalentPage';
import SignUpPage from '../SignUpPage/SignUpPage';
import LogInPage from '../LogInPage/LogInPage';
import NavBar from '../../components/NavBar/NavBar';
import ProjectDetailsPage from '../ProjectDetailsPage/ProjectDetailsPage';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      <section id="main-section">
        {user ? (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectListPage />} />
            <Route path="/projects/new" element={<NewProjectPage />} />
            <Route path="/talents" element={<TalentListPage />} />
            <Route path="/talents/new" element={<NewTalentPage />} />
            <Route path="/projects/:id" element={<ProjectDetailsPage />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
            <Route path="/login" element={<LogInPage setUser={setUser} />} />
          </Routes>
        )}
      </section>
    </main>
  );
}
