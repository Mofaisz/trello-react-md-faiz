import { Box, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CheckItem from "./CheckItem";
import DeleteCheckCard from "./DeleteCheckCard";

const DisplayCheckList = ({ id }) => {
  const [checkList, setCheckList] = useState([]);

  useEffect(() => {
    async function getAllCheckList() {
      try {
        const response = await fetch(
            `https://api.trello.com/1/cards/${id}/checklists?key=64c5013bf72bd59f0dc898487333530e&token=ATTA3220119c87da18a6bf18e6bd67a5dab42ff0a1451f506301cc67d751157d16554A112D9C`
        );

        const data = await response.json();
        setCheckList(data);
      } catch (error) {
        console.log(error);
      }
    }

    getAllCheckList();
  }, [checkList]);

  return (
    <Box
      sx={{ padding: "16px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}
    >
      {checkList.length > 0 ? (
        checkList.map((singleCheckList) => (
          <Box
            key={singleCheckList.id}
            sx={{
              marginBottom: "16px",
              padding: "16px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#333" }}
              >
                {singleCheckList.name}
              </Typography>
              <DeleteCheckCard id={singleCheckList.id} />
            </Box>

            <Typography>
              <CheckItem id={singleCheckList.id} />
            </Typography>
          </Box>
        ))
      ) : (
        <Typography
          variant="body1"
          sx={{ textAlign: "center", color: "#777", marginTop: "16px" }}
        >
          No checklists available
        </Typography>
      )}
    </Box>
  );
};

export default DisplayCheckList;
