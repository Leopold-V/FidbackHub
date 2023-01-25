import { Profile } from './Profile';
import { NewProjectButton } from './NewProjectButton';
import { MetaInfo } from './MetaInfo';
import { userType } from 'types/index';
import { StatsFeed } from './StatsFeed';

export const ProfileColumn = ({ profile, projectsNumber, feedbackNumber,
  maxFeedbackProject, }: { profile: userType; projectsNumber: number,
    feedbackNumber: number;
  maxFeedbackProject: { name: string; number: number }; }) => {
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
            <StatsFeed feedbackNumber={feedbackNumber} maxFeedbackProject={maxFeedbackProject} />
          </div>
        </div>
      </div>
    </div>
  );
};
