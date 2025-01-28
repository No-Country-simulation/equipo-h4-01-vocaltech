'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TabNavigationProps {
  children: React.ReactNode;
}

export const FormNavigation = ({ children }: TabNavigationProps) => {
  return (
    <Tabs defaultValue="personal" className="w-full">
      <TabsList className="w-full justify-start border-b rounded-none h-12 bg-transparent">
        <TabsTrigger
          value="personal"
          className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
        >
          Datos personales
        </TabsTrigger>
        <TabsTrigger
          value="experience"
          className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
        >
          Mi experiencia/CV
        </TabsTrigger>
        <TabsTrigger
          value="education"
          className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
        >
          Educación
        </TabsTrigger>
        <TabsTrigger
          value="more"
          className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
        >
          Más de un ítem
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};
