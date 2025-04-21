import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import Layout from '@/components/Layout';

// Sample charity events
interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
}

const events: Event[] = [
  {
    id: 1,
    title: 'Annual Charity Gala',
    date: 'October 15, 2024',
    description: 'Join us for an evening of celebration and giving. All proceeds support local community programs.',
  },
  {
    id: 2,
    title: 'Food Drive',
    date: 'November 20, 2024',
    description: 'Help us provide food to those in need. We are accepting non-perishable food items and monetary donations.',
  },
  {
    id: 3,
    title: 'Community Clean-Up',
    date: 'December 5, 2024',
    description: 'Join us as we work together to clean up our community and make it a better place for everyone.',
  },
];

const Foundation: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        donationAmount: '',
      });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/; 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { name, email, phone, donationAmount } = formData;

    // Basic form validation checks
    if (!name || !email || !phone || !donationAmount) {
      setErrorMessage('Please fill out all fields.');
      return false;
    }
    
    if (!emailRegex.test(email)) {
        setErrorMessage('Please enter a valid email address.');
        return false;
      }
  
      if (!phoneRegex.test(phone)) {
        setErrorMessage('Please enter a valid 10-digit phone number.');
        return false;
      }
  

    if (parseFloat(donationAmount) < 5) {
      setErrorMessage('The minimum donation amount is $5.');
      return false;
    }

    // Reset error message if everything is valid
    setErrorMessage('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Handle donation form submission (send to API or payment gateway)
      console.log('Donation submitted:', formData);
      setFormSubmitted(true);
    }
  };
  return (
    <Layout>

    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Tau Sigma Charity Foundation</h1>

        {/* Foundation Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">About the Charity Foundation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              The Tau Sigma Charity Foundation is dedicated to giving back to our community through various initiatives such as scholarships, food drives, and community development projects. We aim to make a meaningful impact in the lives of individuals and families in need.
            </p>
            <p className="text-gray-700 mb-4">
              Our foundation supports educational programs, health initiatives, and other charitable causes that align with our mission. We believe in the power of unity and collective effort to bring about positive change in society.
            </p>
          </CardContent>
        </Card>

        {/* Events Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Upcoming Charity Events</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-2">Date: {event.date}</p>
                  <p className="text-gray-700">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Donation Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Donate to the Charity Foundation</h2>
          <p className="mb-6">
            Your donation helps us continue our mission of giving back to the community. Every contribution, big or small, makes a difference.
          </p>

          <Card>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="donationAmount" className="block text-sm font-medium text-gray-700">
                    Donation Amount
                  </label>
                  <Input
                    type="number"
                    name="donationAmount"
                    value={formData.donationAmount}
                    onChange={handleInputChange}
                    placeholder="Enter donation amount (minimum $5)"
                    className="mt-1"
                    required
                  />
                </div>

                {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                <Button type="submit" className="w-full mt-6">
                  Submit Donation
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Success Dialog */}
        {formSubmitted && (
          <Dialog open={formSubmitted} onOpenChange={() => setFormSubmitted(false)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Thank You for Your Donation!</DialogTitle>
                <DialogDescription>
                  Your generous contribution helps us continue our charitable efforts. We appreciate your support.
                </DialogDescription>
              </DialogHeader>
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

export default Foundation;
