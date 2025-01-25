import { Button, Input } from "@mui/material";
import { useState } from "react";

const AddInCheckList = ({ id }) => {
  const [Name, setName] = useState("");

  const handleAddChecklist = async () => {
    if (!Name.trim()) {
      alert("Please enter a checklist name.");
      return;
    }

    try {
      const response = await fetch(
        `https://api.trello.com/1/checklists?idCard=${id}&key=64c5013bf72bd59f0dc898487333530e&token=ATTA3220119c87da18a6bf18e6bd67a5dab42ff0a1451f506301cc67d751157d16554A112D9C&name=${Name}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to add checklist. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Checklist created successfully:", data);
      setName(""); // Clear input field
    } catch (error) {
      console.error("Error adding checklist:", error);
      alert("Failed to add checklist. Please try again.");
    }
  };

  return (
    <div>
      <Input
        value={Name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter checklist name"
      />
      <Button variant="contained"
      sx = {{
        ml:5,
        mt:2
      }}
      onClick={handleAddChecklist}>
        Add Checklist
      </Button>
    </div>
  );
};

export default AddInCheckList;
