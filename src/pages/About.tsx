import Layout from '@/components/Layout';
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Star, Users, Heart, Award } from 'lucide-react'

const About = () => {
  return (
    <Layout>

<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About Tau Sigma Fraternity</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Our Story</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Tau Sigma Fraternity was founded in 1950 at the University of Example by a group of visionary students who sought to create a brotherhood based on the principles of leadership, scholarship, and service. Over the past seven decades, our fraternity has grown from a small group of dedicated individuals to a nationwide organization with chapters across the country.
                </p>
                <p className="text-gray-600 mb-4">
                  Our founders believed in the power of unity and the importance of personal growth. They established Tau Sigma with the goal of fostering an environment where young men could develop their leadership skills, excel academically, and contribute meaningfully to their communities.
                </p>
                <p className="text-gray-600">
                  Today, Tau Sigma continues to uphold these founding principles, adapting to the changing needs of our members and society while remaining true to our core values. We are proud of our rich history and excited about our future as we continue to shape the leaders of tomorrow.
                </p>
              </CardContent>
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <Star className="mr-4 text-blue-500" size={24} />
                    <div>
                      <h3 className="font-semibold mb-2">Leadership</h3>
                      <p className="text-gray-600">We cultivate strong leaders who inspire and guide others towards excellence.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="mr-4 text-green-500" size={24} />
                    <div>
                      <h3 className="font-semibold mb-2">Brotherhood</h3>
                      <p className="text-gray-600">We foster lifelong friendships and a supportive community for our members.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Heart className="mr-4 text-red-500" size={24} />
                    <div>
                      <h3 className="font-semibold mb-2">Service</h3>
                      <p className="text-gray-600">We are committed to making a positive impact in our communities through volunteer work.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Award className="mr-4 text-yellow-500" size={24} />
                    <div>
                      <h3 className="font-semibold mb-2">Academic Excellence</h3>
                      <p className="text-gray-600">We promote and support high academic achievement among our members.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Key Milestones</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-8">
                    {[
                      { year: 1950, event: "Tau Sigma Fraternity founded at the University of Example" },
                      { year: 1955, event: "Expansion to five additional campuses" },
                      { year: 1970, event: "Establishment of the Tau Sigma Charity Foundation" },
                      { year: 1985, event: "Launch of the Annual Leadership Conference" },
                      { year: 2000, event: "50th Anniversary Celebration and Scholarship Fund creation" },
                      { year: 2010, event: "Initiation of the Tau Sigma Mentorship Program" },
                      { year: 2020, event: "70th Anniversary and launch of the Alumni Network Platform" },
                    ].map((item, index) => (
                      <div key={index} className="relative pl-8 pb-8 border-l-2 border-gray-200 last:border-l-0">
                        <div className="absolute left-0 top-0 bg-white rounded-full w-4 h-4 -ml-2 border-2 border-blue-500"></div>
                        <h4 className="font-bold text-lg">{item.year}</h4>
                        <p className="text-gray-600">{item.event}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default About;
