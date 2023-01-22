import { useRouter } from 'next/router';
import { projectType } from 'types/index';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

const Layout = ({ children, listProjects, id, name }: { children: React.ReactChild, listProjects: projectType[], id?: string, name?: string }) => {
  console.log(listProjects);

  const router = useRouter();

  return (
    <div className="relative flex min-h-screen flex-col text-mainText bg-mainBackground">
      <Topbar />
      {router.asPath !== '/projects' ? (<div className="flex sm:flex-row flex-col flex-grow">
        <Sidebar id={id} name={name} />
        <div className="sm:w-5/6 bg-zinc-900">
        {children}
        </div>
      </div>) : children}
    </div>
  );
};

export default Layout;
