import SocialIcon from "./SocialIcon";

const Footer = ({ socialLinks }) => {
  const currentYear = new Date().getFullYear();

  return (
  <>
    <footer className="bg-base-200 p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; {currentYear} My Company. All rights reserved.</p>

        {/* Social Icons */}
        {socialLinks && socialLinks.length > 0 && ( // Conditionally render if socialLinks exist
          <div className="mt-4 flex justify-center"> {/* Center the icons */}
            {socialLinks.map((link) => (
              <SocialIcon
                key={link.name} // Important for React list rendering
                name={link.icon} // Font Awesome icon name
                href={link.href}
                className="mx-2 text-gray-500 hover:text-gray-700" // Add margin and styling
                size="lg" // Example size, customize as needed
              />
            ))}
          </div>
        )}
      </div>
    </footer>
  </>
  );
};

export default Footer;