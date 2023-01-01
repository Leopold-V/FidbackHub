import { Navbar } from './Navbar';

const Layout = ({ children }: { children: React.ReactChild }) => {
  return (
    <div>
      <div className="relative flex min-h-screen flex-col text-mainText bg-mainBackground">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
