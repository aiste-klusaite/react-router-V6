import { Await, useLoaderData } from 'react-router-dom';
import { Suspense } from 'react';

import EventsList from '../components/EventsList';

export const EventsPage = () => {
  const { events } = useLoaderData();

  console.log(events);

  return (
    <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents}/>}
      </Await>
    </Suspense>
  );
}