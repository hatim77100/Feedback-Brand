import ErrorMessage from "../ErrorMessage";
import Spinner from "../Spinner";
import FeedbackItem from "./FeedbackItem";
import { useFeedbackItemsContext } from "../contexts/FeedbackItemsContextProvider";

export default function FeedbackList() {
  const { feedbackItems, isLoading, errorMessage } = useFeedbackItemsContext();

  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {feedbackItems.map((feedbackItem) => (
        <FeedbackItem feedbackItem={feedbackItem} key={feedbackItem.id} />
      ))}
    </ol>
  );
}
