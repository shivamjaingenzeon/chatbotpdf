import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import * as React from "react";

export default function QuestionBox() {
  return (
    <Box
      marginTop={15}
      sx={{
        display: "flex",
        "& > :not(style)": {
          m: 1,
          width: 400,
        },
      }}
    >
      <Paper variant="outlined">
        <Typography margin={1}>Enter Your Question :</Typography>
        <Box margin={1}>
          <TextField
            id="outlined-basic"
            label="Type here"
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box margin={1}>
          <Button variant="contained">Submit</Button>
        </Box>
      </Paper>
    </Box>
  );
}
