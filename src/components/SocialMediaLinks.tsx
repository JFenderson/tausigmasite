import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const SocialMediaLinks: React.FC<{ chapter: Chapter }> = ({ chapter }) => {
  return (
    <div>
      <h3 className="font-semibold">Social Media:</h3>
      <div className="flex space-x-4 mt-2">
        <a
          href={chapter.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
        >
          <Facebook size={24} />
        </a>
        <a
          href={chapter.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-600"
        >
          <Twitter size={24} />
        </a>
        <a
          href={chapter.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-600 hover:text-pink-800"
        >
          <Instagram size={24} />
        </a>
      </div>
    </div>
  );
};

export default SocialMediaLinks;
