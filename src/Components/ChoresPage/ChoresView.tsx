import UserData from "~/types/Response/UserData";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ChoreList from "~/Components/ChoresPage/ChoreList";
import SortingButtons from "~/Components/SharedComponents/SortingButtons";
import { extractUserRecurrences } from "~/Helper Functions/extractUserRecurrences";
import { extractUserCategories } from "~/Helper Functions/extractUserCategories";
import sortData from "~/Helper Functions/sortData";

interface ChoresProps {
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
}

const ChoresView = ({ userData, setUserData }: ChoresProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (userData.username === "") {
      navigate("/");
    }
  }, []);

  const recurrenceList: string[] = extractUserRecurrences(
    userData.chores ?? [],
  );
  const categoryList: string[] = extractUserCategories(userData.chores ?? []);

  const [sortOrder, setSortOrder] = useState("asc");
  const [sortValue, setSortValue] = useState<string>("title");

  return (
    <>
      <SortingButtons
        recurrenceList={recurrenceList}
        categoryList={categoryList}
        setSortOrder={setSortOrder}
        setSortValue={setSortValue}
        sortValue={sortValue}
        sortOrder={sortOrder}
      />
      <ChoreList
        userData={userData}
        chores={sortData(userData.chores, sortValue, sortOrder)} //use sorted function on this sortData( UserData.chores, sortOptions, sortValue, sortOrder)
        setUserData={setUserData}
        recurrenceList={recurrenceList}
        categoryList={categoryList}
      />
      ;
    </>
  );
};

export default ChoresView;
