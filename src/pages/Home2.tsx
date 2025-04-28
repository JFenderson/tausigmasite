import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import Layout from "../components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Calendar, Users, Award, Heart } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import {  fetchUpcomingEvents } from "../services/GoogleCalendarService";
import { fetchGoogleSheetData } from "../services/GoogleSheetService";
import axios from "axios";


// const CLIENT_ID = '416426082232-31vh92aiq8959gdu909vmceg2je4u1i7.apps.googleusercontent.com';
const API_KEY = import.meta.env.VITE_API_KEY;
const SPECIFIC_CALENDAR_ID = import.meta.env.VITE_SPECIFIC_CALENDAR_ID ;
const SPREADSHEET_ID = import.meta.env.VITE_SPREADSHEET_ID;
const RANGE = "Quotes!A1:D60";


const Home = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load the Google API scripts and fetch events
    const loadGapiScript = () => {
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/api.js";
      script.onload = () => gapiLoadedFunction();
      document.body.appendChild(script);
    };

    const gapiLoadedFunction = () => {
      window.gapi.load("client", async () => {
        await window.gapi.client.init({
          apiKey: API_KEY,
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
          ],
        });
        // Fetch upcoming events
        const upcomingEvents = await fetchUpcomingEvents(
          SPECIFIC_CALENDAR_ID,
          API_KEY
        );
        setEvents(upcomingEvents);
      });
    };

    const getQuotes = async () => {
      setLoading(true);
      setError(null);  // Reset any previous errors

      try {
        // Fetch quotes from Google Sheet
        const data = await fetchGoogleSheetData(SPREADSHEET_ID, RANGE, API_KEY);
        console.log("Fetched Quotes Data:", data);

        if (!data || data.length === 0) {
          throw new Error("No data found in the sheet.");
        }
    
        // Assuming quotes start from the second row, map the data
        const mappedQuotes = data.slice(1).map((row: string[], index: number)  => ({
          id: index + 1,
          name: row[0],      // Name is in the first column
          initiationDate: row[1],  // Initiation Date is in the second column
          quote: row[2],     // Quote is in the third column
        }));

        setQuotes(mappedQuotes);  // Set the quotes to state
      } catch (err) {
        setError("Error fetching quotes from Google Sheets.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getQuotes();
    loadGapiScript();
  }, []);

  return (
    <Layout>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="py-12 md:py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 md:text-5xl lg:text-6xl">
              Birmingham Sigmas
            </h1>
            <h1 className="text-2xl font-bold text-gray-900 mb-4 md:text-2xl lg:text-2xl">
              Tau Sigma Chapter of Phi Beta Sigma Fraternity, Inc.
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Servicing the Metro Birmingham and Jefferson County area since 1924.
            </p>
            <div className="flex justify-center space-x-4">
              <Button asChild>
                <Link to="/become-a-member">Join Us</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Key Information Section */}
        <section className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Calendar className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Join us for our exciting fraternity events and activities.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="link" asChild>
                  <Link to="/events">View Events</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <Users className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Our Brotherhood</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Meet our diverse and talented members from various
                  backgrounds.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="link" asChild>
                  <Link to="/members">Meet the Brothers</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <Award className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Leadership</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Develop essential leadership skills through our programs.</p>
              </CardContent>
              <CardFooter>
                <Button variant="link" asChild>
                  <Link to="/programs">Our Programs</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <Heart className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Philanthropy</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Make a difference through our charitable foundation and
                  initiatives.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="link" asChild>
                  <Link to="/charity-foundation">Tau Sigma Charity Foundation</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Featured Event Section */}
        <section className="py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Featured Links
          </h2>
          <ScrollArea>

            <ul>
                <li>
                  <Card>
                    <CardContent className="p-0">
                      <div className="md:flex">
                        <div className="p-6 md:w-1/2">
                          <CardTitle className="text-2xl mb-2">
                            title
                          </CardTitle>
                          <CardDescription className="mb-4">
                            detail
                          </CardDescription>
                          <p className="text-gray-600 mb-4">
                            dec
                          </p>
                          <Button asChild>
                            <Link to="/events">Learn More</Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </li>
            </ul>
            </ScrollArea>


          
        </section>
          {/* Loading State */}
          {loading && <p className="text-center text-gray-600">Loading testimonials...</p>}

          {/* Error State */}
          {error && <p className="text-center text-red-600">{error}</p>}

              {/* No Quotes Found */}
              {!loading && !error && quotes.length === 0 && (
            <p className="text-center text-gray-600 mt-8">No testimonials found.</p>
          )}

    {/* Testimonial Section */}
          <section className="py-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              What Our Brothers Say
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quotes.map((quote, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <p className="italic text-gray-600 mb-4">"{quote.quote}"</p>
                    <p className="font-semibold">{quote.name}, Class of {quote.initiationDate}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

        {/* Call to Action Section */}
        <section className="py-12">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-6 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Join Our Brotherhood?
              </h2>
              <p className="mb-6">
                Take the first step towards a lifetime of friendship,
                leadership, and service.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/become-a-member">Apply Now</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </Layout>
  );
};

export default Home;
