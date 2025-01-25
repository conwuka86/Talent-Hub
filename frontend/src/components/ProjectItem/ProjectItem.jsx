export default function ProjectItem({ project }) {
  return (
    <article>
     <h4>{new Date(project.createdAt).toLocaleDateString()}</h4>
      <p>{project.content}</p>
      <h4>🕺Created by: {project.user?.name || "Unknown User"}</h4>
    </article>
  );
}
