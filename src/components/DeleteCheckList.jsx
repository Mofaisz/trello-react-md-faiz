import ClearIcon from "@mui/icons-material/Clear";
import { Box } from "@mui/material";

const DeleteCheckList = ({ id, keyid, removeCheckItemCallback }) => {
  const handleDelete = async (event) => {
    event.stopPropagation();
    try {
      const response = await fetch(
        `https://api.trello.com/1/checklists/${id}/checkItems/${keyid}?key=64c5013bf72bd59f0dc898487333530e&token=ATTA3220119c87da18a6bf18e6bd67a5dab42ff0a1451f506301cc67d751157d16554A112D9C`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to delete item with ID: ${keyid}`);
      }
      console.log(`Item with ID: ${keyid} deleted successfully`);
      removeCheckItemCallback(keyid);
    } catch (error) {
      console.log("Error deleting item:", error);
    }
  };

  return (
    <Box>
      <ClearIcon onClick={handleDelete} sx={{ cursor: "pointer" }} />
    </Box>
  );
};

export default DeleteCheckList;
