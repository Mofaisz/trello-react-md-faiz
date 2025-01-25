import { Box, Typography, Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import Progressbar from "./Progressbar";
import DeleteCheckList from "./DeleteCheckList";
import AddCheckItem from "./AddCheckItem";

const CheckItem = ({ id }) => {
  const [checkItems, setCheckItems] = useState([]);
  const [progress, setProgress] = useState(0);

  const calculateProgress = (items) => {
    const completed = items.filter((item) => item.state === "complete").length;
    const total = items.length;
    return total > 0 ? (completed / total) * 100 : 0;
  };

  useEffect(() => {
    async function getCheckItems() {
      try {
        const response = await fetch(
          `https://api.trello.com/1/checklists/${id}/checkItems?key=64c5013bf72bd59f0dc898487333530e&token=ATTA3220119c87da18a6bf18e6bd67a5dab42ff0a1451f506301cc67d751157d16554A112D9C`
        );
        const data = await response.json();
        setCheckItems(data);
        setProgress(calculateProgress(data));
      } catch (error) {
        console.error(error);
      }
    }
    getCheckItems();
  }, [id]);

  const handleToggle = (itemId) => {
    setCheckItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              state: item.state === "complete" ? "incomplete" : "complete",
            }
          : item
      )
    );
  };

  useEffect(() => {
    setProgress(calculateProgress(checkItems));
  }, [checkItems]);

  const addCheckItemCallback = (newCheckItem) => {
    setCheckItems((prevItems) => [...prevItems, newCheckItem]);
  };

  const removeCheckItemCallback = (itemId) => {
    setCheckItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  };

  return (
    <Box
      sx={{
        padding: "20px",
        backgroundColor: "#fafafa",
        borderRadius: "12px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Progress Bar Section */}
      <Box sx={{ marginBottom: "20px" }}>
        <Progressbar value={progress} />
      </Box>

      {/* Check Items List */}
      {checkItems.length > 0 ? (
        checkItems.map((item) => (
          <Box
            key={item.id}
            display="flex"
            alignItems="center"
            sx={{
              mb: 2,
              padding: "12px",
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <Checkbox
              checked={item.state === "complete"}
              onChange={() => handleToggle(item.id)}
              sx={{
                marginRight: "12px",
                color: item.state === "complete" ? "green" : "gray",
              }}
            />

            <Typography
              variant="body1"
              sx={{ flexGrow: 1, color: "#333", fontWeight: "500" }}
            >
              {item.name}
            </Typography>

            {/* Delete Button */}
            <DeleteCheckList
              id={id}
              keyid={item.id}
              removeCheckItemCallback={removeCheckItemCallback}
            />
          </Box>
        ))
      ) : (
        <Typography
          variant="body2"
          sx={{ color: "#777", textAlign: "center", fontStyle: "italic" }}
        >
          No check items available
        </Typography>
      )}

      <Box
        sx={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      >
        <AddCheckItem id={id} addCheckItemCallback={addCheckItemCallback} />
      </Box>
    </Box>
  );
};

export default CheckItem;
