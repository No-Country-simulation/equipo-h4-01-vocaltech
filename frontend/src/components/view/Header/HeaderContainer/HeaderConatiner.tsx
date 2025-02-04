import { VocaltechLogo } from '../../Logos';
import { UserMenu } from '../UserMenu/UserMenu';

export const HeaderContainer = () => {
  return (
    <header className="border-b-4 border-b-accent">
      <div className="flex h-16 px-4 justify-between items-center">
        <VocaltechLogo theme="primary" />
        <div className="flex-1 flex justify-end">
          <UserMenu />
        </div>
      </div>
    </header>
  );
};
