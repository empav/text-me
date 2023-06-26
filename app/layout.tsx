import ActiveStatus from './components/ActiveStatus';
import AuthContext from './context/AuthContext';
import ToasterContext from './context/ToastContext';
import './globals.css';

export const metadata = {
  title: 'Text me',
  description: 'Chat application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <AuthContext>
          <ActiveStatus />
          <ToasterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
