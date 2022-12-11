import { Navbar } from './Navbar'

const Layout = ({ children }: { children: React.ReactChild}) => {
  return (
    <div>
      <div className="relative flex min-h-full flex-col">
        <Navbar  />
        {children}
        </div>
      </div>
  )
}

export default Layout;