// app/project-details/[projectId]/page.js

import ProjectDetailsPage from "@/components/ProjectDetailsPage";

export default async function ProjectDetailsRoute({ params }) {
  const resolved = await Promise.resolve(params);
  const projectId = resolved.projectId;

  return <ProjectDetailsPage projectId={projectId}  />;
}

