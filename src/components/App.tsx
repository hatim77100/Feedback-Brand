import { useEffect, useState } from "react";
import Container from "./Container";
import Footer from "./Footer";
import HashtagList from "./HashtagList";
import { TFeedbackItem } from "../lib/types";

function App() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handeAddToList = (text: string) => {
    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      text: text,
      upvoteCount: 0,
      daysAgo: 0,
      companyName: text
        .split(" ")
        .find((word: string) => word.includes("#"))!
        .substring(1),
      badgeLetter: text
        .split(" ")
        .find((word: string) => word.includes("#"))!
        .substring(1)
        .substring(0, 1)
        .toUpperCase(),
    };
    setFeedbackItems([...feedbackItems, newItem]);
  };

  const fetchData = async () => {
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

  useEffect(() => {
    fetchData();
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
  return (
    <div className="app">
      <Footer />
      <Container
        isLoading={isLoading}
        feedbackItems={feedbackItems}
        errorMessage={errorMessage}
        handeAddToList={handeAddToList}
      />
      <HashtagList />
    </div>
  );
}

export default App;
