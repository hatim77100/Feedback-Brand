import { useFeedbackItemsStore } from "../../stores/FeedbackItemsStore";
import HashtagItem from "./HashtagItem";

export default function HashtagList() {
  const companyList = useFeedbackItemsStore((state) => state.getCompanyList());
  const selectCompany = useFeedbackItemsStore((state) => state.selectCompany);

  // Utilise useMemo pour mémoriser le résultat de getCompanyList
  // const companyList = useMemo(() => getCompanyList(), [getCompanyList]);

  return (
    <ul className="hashtags">
      {companyList.map((company) => (
        <HashtagItem
          key={company}
          company={company}
          onSelectCompany={selectCompany}
        />
      ))}
    </ul>
  );
}
