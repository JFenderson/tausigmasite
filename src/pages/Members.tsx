import React, { useEffect, useState } from "react";
// import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Search } from "lucide-react";
import Layout from "@/components/Layout";
import { fetchGoogleSheetData } from "@/services/GoogleCalendarService";

const SPREADSHEET_ID = "1w2vdy6iqDEADPSCiqLs0-9Fpa0Yey0ISB1UjBLs4jhY"; // Replace with your Google Sheet ID
const API_KEY = "AIzaSyBRWo6DTySVqQANVSuyw5b9O2aP5VAajg8"; // Replace with your Google API key
const RANGE = "Sheet1!A1:D60"; // Replace with the range in your Google Sheet

interface Member {
  id: number;
  firstName: string;
  lastName: string;
  chapterRole: string;
  stateRole: string;
  image: string;
}

const Members: React.FC = () => {
  // const [searchTerm, setSearchTerm] = useState("");
  // const [roleFilter, setRoleFilter] = useState("");
  // const [stateFilter, setStateFilter] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    

    const getSheetData = async () => {
        setLoading(true); // Set loading state to true when fetching starts
    setError(null);
    try {
        const data = await fetchGoogleSheetData(SPREADSHEET_ID, RANGE, API_KEY);
        console.log("data", data);
        // Mapping Google Sheet data to Member array
        const mappedMembers = data.map((row: string[], index: number) => ({
          id: index + 1,
          firstName: row[0],
          lastName: row[1], // Assuming name is in the first column (A)
          chapterRole: row[2], // Assuming role is in the second column (B)
          stateRole: row[3], // Assuming year is in the third column (C)
          image: row[4] || "/placeholder.svg?height=100&width=100", // Assuming image URL is in the fourth column (D)

          
        }));
        
        setMembers(mappedMembers);
      }
     catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
    };
    getSheetData();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Members</h1>

          {/* Show loading indicator while fetching data */}
          {loading && (
            <p className="text-center text-gray-600">Loading members...</p>
          )}

          {/* Show error message if data fetching fails */}
          {error && <p className="text-center text-red-600">{error}</p>}

          {!loading && !error && members.length === 0 ? (
            <p className="text-center text-gray-600 mt-8">
              No members found matching the current filters.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {members.map((member) => (
                
                <Card key={member.id}>
                  <CardHeader className="text-center">
                  <img src={member.image} alt={`${member.firstName} ${member.lastName}`} />
                    <CardTitle>
                      Bro. {member.firstName} {member.lastName}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-gray-600">
                      {member.chapterRole}
                    </p>
                    <p className="text-sm text-gray-600">{member.stateRole}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
};

export default Members;
