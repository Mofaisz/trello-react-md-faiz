import React, { useState } from 'react'
import { Box, Dialog, Card, CardContent, Typography } from "@mui/material"
import PopUpCard from './PopUpCard';

const CreateNewBoard = () => {
  const [openPopUp, setOpenPopUp] = useState(false);

  const handleOpenPopUp = () => {
    setOpenPopUp(true);
  };

  const handleClosePopUp = () => {
    setOpenPopUp(false);
  };

  return (
    <>
      <Box>
        <Card
          onClick={handleOpenPopUp}
          sx={{
            padding: 2,
            cursor: "pointer",
            width: 200,
            height: 100,
            backgroundColor: "grey",
            display: "flex",
            justifyContent: "left",
            position: "relative",
          }}
        >
          <CardContent>
            <Typography sx={{ color: "white", position: "absolute" }}>
              Create New Board +
            </Typography>
          </CardContent>
        </Card>
        <Dialog open={openPopUp} onClose={handleClosePopUp}>
          <PopUpCard handleClosePopUp={handleClosePopUp} /> {/* Pass handleClosePopUp here */}
        </Dialog>
      </Box>
    </>
  );
};

export default CreateNewBoard;
