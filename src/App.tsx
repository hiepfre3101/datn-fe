import { RouterProvider } from 'react-router-dom';
import router from './routes';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
function App() {
   return <>
      <ScrollToTop />
      <RouterProvider router={router} />
   </>;
}

export default App;
