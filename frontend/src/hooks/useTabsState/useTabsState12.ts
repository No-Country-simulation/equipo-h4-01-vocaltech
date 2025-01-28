import { TabConfig } from '@/components/view/NewForm';
import { useState, useEffect, useCallback, useRef } from 'react';

const STORAGE_KEY = 'tabState_v1';
export const VERSION = '1.1';

// Función debounce mejorada
const debounce = <F extends (...args: any[]) => any>(fn: F, delay: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<F>): Promise<ReturnType<F>> => {
    clearTimeout(timeout);
    return new Promise(resolve => {
      timeout = setTimeout(() => resolve(fn(...args)), delay);
    });
  };
};

export const useTabsState = (initialTabs: TabConfig[]) => {
  const [activeTab, setActiveTab] = useState(0);
  const [tabsState, setTabsState] = useState<TabConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const lastUpdate = useRef<number>(0);
  const checksum = useRef<string>('');

  // Generar checksum del estado
  const generateChecksum = useCallback((state: any) => {
    return btoa(JSON.stringify(state));
  }, []);

  // Guardar estado con versionado y checksum
  const saveState = useCallback(
    (state: any) => {
      const timestamp = Date.now();
      const stateToSave = {
        version: VERSION,
        ...state,
        timestamp,
        checksum: generateChecksum(state)
      };

      lastUpdate.current = timestamp;
      checksum.current = stateToSave.checksum;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    },
    [generateChecksum]
  );

  // Cargar estado inicial
  useEffect(() => {
    const loadSavedState = () => {
      try {
        const savedData = localStorage.getItem(STORAGE_KEY);

        if (savedData) {
          const parsedData = JSON.parse(savedData);

          if (parsedData.version === VERSION) {
            if (
              parsedData.checksum ===
              generateChecksum({
                active: parsedData.active,
                tabs: parsedData.tabs
              })
            ) {
              setActiveTab(parsedData.active);
              setTabsState(parsedData.tabs);
              lastUpdate.current = parsedData.timestamp;
              checksum.current = parsedData.checksum;
            } else {
              console.warn('Checksum inválido, reiniciando estado');
              localStorage.removeItem(STORAGE_KEY);
              setTabsState(initialTabs);
            }
          } else {
            console.warn('Versión obsoleta, reiniciando estado');
            localStorage.removeItem(STORAGE_KEY);
            setTabsState(initialTabs);
          }
        } else {
          setTabsState(initialTabs);
        }
      } catch (error) {
        console.error('Error loading state:', error);
        localStorage.removeItem(STORAGE_KEY);
        setTabsState(initialTabs);
      }
      setIsLoading(false);
    };

    loadSavedState();
  }, [initialTabs, generateChecksum]);

  // Guardar estado cuando cambia
  useEffect(() => {
    if (!isLoading) {
      const stateToSave = {
        active: activeTab,
        tabs: tabsState
      };

      if (generateChecksum(stateToSave) !== checksum.current) {
        saveState(stateToSave);
      }
    }
  }, [activeTab, tabsState, isLoading, saveState, generateChecksum]);

  // Sincronización entre pestañas
  useEffect(() => {
    const handler = async (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        try {
          if (!event.newValue) return;

          const newState = JSON.parse(event.newValue);

          // Validaciones
          if (newState.timestamp === lastUpdate.current) return;
          if (newState.version !== VERSION) return;
          if (!newState.checksum) return;

          // Verificar si el estado es más reciente
          if (newState.timestamp > lastUpdate.current) {
            // Validar checksum antes de aplicar
            const newChecksum = generateChecksum({
              active: newState.active,
              tabs: newState.tabs
            });

            if (newChecksum === newState.checksum) {
              lastUpdate.current = newState.timestamp;
              checksum.current = newState.checksum;

              // Actualizar estado de forma atómica
              requestAnimationFrame(() => {
                setActiveTab(newState.active);
                setTabsState(newState.tabs);
              });
            }
          }
        } catch (error) {
          console.error('Error en sincronización:', error);
        }
      }
    };

    // Debounce + manejo de eventos paralelos
    const debouncedHandler = debounce(handler, 50);
    window.addEventListener('storage', debouncedHandler);

    return () => window.removeEventListener('storage', debouncedHandler);
  }, [generateChecksum]);

  // Función para limpiar estado
  const clearTabState = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    lastUpdate.current = 0;
    checksum.current = '';
    setActiveTab(0);
    setTabsState(
      initialTabs.map((tab, index) => ({
        ...tab,
        completed: false,
        disabled: index !== 0
      }))
    );
  }, [initialTabs]);

  return {
    activeTab,
    tabsState,
    setActiveTab,
    setTabsState,
    isLoading,
    clearTabState
  };
};
