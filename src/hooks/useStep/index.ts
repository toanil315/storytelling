import { useCallback, useMemo, useState } from "react";

export interface HelpersUseStep {
  goToNextStep: () => void;
  goToPrevStep: () => void;
  goToSpecificStep: (step: number) => void;
  reset: () => void;
  canGoToNextStep: boolean;
  canGoToPrevStep: boolean;
}

function useStep(maxStep: number): [number, HelpersUseStep] {
  const [currentStep, setCurrentStep] = useState(1);

  const canGoToNextStep = useMemo(
    () => currentStep + 1 <= maxStep,
    [currentStep, maxStep]
  );

  const canGoToPrevStep = useMemo(() => currentStep - 1 >= 1, [currentStep]);

  const goToSpecificStep = useCallback(
    (step: number) => {
      if (step >= 1 && step <= maxStep) {
        setCurrentStep(step);
        return;
      }

      throw new Error("Step not valid");
    },
    [maxStep]
  );

  const goToNextStep = useCallback(() => {
    if (canGoToNextStep) {
      setCurrentStep((step) => step + 1);
    }
  }, [canGoToNextStep]);

  const goToPrevStep = useCallback(() => {
    if (canGoToPrevStep) {
      setCurrentStep((step) => step - 1);
    }
  }, [canGoToPrevStep]);

  const reset = useCallback(() => {
    setCurrentStep(1);
  }, []);

  return [
    currentStep,
    {
      goToNextStep,
      goToPrevStep,
      goToSpecificStep,
      canGoToNextStep,
      canGoToPrevStep,
      reset,
    },
  ];
}

export default useStep;
