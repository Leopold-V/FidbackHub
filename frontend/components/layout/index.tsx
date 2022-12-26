import { Navbar } from './Navbar'
import forms from '../../public/images/forms.svg';
import Image from 'next/image';

const Layout = ({ children }: { children: React.ReactChild}) => {
  return (
    <div>
      <div className="relative flex min-h-screen flex-col bg-gray-50">
        <Navbar />
        <div className="absolute top-32 left-4">
        <Image src={forms} alt="me" width={64} height={64} />
        </div>
        {children}
        </div>
      </div>
  )
}

export default Layout;