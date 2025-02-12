// PageLayout.jsx
import Header from "../components/Shared/Header";
import Footer from '../components/Shared/Footer';

const PageLayout = ({ title, children, socialLinks }) => {
  return (
    <div className="flex flex-col min-h-screen drawer">
      <Header title={title} />
      <main className="container mx-auto p-4 flex flex-grow">
        {children}
      </main>
      <Footer socialLinks={socialLinks} />
    </div>
  );
};

export default PageLayout;