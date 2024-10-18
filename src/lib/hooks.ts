import { useContext, useEffect, useState } from "react";
import { FeedbackItemsContext } from "../components/contexts/FeedbackItemsContextProvider";
import { TFeedbackItem } from "./types";

export function useFeedbackItemsContext() {
  const context = useContext(FeedbackItemsContext);
  if (!context) {
    throw new Error(
      "FeedbackItemsContext is not defined in FeedbackList component"
    );
  }
  return context;
}

export function useFeedbackItems() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchFeedbackItems = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
        );
        if (!res.ok) {
          throw new Error("Someting went wrong.");
        }
        const data = await res.json();
        setFeedbackItems(data.feedbacks);
      } catch (error) {
        setErrorMessage("Someting went wrong.");
      }
      setIsLoading(false);
    };
    fetchFeedbackItems();
    // setIsLoading(true);
    // fetch(
    //   "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
    // )
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Someting went wrong.");
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setFeedbackItems(data.feedbacks);
    //     setIsLoading(false);
    //   })
    //   .catch(() => {
    //     setErrorMessage("Someting went wrong.");
    //     setIsLoading(false);
    //   });
  }, []);

  return {
    feedbackItems,
    isLoading,
    errorMessage,
    setFeedbackItems,
  };
}
