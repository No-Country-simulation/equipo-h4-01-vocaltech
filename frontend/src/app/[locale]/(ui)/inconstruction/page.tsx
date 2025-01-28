import { InConstruction } from '@/components/view/Page';
import '../../styles/globals.css';
import { LanguageChanger, ThemeChanger } from '@/components/view/ToggetConfig';

function Construction() {
  return (
    <>
      <InConstruction />
      <LanguageChanger />
      <ThemeChanger />
    </>
  );
}

export default Construction;
