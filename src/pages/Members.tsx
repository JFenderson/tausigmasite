import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import TS100 from '../assets/TS100.svg';
import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";


const dynamoDb = new DynamoDBClient({
  region: 'us-east-1',
  credentials: {
    // accessKeyId: import.meta.env.VITE_AWS_DYNAMO_ACCESS_KEY_ID, 
    // secretAccessKey: import.meta.env.VITE_AWS_DYNAMO_SECRET_ACCESS_KEY_ID,
    accessKeyId: import.meta.env.VITE_AWS_S3_ACCESS_KEY_ID, 
    secretAccessKey: import.meta.env.VITE_AWS_S3_SECRET_ACCESS_KEY,
  },
});

console.log()
interface Member {
  id: string;
  firstName: string;
  lastName: string;
  chapter: string;
  chapterRole: string;
  stateRole: string;
  imageUrl: string;
}

const Members = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      const params = {
        TableName: 'Members',
        KeyConditionExpression: 'chapter = :chapter',
        ExpressionAttributeValues: {
          ':chapter': { S: 'Tau Sigma' },
        },
      };

      try {
        const command = new QueryCommand(params); // Scan the DynamoDB table
        const data = await dynamoDb.send(command);
        // Map the DynamoDB data to the Member type
        const mappedMembers: Member[] = data.Items?.map((item) => ({
          id: item.id?.S || "unknown_id", // Use optional chaining and fallback value
          firstName: item.firstName?.S || 'No first name',
          lastName: item.lastName?.S || 'No last name',
          chapter: item.chapter?.S || 'No chapter',
          chapterRole: item.chapterRole?.S || '',
          stateRole: item.stateRole?.S || '',
          imageUrl: item.imageUrl?.S || TS100, // Default image if missing
        })) || [];

        const chapterRolesPriority = [
          "President", "Vice President", "Secretary", "Treasurer", "Financial Secretary", "Director of Social Action", "Director of Bigger & Better Business", "Director of Education", "Sigma Beta Club Cooridinator", "Sigma-Zeta Relations (Hoover)", "Sigma-Zeta Relations(Bessemer)","Sigma-Zeta Relations (Birmingham)", "House Manager","CEO of Tau Sigma Charity Foundation",
          "Immediate Past AL State Director", "AL Director of Military Affairs", "AL Director of Collegiate Affairs", "AL Sigma Beta Club Coordinator" // Add other roles as needed
        ];

        const getRolePriority = (role: string) => {
          return chapterRolesPriority.indexOf(role) !== -1 ? chapterRolesPriority.indexOf(role) : Infinity;
        };

        const sortedMembers = mappedMembers
          .filter((member) => member.chapter === 'Tau Sigma')  // Filter members by chapter (only Tau Sigma)
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
                  {/* Display the image with fallback */}
                  <CardTitle>
                    Bro. {member.firstName} {member.lastName}
                  </CardTitle>
                  <img
                    src={member.imageUrl}  // Default image if no image provided
                    alt={`${member.firstName} ${member.lastName}`}
                    className="rounded-full w-24 h-24 mx-auto mb-4"
                  />
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-md font-bold text-gray-900">{member.chapterRole}</p>
                  <p className="text-sm font-bold text-blue-800">{member.stateRole}</p>
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
