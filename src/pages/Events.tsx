import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "../components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Calendar, MapPin, Clock } from 'lucide-react'
import Layout from '@/components/Layout';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: 'social' | 'charity' | 'academic' | 'recruitment';
  image: string;
}

const events: Event[] = [
  {
    id: 1,
    title: "Annual Charity Gala",
    date: "June 15, 2023",
    time: "7:00 PM",
    location: "Grand Ballroom, University Center",
    description: "Join us for an evening of elegance and philanthropy. All proceeds benefit local educational initiatives.",
    type: "charity",
    image: "/placeholder.svg?height=200&width=300"
  },
  {
    id: 2,
    title: "Summer BBQ Mixer",
    date: "July 8, 2023",
    time: "2:00 PM",
    location: "Fraternity House Backyard",
    description: "Kick off the summer with good food, games, and brotherhood. Open to all members and invited guests.",
    type: "social",
    image: "/placeholder.svg?height=200&width=300"
  },
  {
    id: 3,
    title: "Academic Excellence Workshop",
    date: "August 20, 2023",
    time: "10:00 AM",
    location: "University Library, Room 201",
    description: "Boost your study skills and academic performance with our expert-led workshop.",
    type: "academic",
    image: "/placeholder.svg?height=200&width=300"
  },
  {
    id: 4,
    title: "Fall Rush Week Kickoff",
    date: "September 5, 2023",
    time: "6:00 PM",
    location: "Student Union Plaza",
    description: "Learn about Tau Sigma and meet current brothers. All interested students are welcome!",
    type: "recruitment",
    image: "/placeholder.svg?height=200&width=300"
  },
];

const EventCard: React.FC<{ event: Event }> = ({ event }) => (
  <Card>
    <CardContent className="p-0">
      <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <CardTitle>{event.title}</CardTitle>
        <CardDescription className="mt-2 flex items-center">
          <Calendar className="w-4 h-4 mr-2" /> {event.date}
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
        <Link to={`/events/${event.id}`}>Learn More</Link>
      </Button>
    </CardFooter>
  </Card>
);

const Events: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredEvents = activeTab === 'all' 
    ? events 
    : events.filter(event => event.type === activeTab);

  return (
    <Layout>

    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Upcoming Events</h1>
        
        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="charity">Charity</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="recruitment">Recruitment</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <p className="text-center text-gray-600 mt-8">No events found for this category.</p>
        )}
      </main>
    </div>
    </Layout>

  );
}

export default Events;