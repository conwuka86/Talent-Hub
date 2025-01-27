import { Link } from 'react-router';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className="homepage">
      <header className="hero">
        <h1 className="hero-title">Welcome to Talent-Hub</h1>
        <p className="hero-subtitle">
          Discover a better way to plan and manage your projects and talents.
        </p>
        <div className="hero-actions">
          <Link to="/projects" className="primary-btn">
            Explore Projects
          </Link>
          <Link to="/talents" className="secondary-btn">
            Discover Talents
          </Link>
        </div>
      </header>

      <section className="features">
        <h2 className="section-title">Why Talent-Hub?</h2>
        <div className="feature-list">
          <div className="feature-item">
            <h3>Manage Your Projects</h3>
            <p>
              Dynamically manage your projects for efficiency and productivity.
            </p>
          </div>
          <div className="feature-item">
            <h3>Manage Your Talents</h3>
            <p>
              Have a clear picture of talents and skills available for your project
              at every time.
            </p>
          </div>
          <div className="feature-item">
            <h3>Be Productive</h3>
            <p>
              Work smarter not harder. Stay organized.
              Talent-Hub is here for you.
            </p>
          </div>
        </div>
      </section>

      <section className="call-to-action">
        <h2>Ready to Get Started?</h2>
        <p>
          Let Talent-Hub help your company reach it's projet goals.
          Plan and organize your projects.
        </p>
        <Link to="/projects/new" className="primary-btn">
          Create Your First Project Now
        </Link>
      </section>
    </div>
  );
}
