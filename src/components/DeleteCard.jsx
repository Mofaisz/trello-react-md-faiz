import { Box, Dialog, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteCard from "./DeleteCard";
import CardList from "./CardList";

const DisplayCard = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const handleOpen = (cardId) => {
    setSelectedCardId(cardId);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const displayCards = async () => {
      try {
        const response = await fetch(
          `https://api.trello.com/1/lists/${id}/cards?key=64c5013bf72bd59f0dc898487333530e&token=ATTA3220119c87da18a6bf18e6bd67a5dab42ff0a1451f506301cc67d751157d16554A112D9C`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCards(data);
      } catch (error) {
        throw new Error("Error fetching cards:", error);
      }
    };

    displayCards();
  }, []);

  return (
    <>
      <Box>
        {cards.length > 0 ? (
          cards.map((card) => (
            <Typography
              onClick={() => handleOpen(card.id)}
              sx={{ display: "flex", justifyContent: "space-between" }}
              key={card.id}
              variant="h4"
            >
              {card.name}

              {card.name && <DeleteCard id={card.id} />}
            </Typography>
          ))
        ) : (
          <Typography>No cards available</Typography>
        )}
      </Box>

      <Dialog open={open} onClose={handleClose} sx={{ minWidth: "xl" }}>
        {selectedCardId && <CardList id={selectedCardId} />}{" "}
      </Dialog>
    </>
  );
};

export default DisplayCard;
