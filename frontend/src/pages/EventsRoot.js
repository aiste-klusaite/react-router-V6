import { Outlet } from 'react-router-dom';

import EventsNavigation from '../../src/components/EventsNavigation';

export const EventsRootLayout = () => {
    return <>
        <EventsNavigation />
        <Outlet/>
    </>
}