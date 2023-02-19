import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { deleteProject, leaveProject } from '../../../services/project.service';
import { Modal } from 'components/common/Modal';
import { projectType } from 'types/index';

const message = `Are you sure you want to delete? The project will be permanently
removed. This action cannot be undone.`;

export const DangerZone = ({ projectId }: { projectId: number }) => {
  const router = useRouter();
  const [open, setopen] = useState(false);

  const { data: session } = useSession();

  const openModalToDelete = () => {
    setopen(true);
  };

  const handleDeleteProject = async () => {
    try {
      await deleteProject(projectId, session.jwt);
      router.push(`/projects`);
      toast.success(`Project deleted!`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="">
      <div className="text-sm flex justify-center items-center p-4">
        <div className="sm:w-1/2 w-3/4 mx-auto flex flex-col">
          <p className="font-medium">Delete project</p>
          <p className="font-light text-secondaryText">
            Once you delete a project, there is no going back. Please be certain.
          </p>
        </div>
        <div className="sm:w-1/2 w-3/4 flex">
          <button
            type="submit"
            className="duration-200 mx-auto inline-flex items-center justify-center rounded border border-red-600 px-4 py-2 text-sm font-medium text-red-500 hover:text-white shadow-sm disabled:bg-red-400 hover:bg-red-500 outline-none focus:ring-2 focus:ring-red-500"
            onClick={openModalToDelete}
          >
            Delete project
          </button>
        </div>
      </div>
      <Modal
        open={open}
        setopen={setopen}
        handleConfirm={handleDeleteProject}
        title="Delete a project"
        message={message}
      />
    </div>
  );
};

const messageLeave = `Are you sure you want to leave? This action cannot be undone.`;

export const DangerZoneLeave = ({ project }: { project: projectType }) => {
  const router = useRouter();
  const [open, setopen] = useState(false);

  const { data: session } = useSession();

  const openModalToLeave = () => {
    setopen(true);
  };

  const handleLeaveProject = async () => {
    try {
      const newMemberList = project.members.filter((member) => member.id !== session.id);
      await leaveProject(project.id, newMemberList, session.jwt);
      router.push(`/projects`);
      toast.success(`You successfully left the project!`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="">
      <div className="text-sm flex justify-center items-center p-4">
        <div className="sm:w-1/2 w-3/4 mx-auto flex flex-col">
          <p className="font-medium">Leave project</p>
          <p className="font-light text-secondaryText">
            Once you leave a project the only way to rejoin again is to wait for another invite. Please be certain.
          </p>
        </div>
        <div className="sm:w-1/2 w-3/4 flex">
          <button
            type="submit"
            className="duration-200 mx-auto inline-flex items-center justify-center rounded border border-red-600 px-4 py-2 text-sm font-medium text-red-500 hover:text-white shadow-sm disabled:bg-red-400 hover:bg-red-500 outline-none focus:ring-2 focus:ring-red-500"
            onClick={openModalToLeave}
          >
            Leave project
          </button>
        </div>
      </div>
      <Modal
        open={open}
        setopen={setopen}
        handleConfirm={handleLeaveProject}
        title="Leave a project"
        message={messageLeave}
      />
    </div>
  );
};
