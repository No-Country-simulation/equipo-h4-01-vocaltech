import { NoCountryLogo, VocaltechLogo, VozYTuVozLogo } from '../../Logos';

export const LogosSection = () => {
  return (
    <div className="flex items-center gap-4">
      <VocaltechLogo />
      <VozYTuVozLogo />
      <NoCountryLogo />
    </div>
  );
};
