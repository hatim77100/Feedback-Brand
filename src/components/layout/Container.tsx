import { TFeedbackItem } from "../../lib/types";
import FeedbackList from "../feedback/FeedbackList";
import Header from "./Header";

type ContainerProps = {
  isLoading: boolean;
  feedbackItems: TFeedbackItem[];
  errorMessage: string;
  handeAddToList: (text: string) => void;
};

export default function Container({
  isLoading,
  feedbackItems,
  errorMessage,
  handeAddToList,
}: ContainerProps) {
  return (
    <main className="container">
      <Header handeAddToList={handeAddToList} />
      <FeedbackList
        feedbackItems={feedbackItems}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
    </main>
  );
}
