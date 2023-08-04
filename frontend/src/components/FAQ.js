import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { Box } from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useAppStore } from "./appStore";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
  borderRadius: 5,
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(1),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions() {
  const questionList = useAppStore((state) => state.questionList);

  const [expanded1, setExpanded1] = React.useState();
  const [expanded2, setExpanded2] = React.useState();

  const handleChange1 = (panel) => (event, newExpanded) => {
    setExpanded1(newExpanded ? panel : false);
  };

  const handleChange2 = (panel) => (event, newExpanded) => {
    setExpanded2(newExpanded ? panel : false);
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        marginTop: 2,
        maxWidth: 700,
      }}
      style={{ fontFamily: "Titillium Web" }}
    >
      <Accordion
        expanded={expanded1 === "panel1"}
        onChange={handleChange1("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <div>Frequently Asked Questions</div>
        </AccordionSummary>
        {questionList.map((data, index) => (
          <AccordionDetails>
            <Accordion
              expanded={expanded2 === "panel" + index}
              onChange={handleChange2("panel" + index)}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <div>{data.question}</div>
              </AccordionSummary>
              <AccordionDetails>
                <div>{data.answer}</div>
              </AccordionDetails>
            </Accordion>
          </AccordionDetails>
        ))}
      </Accordion>

      {/* <Accordion
        expanded={expanded1 === "panel2"}
        onChange={handleChange1("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <div>Previously Asked Questions (History)</div>
        </AccordionSummary>
        <AccordionDetails>
          <Accordion
            expanded={expanded2 === "panel1"}
            onChange={handleChange2("panel1")}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <div>What is react?</div>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                ReactJS is an open-source JavaScript library used to create user
                interfaces in a declarative and efficient way. It is a
                component-based front-end library responsible only for the view
                layer of a Model View Controller(MVC) architecture. React is
                used to create modular user interfaces and promotes the
                development of reusable UI components that display dynamic data.
              </div>
            </AccordionDetails>
          </Accordion>
        </AccordionDetails>
      </Accordion> */}
    </Box>
  );
}
