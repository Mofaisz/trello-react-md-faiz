import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function Progressbar(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="#99BFC4">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" value={props.value} />
      </Box>
    </Box>
  );
}

export default Progressbar;
