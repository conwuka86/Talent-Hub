export default function ProjectItem({ pro }) {
  return (
    <article>
      <h4>{new Date(project.createdAt).toLocaleDateString()}</h4>
      <p>{project.content}</p>
      <h4>🕺{project.user.name}</h4>
    </article>
  );
}
