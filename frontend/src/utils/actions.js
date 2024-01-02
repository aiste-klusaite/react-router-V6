import { json, redirect } from "react-router-dom";

import { getAuthToken } from "./auth";

export const submitAction = async ({ request, params }) => {
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();
  
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
        'Authorization': 'Bearer ' + token,
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
    const token = getAuthToken();

    const response = await fetch(`http://localhost:8080/events/${eventId}`, {
        method: request.method,
        headers: {
          'Authorization': 'Bearer ' + token,
        }
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

  export const authAction = async({ request }) => {
    const searchParams = new URL(request.url).searchParams;
    const mode = searchParams.get('mode') || 'login';

    if (mode !== 'login' && mode !== 'signup') {
      throw json({ message: 'Unsupported mode.' }, { status: 422 });
    }

    const data =  await request.formData();
    const authData = {
      email: data.get('email'),
      password: data.get('password'),
    }

    const response = await fetch(`http://localhost:8080/${mode}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authData),
    });

    console.log(response.data);

    if (response.status === 422 || response.status === 401) {
      return response;
    }

    if (!response.ok) {
      throw json({ message: 'Could not authenticate user.'}, { status: 500 });
    }

    const resData = await response.json();
    const token = resData.token;

    localStorage.setItem('token', token);

    return redirect('/');
  }