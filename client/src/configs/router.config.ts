import { Layout } from '@/layout';
import Home from '@/pages/Home';
import Noti from '@/pages/Noti';
import Test from '@/pages/Test';
import { createBrowserRouter } from 'react-router-dom';

let router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/noti',
        Component: Noti,
      },
      {
        path: '/test',
        Component: Test,
      },
    ],
  },
]);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

export default router;
