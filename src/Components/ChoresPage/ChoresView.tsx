import React, { useEffect, useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router";
import { Box, Fab, Popover, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FilterIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";

import ChoreList from "~/Components/ChoresPage/ChoreList";
import SortingButtons from "~/Components/SharedComponents/SortingButtons";
import FilterButton from "~/Components/SharedComponents/FilterButton";
import { extractUserRecurrences } from "~/HelperFunctions/extractUserRecurrences";
import { extractUserCategories } from "~/HelperFunctions/extractUserCategories";
import filterData from "~/HelperFunctions/filterData";
import sortData from "~/HelperFunctions/sortData";
import UserData from "~/types/Response/UserData";

interface ChoresViewProps {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

export default function ChoresView({ userData, setUserData }: ChoresViewProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (userData.username === "") {
      navigate("/");
    }
  }, [userData.username, navigate]);

  const recurrenceList = extractUserRecurrences(userData.chores ?? []);
  const categoryList = extractUserCategories(userData.chores ?? []);

  const [sortValue, setSortValue] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterValues, setFilterValues] = useState<string[]>([]);

  const filteredAndSortedChores = sortData(
    filterData(userData.chores, filterValues, recurrenceList, categoryList),
    sortValue,
    sortOrder,
  );

  const [anchorElFilter, setAnchorElFilter] = useState<HTMLElement | null>(
    null,
  );
  const [anchorElSort, setAnchorElSort] = useState<HTMLElement | null>(null);

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElFilter(event.currentTarget);
  };
  const handleFilterClose = () => {
    setAnchorElFilter(null);
  };
  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElSort(event.currentTarget);
  };
  const handleSortClose = () => {
    setAnchorElSort(null);
  };

  // 6) Whether popovers are open
  const openFilterPopover = Boolean(anchorElFilter);
  const openSortPopover = Boolean(anchorElSort);

  return (
    <Box sx={{ position: "relative", minHeight: "100vh" }}>
      {/* -- Your chores grid / content -- */}
      <ChoreList
        userData={userData}
        setUserData={setUserData}
        recurrenceList={recurrenceList}
        categoryList={categoryList}
        chores={filteredAndSortedChores}
      />

      <Box
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          display: "flex",
          flexDirection: "row",
          gap: 2,
        }}
      >
        {/* CREATE FAB */}
        <Fab
          color="primary"
          component={RouterLink}
          to="/Chores/create"
          aria-label="Create Chore"
        >
          <AddIcon />
        </Fab>

        <Fab
          color="primary"
          aria-label="Filter Chores"
          onClick={handleFilterClick}
        >
          <FilterIcon />
        </Fab>

        <Fab
          color="secondary"
          aria-label="Sort Chores"
          onClick={handleSortClick}
        >
          <SortIcon />
        </Fab>
      </Box>

      <Popover
        open={openFilterPopover}
        anchorEl={anchorElFilter}
        onClose={handleFilterClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        {/* Optional title */}
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
            Filter Chores
          </Typography>
          <FilterButton
            recurrenceList={recurrenceList}
            categoryList={categoryList}
            filterValues={filterValues}
            setFilterValues={setFilterValues}
          />
        </Box>
      </Popover>

      <Popover
        open={openSortPopover}
        anchorEl={anchorElSort}
        onClose={handleSortClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
            Sort Chores
          </Typography>
          <SortingButtons
            recurrenceList={recurrenceList}
            categoryList={categoryList}
            sortValue={sortValue}
            sortOrder={sortOrder}
            setSortValue={setSortValue}
            setSortOrder={setSortOrder}
          />
        </Box>
      </Popover>
    </Box>
  );
}
