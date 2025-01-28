import { ContactSection } from '../ContacSection/ContactSection';
import { LogosSection } from '../LogosSection/LogosSection';

export const FooterContainer = () => {
  return (
    <footer className="bg-primary px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <LogosSection />
        <ContactSection />
      </div>
    </footer>
  );
};
