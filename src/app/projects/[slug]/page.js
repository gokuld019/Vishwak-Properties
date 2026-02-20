// app/projects/[id]/page.js
import ProjectDetailsPage from '../../../components/ProjectDetailsPage';

export default function ProjectPage({ params }) {
  return <ProjectDetailsPage projectId={params.id} />;
}