import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from 'react'
import { ProjectItem } from './ProjectItem'

  const projectsQuery = gql`
  query Projects {
    projects {
      data {
        id
        attributes {
          name
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const ProjectsList = () => {
  const [projectList, setProjectList] = useState([]);
  
  const {
    loading: fetchProjectFetching,
    error: fetchProjectError,
    data: fetchProjectData,
  } = useQuery(projectsQuery, {
    variables: { projectId: 1 },
  });
  
  useEffect(() => {
    if (fetchProjectData) {
      const projectList = fetchProjectData.projects.data;
      setProjectList(projectList || []);
    }
  }, [fetchProjectData]);

  return (
    <ul role="list" className="divide-y divide-gray-200 border-b border-gray-200">
    {projectList.map((project) => (
      <ProjectItem project={project} key={project.id} />
    ))}
  </ul>
  )
}
