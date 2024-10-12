import FeedbackForm from "./FeedbackForm";
import Logo from "./Logo";
import PageHeading from "./PageHeading";
import Pattern from "./Pattern";

type HeaderProps = {
  handeAddToList: (text: string) => void;
};

export default function Header({ handeAddToList }: HeaderProps) {
  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm onAddToList={handeAddToList} />
    </header>
  );
}
