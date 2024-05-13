import { Outlet } from 'react-router-dom';
import Header from './components/header';
import { Toaster } from './components/ui/toaster';

export function Layout() {
  // let navigation = useNavigation();
  // let revalidator = useRevalidator();
  // let fetchers = useFetchers();
  // let fetcherInProgress = fetchers.some((f) =>
  //   ['loading', 'submitting'].includes(f.state),
  // );
  return (
    <>
      {/* <nav>Header</nav> */}
      <Header />
      <Outlet />
      <Toaster />
    </>
  );
}
