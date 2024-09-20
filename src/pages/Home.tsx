import React from 'react';
import { Button } from '../components/ui/button';
import Layout from '../components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Calendar, Users, Award, Heart } from "lucide-react"
import { Link } from 'react-router-dom';


const Home = () => {
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
              Empowering leaders, fostering brotherhood, and serving our community since 1950.
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
                <p>Join us for our exciting fraternity events and activities.</p>
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
                <p>Meet our diverse and talented members from various backgrounds.</p>
              </CardContent>
              <CardFooter>
                <Button variant="link" asChild>
                  <Link to="/members">Meet Brothers</Link>
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
                <p>Make a difference through our charitable foundation and initiatives.</p>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Featured Event</h2>
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
                  <CardTitle className="text-2xl mb-2">Annual Charity Gala</CardTitle>
                  <CardDescription className="mb-4">June 15, 2023 | 7:00 PM</CardDescription>
                  <p className="text-gray-600 mb-4">
                    Join us for an evening of elegance and philanthropy at our Annual Charity Gala. 
                    All proceeds will benefit local educational initiatives.
                  </p>
                  <Button asChild>
                    <Link to="/events">Learn More</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Testimonial Section */}
        <section className="py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">What Our Brothers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <p className="italic text-gray-600 mb-4">
                  "Joining Tau Sigma was the best decision I made in college. The brotherhood and 
                  leadership opportunities have shaped me into who I am today."
                </p>
                <p className="font-semibold">John Doe, Class of 2020</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="italic text-gray-600 mb-4">
                  "The community service projects we organize have given me a new perspective on 
                  the importance of giving back. I'm proud to be a Tau Sigma brother."
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
              <h2 className="text-3xl font-bold mb-4">Ready to Join Our Brotherhood?</h2>
              <p className="mb-6">
                Take the first step towards a lifetime of friendship, leadership, and service.
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
