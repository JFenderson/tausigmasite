import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import Layout from '@/components/Layout';

const SigmaBetaClub: React.FC = () => {
  const [formData, setFormData] = useState({
    parentName: '',
    parentEmail: '',
    childName: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    setFormSubmitted(true);
  };

  return (
    <Layout>

    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Sigma Beta Club</h1>

        {/* Information Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">About the Sigma Beta Club</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              The Sigma Beta Club is a youth auxiliary under Phi Beta Sigma Fraternity Inc. The mission of Sigma Beta Club is to provide
              mentoring, leadership development, and educational opportunities for young men aged 8 to 18. We believe in fostering a
              positive environment where youth can develop essential life skills and contribute to their communities.
            </p>
            <p className="text-gray-700 mb-4">
              Sigma Beta Club members are involved in a variety of activities including community service projects, educational workshops, and
              leadership training. We work with parents and communities to ensure the success of each young man involved in the program.
            </p>
          </CardContent>
        </Card>

        {/* Contact Form Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-6">
            If you are interested in learning more about the Sigma Beta Club or enrolling your child, please fill out the form below, and one of our team members will reach out to you.
          </p>

          <Card>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="parentName" className="block text-sm font-medium text-gray-700">
                    Parent/Guardian Name
                  </label>
                  <Input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="parentEmail" className="block text-sm font-medium text-gray-700">
                    Parent/Guardian Email
                  </label>
                  <Input
                    type="email"
                    name="parentEmail"
                    value={formData.parentEmail}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="childName" className="block text-sm font-medium text-gray-700">
                    Child's Name
                  </label>
                  <Input
                    type="text"
                    name="childName"
                    value={formData.childName}
                    onChange={handleInputChange}
                    placeholder="Enter your child's name"
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message (Optional)
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Feel free to leave us a message or any specific questions."
                    className="mt-1"
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full mt-6">
                  Submit Interest Form
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
                <DialogTitle>Form Submitted Successfully!</DialogTitle>
              </DialogHeader>
              <p className="mt-4">
                Thank you for your interest in the Sigma Beta Club. We will get back to you shortly.
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

export default SigmaBetaClub;
