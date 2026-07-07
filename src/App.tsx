import { useState } from 'react';
import { FeedbackFormContainer } from './containers/FeedbackFormContainer';
import { ThankYouContainer } from './containers/ThankYouContainer';

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isSubmitted) {
    return <ThankYouContainer onRestart={() => setIsSubmitted(false)} />;
  }

  return <FeedbackFormContainer onSubmitted={() => setIsSubmitted(true)} />;
}

export default App;
