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
import { fetchUpcomingEvents } from "../services/GoogleCalendarService";

// const CLIENT_ID = '416426082232-31vh92aiq8959gdu909vmceg2je4u1i7.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBRWo6DTySVqQANVSuyw5b9O2aP5VAajg8';
const SPECIFIC_CALENDAR_ID = "9c569e94d47ed3c539e4ab0adcf2db05f927c5a220316c93d3aca61dee9a4636@group.calendar.google.com";

const Home = () => {
  const [events, setEvents] = useState<any[]>([]);

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

    loadGapiScript();
  }, []);

  return (
    <Layout>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="py-12 md:py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 md:text-5xl lg:text-6xl">
              Welcome to Tau Sigma Fraternity
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Empowering leaders, fostering brotherhood, and serving our
              community since 1950.
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
                  <Link to="/charity-foundation">Learn More</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Featured Event Section */}
        <section className="py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Featured Event
          </h2>
          {events.length > 0 ? (
            <ScrollArea>

            <ul>
              {events.map((event, index) => (
                <li key={index}>
                  <Card>
                    <CardContent className="p-0">
                      <div className="md:flex">
                        <div className="md:w-1/2">
                          <img
                            src="/placeholder.svg?height=300&width=400"
                            alt="Annual Charity Gala"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-6 md:w-1/2">
                          <CardTitle className="text-2xl mb-2">
                            {event.summary}
                          </CardTitle>
                          <CardDescription className="mb-4">
                            {new Date(event.start).toLocaleString()}
                          </CardDescription>
                          <p className="text-gray-600 mb-4">
                            {event.description}
                          </p>
                          <Button asChild>
                            <Link to="/events">Learn More</Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
            </ScrollArea>

          ) : (
            <p>No upcoming events found.</p>
          )}
        </section>

        {/* Testimonial Section */}
        <section className="py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            What Our Brothers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <p className="italic text-gray-600 mb-4">
                  "Joining Tau Sigma was the best decision I made in college.
                  The brotherhood and leadership opportunities have shaped me
                  into who I am today."
                </p>
                <p className="font-semibold">John Doe, Class of 2020</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="italic text-gray-600 mb-4">
                  "The community service projects we organize have given me a
                  new perspective on the importance of giving back. I'm proud to
                  be a Tau Sigma brother."
                </p>
                <p className="font-semibold">Jane Smith, Class of 2022</p>
              </CardContent>
            </Card>
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
