import { Box, Dialog, Typography, Input, Button } from "@mui/material";
import { useEffect, useState } from "react";
import CardList from "./CardList";
import DeleteIcon from "@mui/icons-material/Delete";
import ChecklistIcon from "@mui/icons-material/Checklist";

const AddCard = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [cards, setCards] = useState([]);
  const [cardName, setCardName] = useState("");
  const [isDisplayCardOpen, setIsDisplayCardOpen] = useState(false);

  const handleOpenDisplayCard = (cardId) => {
    setSelectedCardId(cardId);
    setIsDisplayCardOpen(true);
  };

  const handleCloseDisplayCard = () => {
    setIsDisplayCardOpen(false);
  };

  const handleOpen = (cardId) => {
    setSelectedCardId(cardId);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleAddCard = async () => {
    if (cardName.trim()) {
      try {
        const response = await fetch(
          `https://api.trello.com/1/cards?idList=${id}&name=${cardName}&key=64c5013bf72bd59f0dc898487333530e&token=ATTA3220119c87da18a6bf18e6bd67a5dab42ff0a1451f506301cc67d751157d16554A112D9C`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const newCard = await response.json();
          setCards((prev) => [...prev, newCard]);
          setCardName("");
        }
      } catch (error) {
        console.error("Error adding card:", error);
      }
    }
  };

  const handleDeleteCard = async (cardId) => {
    try {
      const response = await fetch(
        `https://api.trello.com/1/cards/${cardId}?key=64c5013bf72bd59f0dc898487333530e&token=ATTA3220119c87da18a6bf18e6bd67a5dab42ff0a1451f506301cc67d751157d16554A112D9C`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the card.");
      }

      setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));

      console.log("Card deleted successfully!");
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  useEffect(() => {
    const displayCards = async () => {
      try {
        const response = await fetch(
          `https://api.trello.com/1/lists/${id}/cards?key=64c5013bf72bd59f0dc898487333530e&token=ATTA3220119c87da18a6bf18e6bd67a5dab42ff0a1451f506301cc67d751157d16554A112D9C`
        );

        if (!response.ok) {
          console.error("Error fetching cards");
        }

        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    displayCards();
  }, [id]);

  return (
    <>
      <Box>
        {cards.length > 0 ? (
          cards.map((card) => (
            <Typography
              onClick={() => handleOpen(card.id)}
              sx={{
                display: "flex",
                cursor: "pointer",
                marginBottom: "8px",
                padding: "8px",
                backgroundColor: "#e1e1e1",
                borderRadius: "4px",
                justifyContent: "space-between",
                position: "relative",
              }}
              key={card.id}
              variant="h7"
            >
              {card.name}
              <ChecklistIcon
                sx={{
                  position: "absolute",
                  right: 40,
                }}
                onClick={() => handleOpenDisplayCard(card.id)}
              />

              <DeleteIcon
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleDeleteCard(card.id);
                }}
                sx={{
                  width: "18px",
                }}
              />
            </Typography>
          ))
        ) : (
          <Typography>No cards available</Typography>
        )}
      </Box>

      {/* {isDisplayCardOpen && (
  <Dialog open={isDisplayCardOpen} onClose={handleCloseDisplayCard}>
    <DisplayCard id={selectedCardId} />
  </Dialog>
)} */}

      <Dialog open={open} onClose={handleClose} sx={{ minWidth: "xl" }}>
        {selectedCardId && <CardList id={selectedCardId} />}
      </Dialog>

      <form>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            border: "1px solid grey",
            borderRadius: "8px",
            backgroundColor: "rgb(64 90 163 / 12%)",
            padding: "10px",
            gap: "8px",
          }}
        >
          <Input
            sx={{
              border: "none",
              outline: "none",
              // width: "100%",
              padding: "8px",
              fontSize: "16px",
              borderRadius: "4px",
              backgroundColor: "white",
              color: "#333",
            }}
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="Add a new card..."
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              width: "100%",
              cursor: "pointer",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddCard}
              disabled={!cardName.trim()}
            >
              Add
            </Button>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default AddCard;
