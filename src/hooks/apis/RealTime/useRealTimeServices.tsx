import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import RealTimeServices from "src/services/RealTimeServices";

// use global variables
let realTimeServices: RealTimeServices | undefined = undefined;
let observers: React.Dispatch<
  React.SetStateAction<RealTimeServices | undefined>
>[] = [];

// changes global state and updates all observers
export const setRealTimeService = (services: RealTimeServices | undefined) => {
  realTimeServices = services;
  observers.forEach((update) => update(services));
};

// React Hook
const useRealTimeServices = (): [(userId: string) => void, () => void] => {
  const [realTimeServicesState, setRealTimeServicesState] = useState<
    RealTimeServices | undefined
  >(realTimeServices);

  const queryClient = useQueryClient();

  useEffect(() => {
    // add setIsOnlineState to observers list
    observers.push(setRealTimeServicesState);

    // update isOnlineState with latest global isOnline state
    setRealTimeServicesState(realTimeServices);

    // remove this setIsOnlineState from observers, when component unmounts
    return () => {
      observers = observers.filter(
        (update) => update !== setRealTimeServicesState
      );
    };
  }, []);

  const init = useCallback((userId: string) => {
    setRealTimeService(new RealTimeServices(userId, queryClient));
  }, []);

  const destroy = useCallback(() => {
    setRealTimeService(undefined);
  }, []);

  // return global isOnline state and setter function
  return [init, destroy];
};

export default useRealTimeServices;
