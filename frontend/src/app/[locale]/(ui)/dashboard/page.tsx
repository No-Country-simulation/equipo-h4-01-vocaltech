import { InConstruction } from '@/components/view/Page';
import '../../styles/globals.css';
import { LanguageChanger, ThemeChanger } from '@/components/view/ToggetConfig';

function Dashboard() {
  return (
    <>
      <InConstruction />
      <LanguageChanger />
      <ThemeChanger />
    </>
  );
}

export default Dashboard;
