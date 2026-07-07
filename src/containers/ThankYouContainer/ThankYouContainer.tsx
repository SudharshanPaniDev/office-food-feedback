import { ThankYou } from '../../features/feedback/ThankYou';

interface ThankYouContainerProps {
  onRestart: () => void;
}

export function ThankYouContainer({ onRestart }: ThankYouContainerProps) {
  return (
    <ThankYou
      message="Your feedback has been submitted successfully. We appreciate you helping us improve the office food experience."
      restartLabel="Submit Another Response"
      onRestart={onRestart}
    />
  );
}
