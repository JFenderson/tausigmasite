export const fetchGoogleSheetData = async (spreadsheetId: string, range: string, apiKey: string) => {
  try {
    // Ensure the range is correctly formatted without extra quotes or encoding
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

    // Log the URL for debugging purposes
    console.log("Request URL:", url);

    // Use fetch to get data
    const response = await fetch(url);
    
    // Check if the response is ok
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();

    // Check if data contains the expected structure
    if (data.values) {
      return data.values; // Return the rows of the sheet
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    return [];  // Return an empty array if there was an error
  }
};
