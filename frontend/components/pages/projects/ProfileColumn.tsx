import { Profile } from './Profile';
import { NewProjectButton } from './NewProjectButton';
import { MetaInfo } from './MetaInfo';
import { userType } from 'types/index';

export const ProfileColumn = ({ profile, projectsNumber }: { profile: userType; projectsNumber: number }) => {
  return (
    <div className="xl:w-64 xl:flex-shrink-0">
      <div className="py-6 pl-4 pr-6 sm:pl-6 lg:pl-8 xl:pl-0">
        <div>
          <div className="space-y-8">
            <div className="space-y-8 flex flex-col md:items-center justify-center sm:space-y-6 xl:block xl:space-y-8">
              <Profile profile={profile} />
              <div>
                <NewProjectButton />
              </div>
            </div>
            <MetaInfo projectsNumber={projectsNumber} />
          </div>
        </div>
      </div>
    </div>
  );
};
