import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import Layout from '../components/Layout';

const leaders = [
  { name: 'John Doe', title: 'President', bio: 'John has been leading the fraternity for 2 years.' },
  { name: 'Jane Smith', title: 'Vice President', bio: 'Jane is responsible for organizing events and managing operations.' },
];

const Leadership = () => {
  return (
    <Layout>
      <section>
        <h1 className="text-3xl font-bold mb-4">Our Leadership</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {leaders.map((leader, index) => (
            <Card key={index} className="shadow-lg">
              <CardContent>
                <h2 className="text-xl font-bold">{leader.name}</h2>
                <p className="text-sm text-gray-500">{leader.title}</p>
                <p className="mt-2">{leader.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Leadership;
