import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Calendar, MapPin, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import { fetchUpcomingEvents } from "../services/GoogleCalendarService";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: "social" | "charity" | "academic" | "recruitment";
  image: string;
  summary: string;
  start: string;
  attachments: { fileUrl: string }[] | undefined;
}

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  // Determine the learn more link based on attachments
  const learnMoreLink = event.attachments?.[0]?.fileUrl ?? "#"; // Default to '#' if no link is provided

  return (
    <Card>
      <CardContent className="p-0">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <CardTitle>{event.summary}</CardTitle>
          <CardDescription className="mt-2 flex items-center">
            <Calendar className="w-4 h-4 mr-2" /> {event.start}
          </CardDescription>
          <CardDescription className="mt-1 flex items-center">
            <Clock className="w-4 h-4 mr-2" /> {event.time}
          </CardDescription>
          <CardDescription className="mt-1 flex items-center">
            <MapPin className="w-4 h-4 mr-2" /> {event.location}
          </CardDescription>
          <p className="mt-4 text-sm text-gray-600">{event.description}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <div>
            <Link to={learnMoreLink}>Learn More</Link>
          </div>
        </Button>
      </CardFooter>
    </Card>
  );
};

const Events: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [events, setEvents] = useState<Event[]>([]); // State to store events

  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const calendarId = "josephfenderson@gmail.com"; // Replace with your calendar ID
  const apiKey = process.env.API_KEY; // Replace with your API key
  const clientId = process.env.CLIENT_ID;

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const fetchedEvents = await fetchUpcomingEvents(calendarId, apiKey);
        console.log("Fetched Events:", fetchedEvents);
        setEvents(fetchedEvents);
      } catch (error) {
        setError("Failed to load events");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    //     const loadEvents = async () => {
    //       try {

    //         const eventsFromCalendar = await fetchUpcomingEvents(calendarId, apiKey);

    //         // Map Google Calendar events to your event structure
    //         const mappedEvents = eventsFromCalendar.map((event: any) => ({
    //           id: event.id,
    //           title: event.summary,
    //           date: new Date(event.start).toLocaleDateString(),
    //           time: new Date(event.start).toLocaleTimeString(),
    //           location: event.location || 'TBD',
    //           description: event.description || 'No description available',
    //           type: 'social', // You can categorize the events based on types if needed
    //           image: "/placeholder.svg?height=200&width=300",  // Placeholder for event images
    //         }));
    // console.log("mapped events",mappedEvents)
    //         setEvents(mappedEvents);
    //       } catch (error) {
    //         setError("Failed to load events");
    //       } finally {
    //         setLoading(false);
    //       }
    //     };

    loadEvents(); // Fetch events on component mount
  }, []);

  useEffect(() => {
    // Filter events based on the activeTab
    const updatedFilteredEvents =
      activeTab === "all"
        ? events
        : events.filter((event) => event.type === activeTab);
    console.log("Filtered Events:", updatedFilteredEvents); // Log filtered events
    setFilteredEvents(updatedFilteredEvents);
  }, [activeTab, events]);

  // const filteredEvents = activeTab === 'all'
  // ? events
  // : events.filter(event => event.type === activeTab);

  if (loading) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Upcoming Events
          </h1>

          <Tabs
            defaultValue="all"
            className="mb-8"
            onValueChange={setActiveTab}
          >
            <TabsList>
              <TabsTrigger value="all">All Events</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="charity">Charity</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="recruitment">Recruitment</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <p className="text-center text-gray-600 mt-8">
              No events found for this category.
            </p>
          )}
        </main>
      </div>
    </Layout>
  );
};

export default Events;
