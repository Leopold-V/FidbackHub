import { Profile } from "./Profile";
import { NewProjectButton } from "./NewProjectButton";
import { MetaInfo } from "./MetaInfo";
import { userType } from "types/index";

export const ProfileColumn = ({ profile, projectsNumber }: { profile: userType, projectsNumber: number}) => {
    return (
    <div className="xl:w-64 xl:flex-shrink-0 xl:border-r xl:border-gray-200">
        <div className="py-6 pl-4 pr-6 sm:pl-6 lg:pl-8 xl:pl-0">
            <div className="flex items-center justify-between">
                <div className="flex-1 space-y-8">
                    <div className="space-y-8 sm:flex sm:items-center sm:justify-between sm:space-y-0 xl:block xl:space-y-8">
                        <Profile profile={profile} />
                        <NewProjectButton />
                    </div>
                    <MetaInfo projectsNumber={projectsNumber} />
                </div>
            </div>
        </div>
    </div>
    );
  }