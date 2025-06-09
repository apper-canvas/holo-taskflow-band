import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="h-screen flex flex-col overflow-hidden max-w-full">
      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;