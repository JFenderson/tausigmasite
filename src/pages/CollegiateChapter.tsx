import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react'
import Layout from '@/components/Layout';

interface Chapter {
  name: string;
  school: string;
  location: string;
  email: string;
  facebook: string;
  twitter: string;
  instagram: string;
  president: {
    name: string;
    image: string;
  };
}

const chapters: Chapter[] = [
  {
    name: "Alpha Chapter",
    school: "University of Example",
    location: "Exampleville, EX",
    email: "alpha@tausigma.org",
    facebook: "https://facebook.com/tausigmaalpha",
    twitter: "https://twitter.com/tausigmaalpha",
    instagram: "https://instagram.com/tausigmaalpha",
    president: {
      name: "John Smith",
      image: "/placeholder.svg?height=100&width=100"
    }
  },
  {
    name: "Beta Chapter",
    school: "Sample State University",
    location: "Sampletown, ST",
    email: "beta@tausigma.org",
    facebook: "https://facebook.com/tausigmabeta",
    twitter: "https://twitter.com/tausigmabeta",
    instagram: "https://instagram.com/tausigmabeta",
    president: {
      name: "Jane Doe",
      image: "/placeholder.svg?height=100&width=100"
    }
  }
];

const ChapterCard: React.FC<{ chapter: Chapter }> = ({ chapter }) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle className="text-2xl font-bold">{chapter.name}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">School:</h3>
          <p>{chapter.school}</p>
        </div>
        <div>
          <h3 className="font-semibold">Location:</h3>
          <p>{chapter.location}</p>
        </div>
        <div>
          <h3 className="font-semibold">Contact:</h3>
          <div className="flex items-center space-x-2">
            <Mail size={20} />
            <a href={`mailto:${chapter.email}`} className="text-blue-600 hover:underline">{chapter.email}</a>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Social Media:</h3>
          <div className="flex space-x-4 mt-2">
            <a href={chapter.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
              <Facebook size={24} />
            </a>
            <a href={chapter.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
              <Twitter size={24} />
            </a>
            <a href={chapter.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
              <Instagram size={24} />
            </a>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Current President:</h3>
          <div className="flex items-center space-x-4 mt-2">
            <img src={chapter.president.image} alt={chapter.president.name} className="w-16 h-16 rounded-full" />
            <p>{chapter.president.name}</p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
)

const CollegiateChapters: React.FC = () => {
  return (
    <Layout>

    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Collegiate Chapters</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {chapters.map((chapter, index) => (
            <ChapterCard key={index} chapter={chapter} />
          ))}
        </div>
      </main>

     
    </div>
    </Layout>

  )
}

export default CollegiateChapters