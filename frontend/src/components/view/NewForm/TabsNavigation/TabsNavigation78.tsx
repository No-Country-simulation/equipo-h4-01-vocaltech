'use client';
import { TabsList, TabsTrigger } from '@/components/ui';
import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';
import { TabConfig, TabsNavigationProps } from '../TabType/TabType';
import { TabLabel } from '../TabLabel/TabLabel';

export const TabsNavigation = ({
  tabsState,
  activeTab,
  setActiveTab
}: TabsNavigationProps) => (
  <TabsList className="flex w-full pointer-events-none scrollbar-hide overflow-x-auto bg-transparent p-0">
    {tabsState.map((tab, index) => (
      <TabsTrigger
        key={tab.id}
        value={tab.id}
        className={cn(
          'relative transition-all duration-300 group',
          'overflow-hidden text-ellipsis whitespace-nowrap px-4',
          'bg-transparent hover:bg-transparent',
          tab.disabled
            ? 'text-[#A9A6E4]'
            : 'text-muted-foreground hover:text-foreground'
        )}
        style={{
          width: `${100 / Math.min(tabsState.length, 5)}%`,
          flex: '0 0 auto',
          minWidth: '140px'
        }}
        onClick={() => !tab.disabled && setActiveTab(index)}
      >
        <div className="flex flex-col items-center w-full">
          <div className="flex items-center gap-2">
            {tab.completed && (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-green-500 transition-opacity" />
            )}
            <TabLabel
              icon={tab.icon}
              color={tab.color}
              title={tab.title}
              disabled={tab.disabled}
            />
          </div>

          {/* Animación de línea activa (conservada) */}
          <div className="w-full relative mt-2">
            <div
              className={cn(
                'h-[2px] bg-accent transition-all duration-300',
                activeTab === index ? 'w-full' : 'w-0'
              )}
            />
            <div className="absolute inset-0 h-[1px] bg-border/50" />
          </div>
        </div>
      </TabsTrigger>
    ))}
  </TabsList>
);
