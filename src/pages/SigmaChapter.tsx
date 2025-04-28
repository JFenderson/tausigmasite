// src/pages/SigmaChapter.js
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Star, Users, Award, RadioTower } from "lucide-react";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { SocialIcon } from 'react-social-icons'


const dynamoDb = new DynamoDBClient({
  region: 'us-east-1',
  credentials: {
    // accessKeyId: import.meta.env.VITE_AWS_DYNAMO_ACCESS_KEY_ID, 
    // secretAccessKey: import.meta.env.VITE_AWS_DYNAMO_SECRET_ACCESS_KEY_ID,
    accessKeyId: import.meta.env.VITE_AWS_S3_ACCESS_KEY_ID, 
    secretAccessKey: import.meta.env.VITE_AWS_S3_SECRET_ACCESS_KEY,
  },
});

interface Member {
  id: string;
  firstName: string;
  lastName: string;
  chapter: string;
  chapterRole: string;
  stateRole: string;
  imageUrl: string;
}

const SigmaChapter: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchMembers = async () => {
      const params = {
        TableName: 'Members', // Your DynamoDB table name
      };

      try {
        const command = new ScanCommand(params); // Scan the DynamoDB table
        const data = await dynamoDb.send(command);
        // Map the DynamoDB data to the Member type
        const mappedMembers: Member[] = data.Items?.map((item) => ({
          id: item.id?.S || "unknown_id", // Use optional chaining and fallback value
          firstName: item.firstName?.S || 'No first name',
          lastName: item.lastName?.S || 'No last name',
          chapter: item.chapter?.S || 'No chapter',
          chapterRole: item.chapterRole?.S || '',
          stateRole: item.stateRole?.S || '',
          imageUrl: item.imageUrl?.S || "", // Default image if missing
        })) || [];

        const chapterRolesPriority = [
          "President", "Vice President", "Secretary", "Treasurer/Director of Social Action", "Financial Secretary", "Director of Social Action", "Director of Bigger & Better Business", "Director of Education", "Sigma Beta Club Cooridinator", "Sigma-Zeta Relations (Hoover)", "Sigma-Zeta Relations(Bessemer)","Sigma-Zeta Relations (Birmingham)", "House Manager","CEO of Tau Sigma Charity Foundation",
          "Immediate Past AL State Director", "AL Director of Military Affairs", "AL Director of Collegiate Affairs", "AL Sigma Beta Club Coordinator" // Add other roles as needed
        ];

        const getRolePriority = (role: string) => {
          return chapterRolesPriority.indexOf(role) !== -1 ? chapterRolesPriority.indexOf(role) : Infinity;
        };

        const sortedMembers = mappedMembers
          .filter((member) => member.chapter === 'Sigma')  
          .sort((a, b) => {
            // Compare chapterRole first (priority-based)
            const chapterRoleA = a.chapterRole ? getRolePriority(a.chapterRole) : Infinity;
            const chapterRoleB = b.chapterRole ? getRolePriority(b.chapterRole) : Infinity;

            // If chapterRole is the same, compare stateRole next
            if (chapterRoleA === chapterRoleB) {
              const stateRoleA = a.stateRole ? getRolePriority(a.stateRole) : Infinity;
              const stateRoleB = b.stateRole ? getRolePriority(b.stateRole) : Infinity;

              // If stateRole is also the same, sort alphabetically by last name and first name
              if (stateRoleA === stateRoleB) {
                const lastNameA = a.lastName.toLowerCase();
                const lastNameB = b.lastName.toLowerCase();
                const firstNameA = a.firstName.toLowerCase();
                const firstNameB = b.firstName.toLowerCase();

                if (lastNameA === lastNameB) {
                  return firstNameA.localeCompare(firstNameB); // Alphabetical sorting by first name
                }
                return lastNameA.localeCompare(lastNameB); // Alphabetical sorting by last name
              }

              return stateRoleA - stateRoleB; // If stateRole is different, prioritize stateRole
            }

            return chapterRoleA - chapterRoleB; // Prioritize chapterRole
          });


        console.log('Data retrieved from DynamoDB:', sortedMembers);
    
        setMembers(sortedMembers); 
        setLoading(false);
      } catch (err) {
        setError('Error fetching members');
        console.error(err);
        setLoading(false);
      }
    };

    fetchMembers(); // Run fetch function on component mount
  }, []);

  return (
    <Layout>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-center mb-8">
          {/* Chapter Logo */}
          <img 
            src="https://tau-sigma-images.s3.us-east-1.amazonaws.com/SigmaCentennial.png" 
            alt="Sigma Centennial Logo" 
            className="size-32 mr-5"  // Adjust size and margin for logo
          />
          {/* Chapter Info */}
          <div>
            <h2 className="text-6xl font-bold text-gray-900">Sigma Chapter</h2>
            <p className="text-3xl font-medium text-gray-700">Location: Miles College</p>
          </div>
        </div>
        {/* Show loading indicator while fetching data */}
        {loading && (
            <p className="text-center text-gray-600">Loading members...</p>
          )}

          {/* Show error message if data fetching fails */}
          {error && <p className="text-center text-red-600">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Our Story</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  The Sigma Chapter of Phi Beta Sigma Fraternity, Incorporated was chartered on January 23, 1925 on the campus of Miles College by William A. Bell, The 2nd President of Miles College.
                </p>
                <p className="text-gray-600 mb-4">
                Since it's chartering, The Sigma Chapter have been a pillar in the Fairfield and Birmingham community through service projects that spans from education to social activities. 
                </p>
                <p className="text-gray-600">
                  Today, Sigma Chapter continues to uphold the founding
                  principles, adapting to the changing needs of our members and
                  society while remaining true to our core values. We are proud
                  of our rich history and excited about our future as we
                  continue to shape the leaders of tomorrow.
                </p>
              </CardContent>
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <Star className="mr-4 text-blue-500" size={24} />
                    <div>
                      <h3 className="font-semibold mb-2">Leadership</h3>
                      <p className="text-gray-600">
                       Chapter President - Bro. Jaden Wilborn
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="mr-4 text-green-500" size={24} />
                    <div>
                      <h3 className="font-semibold mb-2">Education</h3>
                      <p className="text-gray-600">
                        We foster lifelong friendships and a supportive
                        community for our members.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <RadioTower className="mr-4 text-red-500" size={24} />
                    <div>
                      <h3 className="font-semibold mb-2">Social Media</h3>
                      
                      <SocialIcon url="https://www.instagram.com/crazysigmachapter?igsh=cXFsdWpvMWpjNTRp"  />
                     
                      
                    </div>
                  </div>
                  <div className="flex items-start">
                    <RadioTower className="mr-4 text-red-500" size={24} />
                    <div>
                      <h3 className="font-semibold mb-2">Social Media2</h3>
                      
                      <SocialIcon url="https://www.instagram.com/crazysigmachapter?igsh=cXFsdWpvMWpjNTRp"  />
                     
                      
                    </div>
                  </div>
                  <div className="flex items-start">
                   
                  </div>
                  <div className="flex items-start">
                    <Award className="mr-4 text-yellow-500" size={24} />
                    <div>
                      <h3 className="font-semibold mb-2">
                        Social Action
                      </h3>
                      <p className="text-gray-600">
                        We promote and support high academic achievement among
                        our members.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              
            </Card>
          </div>

          <div>
            {/* <Card>
              <CardHeader>
                <CardTitle>Key Milestones</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-8">
                    {[
                      {
                        year: 1950,
                        event:
                          "Tau Sigma Fraternity founded at the University of Example",
                      },
                      {
                        year: 1955,
                        event: "Expansion to five additional campuses",
                      },
                      {
                        year: 1970,
                        event:
                          "Establishment of the Tau Sigma Charity Foundation",
                      },
                      {
                        year: 1985,
                        event: "Launch of the Annual Leadership Conference",
                      },
                      {
                        year: 2000,
                        event:
                          "50th Anniversary Celebration and Scholarship Fund creation",
                      },
                      {
                        year: 2010,
                        event: "Initiation of the Tau Sigma Mentorship Program",
                      },
                      {
                        year: 2020,
                        event:
                          "70th Anniversary and launch of the Alumni Network Platform",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="relative pl-8 pb-8 border-l-2 border-gray-200 last:border-l-0"
                      >
                        <div className="absolute left-0 top-0 bg-white rounded-full w-4 h-4 -ml-2 border-2 border-blue-500"></div>
                        <h4 className="font-bold text-lg">{item.year}</h4>
                        <p className="text-gray-600">{item.event}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card> */}
            
            <div>
      {!loading && !error && members.length === 0 ? (
        <p className="text-center text-gray-600 mt-8">
          No members found matching the current filters.
        </p>
      ) : (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Current Members</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-8">
                  {members.map((member) => (
                    <div
                      key={member.id}
                      className="relative pl-8 pb-8 border-l-2 border-gray-200 last:border-l-0"
                    >
                      <div className="absolute left-0 top-0 bg-white rounded-full w-4 h-4 -ml-2 border-2 border-blue-500"></div>
                      <p className="font-bold text-lg text-blue-700">{member.firstName} {member.lastName}</p>
                      <p className=" font-bold text-gray-600">{member.chapterRole}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
            </div>
        </div>
      </main>
    </Layout>
  );
};

export default SigmaChapter;
