import { InConstruction } from '@/components/view/Page';
import '../../Styles/globals.css';
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
