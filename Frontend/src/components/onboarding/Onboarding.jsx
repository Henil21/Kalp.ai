import { useEffect, useState } from "react";
import IntroScreen from "./IntroScreen";
import WelcomeScreen from "./WelcomeScreen";
import AvatarScreen from "./AvatarScreen";

export default function Onboarding() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => setStep(1), 2500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="w-screen h-screen overflow-hidden">
      {step === 0 && <IntroScreen />}
      {step === 1 && <WelcomeScreen onNext={() => setStep(2)} />}
      {step === 2 && <AvatarScreen />}
    </div>
  );
}
