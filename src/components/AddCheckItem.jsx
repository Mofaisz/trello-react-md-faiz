import { Box, Button, Input } from "@mui/material";
import { useState } from "react";

const AddCheckItem = ({ id, addCheckItemCallback }) => {
  const [name, setName] = useState("");

  const addCheckItem = async () => {
    try {
      const response = await fetch(
        `https://api.trello.com/1/checklists/${id}/checkItems?name=${name}&key=64c5013bf72bd59f0dc898487333530e&token=ATTA3220119c87da18a6bf18e6bd67a5dab42ff0a1451f506301cc67d751157d16554A112D9C`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const newCheckItem = await response.json();
        addCheckItemCallback(newCheckItem); // Pass new check item to parent for state update
        setName(""); // Clear input field after adding the item
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <Button onClick={addCheckItem}>Add CheckItem</Button>
    </Box>
  );
};

export default AddCheckItem;
