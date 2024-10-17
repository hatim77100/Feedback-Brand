import { useFeedbackItemsContext } from "../contexts/FeedbackItemsContextProvider";
import FeedbackForm from "../feedback/FeedbackForm";
import Logo from "../Logo";
import PageHeading from "../PageHeading";
import Pattern from "../Pattern";

export default function Header() {
  const { handeAddToList } = useFeedbackItemsContext();
  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm onAddToList={handeAddToList} />
    </header>
  );
}
