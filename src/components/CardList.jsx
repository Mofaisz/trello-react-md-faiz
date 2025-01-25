import { Box, Typography } from "@mui/material";
import AddInCheckList from "./AddInCheckList";
import DisplayInCheckList from "./DisplayInCheckList";

const CardList = ({ id }) => {
  console.log("card", id);

  return (
    <>
      <Typography
        sx={{
          display: "flex",
          ml: 3,
          fontSize: "1.3rem",
          fontWeight: "700",
          color: "#333",
          letterSpacing: "0.5px",
          fontFamily: "sans-serif",
          alignItems: "center",
          marginBottom: "20px",
          justifyContent: "center",
          mt: 3,
        }}
      >
        ADD CARDS
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "start",
          width: "auto",
          p: 7,
          height: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            padding: "20px",
            backgroundColor: "#f4f4f4",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            sx={{
              width: 300,
              backgroundColor: "white",
              padding: "16px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <DisplayInCheckList id={id} />
          </Box>

          <Box
            sx={{
              height: "auto",
              padding: "16px",
              marginLeft: "20px",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <AddInCheckList id={id} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CardList;
