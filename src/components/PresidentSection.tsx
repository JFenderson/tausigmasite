const PresidentSection: React.FC<{ president: { name: string; image: string } }> = ({ president }) => (
    <div>
      <h3 className="font-semibold">Current President:</h3>
      <div className="flex items-center space-x-4 mt-2">
        <img src={president.image} alt={president.name} className="w-16 h-16 rounded-full" />
        <p>{president.name}</p>
      </div>
    </div>
  );
  
  export default PresidentSection;
  