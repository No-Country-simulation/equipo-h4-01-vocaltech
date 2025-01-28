import { FormNewContainer } from '@/components/view/NewForm';
import { redirect } from 'next/navigation';

export function Home() {
  //redirect('/inConstruction');
  //redirect('/form');
  redirect('/landing');
}

export default Home;
