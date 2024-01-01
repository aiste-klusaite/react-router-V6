import { Await, useRouteLoaderData } from "react-router-dom"

import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

export const EventDetailPage = () => {
    const { event, events } = useRouteLoaderData('event-detail');

    return <>
    <Suspense fallback={<p style={{textAlign: 'center'}}>...Loading</p>}>
        <Await resolve={event}>
        {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
    </Suspense>
    <Suspense fallback={<p style={{textAlign: 'center'}}>...Loading</p>}>
        <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
    </Suspense>
    </>
};