import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '../components/ui/dialog'
import Layout from '../components/Layout';

interface Program {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  directorEmail: string;
}

// Four sample programs
const programs: Program[] = [
  {
    id: 1,
    title: 'Leadership Development',
    description: 'Learn essential leadership skills.',
    longDescription:
      'The Leadership Development program is designed to equip young leaders with the skills and knowledge they need to thrive in leadership roles. Our program offers workshops, seminars, and networking opportunities with established leaders.',
    directorEmail: 'leader@fraternity.org',
  },
  {
    id: 2,
    title: 'Community Outreach',
    description: 'Engage with the local community.',
    longDescription:
      'Our Community Outreach program focuses on giving back to the community through various volunteer initiatives. From organizing food drives to participating in local events, our members are always actively involved.',
    directorEmail: 'outreach@fraternity.org',
  },
  {
    id: 3,
    title: 'Mentorship Program',
    description: 'Mentor and guide younger members.',
    longDescription:
      'The Mentorship Program connects experienced members with newer members to provide guidance, support, and advice. This program helps foster personal and professional growth within our fraternity.',
    directorEmail: 'mentorship@fraternity.org',
  },
  {
    id: 4,
    title: 'Educational Workshops',
    description: 'Workshops to boost academic and career growth.',
    longDescription:
      'Our Educational Workshops provide members with opportunities to develop both academically and professionally. Topics include career development, financial literacy, and more.',
    directorEmail: 'education@fraternity.org',
  },
];

const Programs: React.FC = () => {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const openModal = (program: Program) => {
    setSelectedProgram(program);
  };

  const closeModal = () => {
    setSelectedProgram(null);
  };

  return (
    <Layout>

    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Programs</h1>

        {/* Program Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program) => (
            <Card key={program.id}>
              <CardHeader>
                <CardTitle className="text-xl">{program.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{program.description}</p>
                <Button onClick={() => openModal(program)}>Learn More</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modal for More Information */}
        {selectedProgram && (
          <Dialog open={!!selectedProgram} onOpenChange={closeModal}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{selectedProgram.title}</DialogTitle>
                <DialogDescription>{selectedProgram.longDescription}</DialogDescription>
              </DialogHeader>
              <p className="mt-4">
                For more information, contact the director:{" "}
                <a
                  href={`mailto:${selectedProgram.directorEmail}`}
                  className="text-blue-600 underline"
                >
                  {selectedProgram.directorEmail}
                </a>
              </p>
              <DialogClose asChild>
                <Button className="mt-6">Close</Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        )}
      </main>
    </div>
    </Layout>

  );
};

export default Programs;
