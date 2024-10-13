import { useEffect, useState } from "react";
import Container from "./layout/Container";
import Footer from "./layout/Footer";
import HashtagList from "./hashtag/HashtagList";
import { TFeedbackItem } from "../lib/types";

function App() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  const filterFeedbackItems = selectedCompany
    ? feedbackItems.filter(
        (feedbackItem) => feedbackItem.company === selectedCompany
      )
    : feedbackItems;

  const companyList = feedbackItems
    .map((item) => item.company)
    .filter((company, index, array) => {
      return array.indexOf(company) === index;
    });

  const handeAddToList = async (text: string) => {
    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      text: text,
      upvoteCount: 0,
      daysAgo: 0,
      company: text
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

    await fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
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

  const handleSelectCompany = (company: string) => {
    setSelectedCompany(company);
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
        feedbackItems={filterFeedbackItems}
        errorMessage={errorMessage}
        handeAddToList={handeAddToList}
      />
      <HashtagList
        companyList={companyList}
        handleSelectCompany={handleSelectCompany}
      />
    </div>
  );
}

export default App;
