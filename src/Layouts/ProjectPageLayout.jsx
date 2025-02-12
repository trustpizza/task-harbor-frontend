// PageLayout.jsx
import ProjectHeader from "../components/ProjectManagement/ProjectHeader";
// import Footer from '../components/Shared/Footer';

const PageLayout = ({ title, children, headerLinks = [] }) => {
  return (
    <div className="flex flex-col min-h-screen drawer">
      <ProjectHeader title={title} links={headerLinks} />
      <main className="container mx-auto p-4 flex flex-grow">
        {children}
      </main>
      {/* <Footer socialLinks={socialLinks} /> */}
    </div>
  );
};

export default PageLayout;