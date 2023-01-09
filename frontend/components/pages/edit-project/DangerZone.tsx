import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { deleteProject } from '../../../services/project.service';
import { SpinnerButtonDanger } from 'components/common/Spinner';
import { ErrorAlert } from 'components/common/ErrorAlert';
import { SuccessAlert } from 'components/common/SuccessAlert';
import { Modal } from 'components/common/Modal';

const message = `Are you sure you want to delete? The project will be permanently
removed. This action cannot be undone.`;

export const DangerZone = ({ projectId }: { projectId: number }) => {
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState<string | boolean>(false);
  const [success, setSuccess] = useState(false);
  const [open, setopen] = useState(false);

  const { data: session } = useSession();

  const openModalToDelete = () => {
    setopen(true);
  };

  const handleDeleteProject = async () => {
    setloading(true);
    try {
      await deleteProject(projectId, session.jwt);
      seterror(false);
      setSuccess(true);
    } catch (error) {
      seterror(error.message);
      setSuccess(false);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="">
      {error && <ErrorAlert message={error} />}
      {success && <SuccessAlert message="Successfully deleted" />}
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
            disabled={loading}
          >
            {loading && <SpinnerButtonDanger />}
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
