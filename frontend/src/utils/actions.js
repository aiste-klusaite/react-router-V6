import { json, redirect } from "react-router-dom";

export const submitAction = async ({ request, params }) => {
  const method = request.method;
  const data = await request.formData();
  
    const eventData = {
      title: data.get('title'),
      image: data.get('image'),
      date: data.get('date'),
      description: data.get('description'),
    };

    let url = 'http://localhost:8080/events'

    if (method === 'PATCH') {
      const eventId = params.eventId;
      url = `http://localhost:8080/events/${eventId}`;
    }
  
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });

    if (response.status === 422) {
      return response;
    }
  
    if (!response.ok) {
      throw json({ message: 'Could not save event' }, { status: 500 });
    }
  
    return redirect('/events');
  };

  export const deleteAction = async({ params, request }) => {
    const eventId = params.eventId;

    const response = await fetch(`http://localhost:8080/events/${eventId}`, {
        method: request.method,
    });

    if (!response.ok) {
        throw json({ message: 'Could not delete event' }, { status: 500 });
    }

    return redirect('/events');
  }

  export const newsLetterAction = async({ request }) => {
    const data = await request.formData();
    const email = data.get('email');
  
    // send to backend newsletter server ...
    console.log(email);
    return { message: 'Signup successful!' };
  }