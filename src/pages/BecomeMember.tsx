import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import Layout from "@/components/Layout";

// Member type interface
interface Member {
  id: number;
  name: string;
  role: string;
  year: string;
  image: string;
}

// Predefined members (can be fetched from API or DB)
const members: Member[] = [
  { id: 1, name: "John Doe", role: "President", year: "Senior", image: "/placeholder.svg?height=100&width=100" },
  { id: 2, name: "Jane Smith", role: "Vice President", year: "Junior", image: "/placeholder.svg?height=100&width=100" },
  // Add more members as needed
];

const BecomeMember: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    year: "",
    reason: "",
  });

  // Filtered members for display
  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (roleFilter === "" || member.role === roleFilter) &&
      (yearFilter === "" || member.year === yearFilter)
  );

  // Form handling
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to an API)
    console.log(formData);
    alert("Application submitted successfully!");
  };

  return (
    <Layout>

    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Become a Member</h1>
        <p className="text-lg mb-8">
          Join our fraternity and become part of a brotherhood that fosters leadership and personal growth. Please fill out the application form below to get started.
        </p>

        {/* Membership Application Form */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Membership Application Form</CardTitle>
          </CardHeader>
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
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <Select value={formData.role} onValueChange={(val) => setFormData({ ...formData, role: val })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="President">President</SelectItem>
                    <SelectItem value="Vice President">Vice President</SelectItem>
                    <SelectItem value="Treasurer">Treasurer</SelectItem>
                    <SelectItem value="Secretary">Secretary</SelectItem>
                    <SelectItem value="Member">Member</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                  Year
                </label>
                <Select value={formData.year} onValueChange={(val) => setFormData({ ...formData, year: val })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Freshman">Freshman</SelectItem>
                    <SelectItem value="Sophomore">Sophomore</SelectItem>
                    <SelectItem value="Junior">Junior</SelectItem>
                    <SelectItem value="Senior">Senior</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                  Why do you want to join?
                </label>
                <Input
                  type="text"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  placeholder="Share why you want to become a member"
                  className="mt-1"
                  required
                />
              </div>
              <Button type="submit" className="w-full mt-6">
                Submit Application
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Filtered Members Section */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold mb-4">Current Members</h2>
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="President">President</SelectItem>
                <SelectItem value="Vice President">Vice President</SelectItem>
                <SelectItem value="Treasurer">Treasurer</SelectItem>
                <SelectItem value="Secretary">Secretary</SelectItem>
                <SelectItem value="Member">Member</SelectItem>
              </SelectContent>
            </Select>
            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="Freshman">Freshman</SelectItem>
                <SelectItem value="Sophomore">Sophomore</SelectItem>
                <SelectItem value="Junior">Junior</SelectItem>
                <SelectItem value="Senior">Senior</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredMembers.length === 0 ? (
            <p className="text-center text-gray-600 mt-8">No members found matching the current filters.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredMembers.map((member) => (
                <Card key={member.id}>
                  <CardHeader className="text-center">
                    <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
                    <CardTitle>{member.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-gray-600">{member.role}</p>
                    <p className="text-sm text-gray-600">{member.year}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
    
    </div>
    </Layout>

  );
};

export default BecomeMember;
