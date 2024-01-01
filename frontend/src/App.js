import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { EventsPage } from './pages/EventsPage';
import { EventDetailPage } from './pages/EventDetail';
import { NewEventPage } from './pages/NewEventPage';
import { EditEventPage } from './pages/EditEvent';
import { RootLayout } from './pages/Root';
import { EventsRootLayout } from './pages/EventsRoot';
import {eventsLoader, eventLoader} from './utils/loaderData';
import { ErrorPage } from './pages/ErrorPage';
import { submitAction, deleteAction, newsLetterAction, authAction } from './utils/actions';
import { NewsletterPage } from './pages/Newsletter';
import { AuthenticationPage } from './pages/Authentication';

const router = createBrowserRouter([
  { path: '/', element: <RootLayout />, errorElement: <ErrorPage />, 
    children: [
    { index: true, element: <HomePage />},
    { path: 'events', element: <EventsRootLayout />, errorElement: <ErrorPage />, 
      children: [
      { index: true, element: <EventsPage />, loader: eventsLoader },
      { path: ':eventId', 
        id: 'event-detail',
        loader: eventLoader, 
        children: [
        {
          index: true,
          element: <EventDetailPage />,
          action: deleteAction,
        },
        { path: 'edit', element: <EditEventPage/>, action: submitAction },
      ]},
      { path: 'new', element: <NewEventPage />, action: submitAction },
    ]},
    {
      path: 'auth',
      element: <AuthenticationPage />,
      action: authAction,
    },
    { path: 'newsletter', element: <NewsletterPage />, action: newsLetterAction },
  ]},
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
