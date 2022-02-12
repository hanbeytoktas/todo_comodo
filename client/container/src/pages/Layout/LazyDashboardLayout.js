import { Suspense, lazy, useEffect } from 'react';
import { useNavigate } from 'react-router';

const DashboardApp = lazy(() => import('./DashboardLayout'));

export default function LazyDashboardApp() {

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('access_token')==null){
      navigate("/login")
    }
  }, []);

  return (
    <Suspense fallback={<div>...</div>}>
      <DashboardApp />
    </Suspense>
  );
}
