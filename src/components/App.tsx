import { useMemo, useState } from "react";
import FeedbackItemsContextProvider from "./contexts/FeedbackItemsContextProvider";
import HashtagList from "./hashtag/HashtagList";
import Container from "./layout/Container";
import Footer from "./layout/Footer";

function App() {
  const [selectedCompany, setSelectedCompany] = useState("");

  const filterFeedbackItems = useMemo(
    () =>
      selectedCompany
        ? feedbackItems.filter(
            (feedbackItem) => feedbackItem.company === selectedCompany
          )
        : feedbackItems,
    [selectedCompany, feedbackItems]
  );

  const handleSelectCompany = (company: string) => {
    setSelectedCompany(company);
  };

  return (
    <div className="app">
      <Footer />

      <FeedbackItemsContextProvider>
        <Container />
      </FeedbackItemsContextProvider>
      <HashtagList
        companyList={companyList}
        handleSelectCompany={handleSelectCompany}
      />
    </div>
  );
}

export default App;
