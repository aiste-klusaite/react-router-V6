import { defer, json } from "react-router-dom";

const loadEvents = async() => {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    return json({ message: 'Could not fetch events'}, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

const loadEvent =  async (id) => {
  const response = await fetch(`http://localhost:8080/events/${id}`);

  if (!response.ok) {
    throw json({ message: 'Could not fetch details for selected event'}, { status: 500 })
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

export const eventsLoader = () => {
 return defer({
    events: loadEvents(),
  })
}

export const eventLoader = async({request, params}) => {
  const id = params.eventId;

  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
  })
}