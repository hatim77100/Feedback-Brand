import { useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import FeedbackItem from "./FeedbackItem";
import Spinner from "./Spinner";

export default function FeedbackList() {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Someting went wrong.");
        }
        return response.json();
      })
      .then((data) => {
        setFeedbackItems(data.feedbacks);
        setIsLoading(false);
      })
      .catch(() => {
        setErrorMessage("Someting went wrong.");
        setIsLoading(false);
      });
  }, []);

  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
      {feedbackItems.map((feedbackItem, index) => (
        <FeedbackItem feedbackItem={feedbackItem} key={index} />
      ))}
    </ol>
  );
}
