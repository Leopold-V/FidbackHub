import React, { useEffect, useState } from 'react';
import { historyType, userType } from 'types/index';
import { ProjectsColumn } from './ProjectsColumn';
import { Feed } from './Feed';

const ProjectsPageComponent = ({
  userProjects,
  histories,
}: {
  userData: userType;
  userProjects: any[];
  histories: historyType[];
}) => {
  const [projects, setprojects] = useState(userProjects);
  const [allfeedbacks, setallfeedbacks] = useState([]);
  const [maxFeedbackProject, setmaxFeedbackProject] = useState({ name: '', number: 0 });

  useEffect(() => {
    let _allfeedbacks = [];
    let _maxFeedbackProject = { name: '', number: 0 };
    userProjects.forEach((project) => {
      if (project.feedbacks.length > maxFeedbackProject.number) {
        _maxFeedbackProject.number = project.feedbacks.length;
        _maxFeedbackProject.name = project.name;
      }
      _allfeedbacks = _allfeedbacks.concat(project.feedbacks);
    });
    setmaxFeedbackProject(_maxFeedbackProject);
    setallfeedbacks(_allfeedbacks);
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4 pb-8">
      <div className="mx-auto max-w-8xl lg:flex xl:px-8 space-x-4">
        <div className="min-w-0 flex-1 xl:flex">
          <ProjectsColumn projects={projects} setprojects={setprojects} />
        </div>
        <Feed histories={histories} />
      </div>
    </div>
  );
};

export default ProjectsPageComponent;
