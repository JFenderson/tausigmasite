import React, { useState } from 'react'
import { Input } from "../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { Search } from 'lucide-react'
import Layout from '@/components/Layout'

interface Member {
    id: number;
    name: string;
    role: string;
    year: string;
    image: string;
  }
  
  const members: Member[] = [
    { id: 1, name: "John Doe", role: "President", year: "Senior", image: "/placeholder.svg?height=100&width=100" },
    { id: 2, name: "Jane Smith", role: "Vice President", year: "Junior", image: "/placeholder.svg?height=100&width=100" },
    { id: 3, name: "Mike Johnson", role: "Treasurer", year: "Sophomore", image: "/placeholder.svg?height=100&width=100" },
    { id: 4, name: "Emily Brown", role: "Secretary", year: "Junior", image: "/placeholder.svg?height=100&width=100" },
    { id: 5, name: "Chris Lee", role: "Member", year: "Freshman", image: "/placeholder.svg?height=100&width=100" },
    { id: 6, name: "Alex Wilson", role: "Member", year: "Senior", image: "/placeholder.svg?height=100&width=100" },
    { id: 7, name: "Sam Taylor", role: "Member", year: "Sophomore", image: "/placeholder.svg?height=100&width=100" },
    { id: 8, name: "Jordan Casey", role: "Member", year: "Junior", image: "/placeholder.svg?height=100&width=100" },
  ];
  
  const Members: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [roleFilter, setRoleFilter] = useState('')
    const [yearFilter, setYearFilter] = useState('')
  
    const filteredMembers = members.filter(
        (member) =>
          member.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (roleFilter === "all" || roleFilter === "" || member.role === roleFilter) && // Handle "all" or no filter
          (yearFilter === "all" || yearFilter === "" || member.year === yearFilter)    // Handle "all" or no filter
      );
  
    return (
        <Layout>

      <div className="min-h-screen bg-gray-100">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Members</h1>
          
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
              {filteredMembers.map(member => (
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
        </main>
      </div>
      </Layout>

    )
  }
  

export default Members
