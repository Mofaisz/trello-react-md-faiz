import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import { IconButton } from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";
import AddListDetail from "./AddListDetail";
import AddCard from "./AddCard";

const BoardDetail = () => {
  const { id } = useParams();
  const [allList, setAllList] = useState([]);
  const [boardData, setBoardData] = useState(null);

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await fetch(
          `https://api.trello.com/1/boards/${id}?key=64c5013bf72bd59f0dc898487333530e&token=ATTA3220119c87da18a6bf18e6bd67a5dab42ff0a1451f506301cc67d751157d16554A112D9C`
        );
        const data = await response.json();
        setBoardData(data);
      } catch (err) {
        throw new Error("Error fetching board data:", err);
      }
    };

    fetchBoardData();
  }, [id]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await fetch(
          `https://api.trello.com/1/boards/${id}/lists/?key=64c5013bf72bd59f0dc898487333530e&token=ATTA3220119c87da18a6bf18e6bd67a5dab42ff0a1451f506301cc67d751157d16554A112D9C`
        );
        const data = await response.json();
        setAllList(data);
      } catch (err) {
        "Error fetching List:", err;
      }
    };

    fetchLists();
  }, [id]);

  const archiveList = async (listId) => {
    try {
      await fetch(
        `https://api.trello.com/1/lists/${listId}/closed?value=true&key=64c5013bf72bd59f0dc898487333530e&token=ATTA3220119c87da18a6bf18e6bd67a5dab42ff0a1451f506301cc67d751157d16554A112D9C`,
        {
          method: "PUT",
        }
      );

      // Remove the archived list from the UI
      setAllList((prevLists) => prevLists.filter((list) => list.id !== listId));
    } catch (err) {
      throw new Error(`Error archiving the list: `, err);

    }
  };

  const addNewList = (newList) => {
    setAllList((prevLists) => [...prevLists, newList]); // Add the newly created list to the state
  };

  if (!boardData) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Loading...
        </Typography>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <Box
        sx={{
          minHeight: "100vh",
          padding: 4,
          overflowX: "scroll",
          backgroundImage: `url("https://images.unsplash.com/photo-1737044280473-06976eb5fda5?ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNzM3NDMyNjE1fA&ixlib=rb-4.0.3&w=2560&h=2048&q=90")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 3, color: "white " }}>
          {boardData.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            overflow: "scroll",
            scrollbarWidth: "none",
            justifyContent: "left",
            alignItems: "flex-start",
          }}
        >
          {allList.map((singleList) => (
            <Card
              key={singleList.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                marginRight: 2,
                marginBottom: 2,
                padding: 2,
                minWidth: 250,
                borderRadius: 6,
                backgroundColor: "#ebf3f1",
                position: "relative",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ marginLeft: -2, fontWeight: "bold" }}
                >
                  {singleList.name}
                </Typography>
                <IconButton
                  sx={{
                    // transform: "rotate(90deg)",
                    marginLeft: "auto",
                    cursor: "pointer",
                  }}
                  onClick={() => archiveList(singleList.id)}
                >
                  <ArchiveIcon />
                </IconButton>
              </CardContent>
              <AddCard id={singleList.id} />
            </Card>
          ))}
          <AddListDetail addNewListCallback={addNewList} />
        </Box>
      </Box>
    </div>
  );
};

export default BoardDetail;
