// src/GoogleCalendarService.ts
// export const loadGapiClient = (apiKey: string, clientId: string) => {
//   return new Promise<void>((resolve, reject) => {
//     window.gapi.load('client:auth2', async () => {
//       try {
//         await window.gapi.client.init({
//           apiKey,
//           clientId,
//           scope: 'https://www.googleapis.com/auth/calendar.readonly',
//           discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
//         });
//         resolve();
//       } catch (error) {
//         reject(error);
//       }
//     });
//   });
// };
// Utility to get the first and last days of the current month
export const getCurrentMonthDateRange = () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Last day of the current month
    return { firstDay, lastDay };
  };
  
  // export const fetchUpcomingEvents = async (calendarId: string, apiKey: string, clientId: string) => {
  //   try {
  //     // await loadGapiClient(apiKey, clientId);
  //     const { firstDay, lastDay } = getCurrentMonthDateRange();
  //     const response = await window.gapi.client.calendar.events.list({
  //       calendarId: calendarId,
  //       timeMin: firstDay.toISOString(), // Start of current month
  //       timeMax: lastDay.toISOString(), // End of current month
  //       showDeleted: false,
  //       singleEvents: true,
  //       orderBy: 'startTime',
  //     });
  
  //     const events = response.result.items;
  //     console.log("events", events)
  //     return events.map((event: any) => ({
  //       summary: event.summary,
  //       start: event.start.dateTime || event.start.date,
  //       description: event.description || 'No description available'
  //     }));
  //   } catch (error) {
  //     console.error('Error fetching events:', error);
  //     return [];
  //   }
  // };

  // export const fetchUpcomingEvents = async (calendarId: string, apiKey: string) => {
  //   try {
  //     const response = await fetch(
  //       `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`
  //     );
      
  //     const data = await response.json();
  //     console.log("fetch res",response.json)
  //     return data.values; // Returns the rows of the sheet
  //   } catch (error) {
  //     console.error('Error fetching data from Google Sheets:', error);
  //     return [];
  //   }
  // };

  export const fetchUpcomingEvents = async (calendarId: string, apiKey: string) => {
    try {
      // Get the start and end of the current month
      const { firstDay, lastDay } = getCurrentMonthDateRange();
  
      // Construct the API request URL with required parameters
      const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&timeMin=${firstDay.toISOString()}&timeMax=${lastDay.toISOString()}&singleEvents=true&orderBy=startTime`;
  
      
      const response = await fetch(url);
      const data = await response.json();
      console.log("fetch res", data);
      
      const mappedEvents = data.items.map((event: any) => ({
        id: event.id,  // Use the event's unique ID
        title: event.summary,  // Event title
        date: new Date(event.start.dateTime || event.start.date).toLocaleDateString(),  // Format the start date
        time: new Date(event.start.dateTime || event.start.date).toLocaleTimeString(),  // Format the start time
        location: event.location || 'TBD',  // Default to 'TBD' if location is not provided
        description: event.description || 'No description available',  // Default message if no description is available
        type: event.summary.toLowerCase().includes('charity') ? 'charity' : 'social',  // Categorize events based on summary
        image: "/placeholder.svg?height=200&width=300",  // Placeholder image
        attachments: event.attachments || [],
      }));
  
      return mappedEvents; 
    } catch (error) {
      console.error('Error fetching events from Google Calendar:', error);
      return [];
    }
  };

  // src/GoogleSheetsService.ts
export const fetchGoogleSheetData = async (spreadsheetId: string, range: string, apiKey: string) => {
    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`
      );
      const data = await response.json();
      return data.values; // Returns the rows of the sheet
    } catch (error) {
      console.error('Error fetching data from Google Sheets:', error);
      return [];
    }
  };
  
  