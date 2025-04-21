import React, { useState, useEffect } from 'react';

const CLIENT_ID = '416426082232-31vh92aiq8959gdu909vmceg2je4u1i7.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBRWo6DTySVqQANVSuyw5b9O2aP5VAajg8';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

const GoogleCalendar = () => {
  const [gapiLoaded, setGapiLoaded] = useState(false);
  const [gisLoaded, setGisLoaded] = useState(false);
  const [tokenClient, setTokenClient] = useState<any>(null);
  const [signedIn, setSignedIn] = useState(false);
  const [events, setEvents] = useState<string>('');

  useEffect(() => {
    // Load the GAPI client and Google Identity Service (GIS)
    const loadGapiScript = () => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => gapiLoadedFunction();
      document.body.appendChild(script);
    };

    const loadGisScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.onload = () => gisLoadedFunction();
      document.body.appendChild(script);
    };

    loadGapiScript();
    loadGisScript();

    const storedToken = localStorage.getItem('gapi_token');
    if (storedToken) {
      window.gapi.client.setToken({ access_token: storedToken });
      setSignedIn(true);
      listUpcomingEvents();
    }

  }, []);

  // Initialize GAPI client
  const gapiLoadedFunction = () => {
    window.gapi.load('client', initializeGapiClient);
  };

  const initializeGapiClient = async () => {
    await window.gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    setGapiLoaded(true);
    maybeEnableButtons();
  };

  // Initialize GIS
  const gisLoadedFunction = () => {
    const tokenClientInstance = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: (response: any) => {
        if (response.error) {
          console.error('Error during authentication:', response.error);
          return;
        }
        // Store the token in localStorage
        localStorage.setItem('gapi_token', response.access_token);
        setSignedIn(true);
        listUpcomingEvents(); // Fetch events after successful login
      },
    });
    setTokenClient(tokenClientInstance);
    setGisLoaded(true);
    maybeEnableButtons();
  };

  // Enable buttons after both GAPI and GIS are loaded
  const maybeEnableButtons = () => {
    if (gapiLoaded && gisLoaded) {
      console.log('Google APIs and Identity Services loaded. Ready for auth.');
    }
  };

  // Handle authentication
  const handleAuthClick = () => {
    tokenClient.callback = async (response: any) => {
      if (response.error) {
        console.error('Error during authentication:', response.error);
        return;
      }
      // Store the token in localStorage
      localStorage.setItem('gapi_token', response.access_token);
      setSignedIn(true);
      await listUpcomingEvents();
    };

    if (window.gapi.client.getToken() === null) {
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      tokenClient.requestAccessToken({ prompt: '' });
    }
  };

  // Handle sign-out
  const handleSignoutClick = () => {
    const token = window.gapi.client.getToken();
    if (token !== null) {
      window.google.accounts.oauth2.revoke(token.access_token, () => {
        console.log('User signed out.');
      });
      window.gapi.client.setToken('');
      localStorage.removeItem('gapi_token'); // Clear token from localStorage
      setSignedIn(false);
      setEvents('');
    }
  };

  // Fetch upcoming events
  const listUpcomingEvents = async () => {
    try {
      const response = await window.gapi.client.calendar.events.list({
        calendarId: '9c569e94d47ed3c539e4ab0adcf2db05f927c5a220316c93d3aca61dee9a4636@group.calendar.google.com',
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: 'startTime',
      });
      const eventsList = response.result.items;
      console.log("Cal", response.result)
      if (eventsList.length === 0) {
        setEvents('No upcoming events found.');
      } else {
        const output = eventsList
          .map((event: any) => `${event.summary} (${event.start.dateTime || event.start.date})`)
          .join('\n');
        setEvents(output);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents('Failed to fetch events.');
    }
  };

  return (
    <div>
      <h1>Google Calendar API Integration</h1>
      <div>
        {!signedIn && (
          <button onClick={handleAuthClick} id="authorize_button">
            Authorize
          </button>
        )}
        {signedIn && (
          <button onClick={handleSignoutClick} id="signout_button">
            Sign Out
          </button>
        )}
      </div>
      <pre id="content" style={{ whiteSpace: 'pre-wrap' }}>
        {events}
      </pre>
    </div>
  );
};

export default GoogleCalendar;
