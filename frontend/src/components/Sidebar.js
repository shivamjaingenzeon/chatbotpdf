import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useAppStore } from "./appStore";

const steps = [
  {
    label: "Step 1: Access the Chatbot",
    description: `Open your preferred web browser and navigate to our healthcare chatbot platform.`,
  },
  {
    label: "Step 2: Introduction and Privacy Assurance",
    description: `Read the introduction and special note 
    on privacy provided on the chatbot's landing page. Be assured that your data is 100% private, and no information will leave the chatbot's secure execution environment.`,
  },
  {
    label: "Step 3: Upload your PDF",
    description: `Prepare the healthcare-related PDF document you want to inquire about. It can be either a scanned document or a text-based file.
      Click on the "Upload PDF" button on the chatbot interface.
      Select the desired PDF from your device, and wait for the chatbot to process the document.
      `,
  },
  {
    label: "Step 4: Document Analysis",
    description: `Our private healthcare chatbot will analyze the uploaded PDF to understand its content and extract relevant medical information.`,
  },
  {
    label: "Step 5: Ask Your Questions",
    description: `Once the document analysis is complete, the chatbot will prompt you to ask specific questions or seek information related to the content of the PDF.
      Type your questions in plain English or natural language, and the chatbot will provide responses based on the extracted information and the power of Large Language Models (LLMs).
      `,
  },
  {
    label: "Step 6: Interact with the Chatbot",
    description: `Engage in a conversation with the chatbot to explore different aspects of the uploaded PDF and request further explanations or clarifications.`,
  },
  {
    label: "Step 7: Receive Personalized Responses",
    description: `Our healthcare chatbot uses LLMs to generate personalized and contextually relevant responses tailored to your inquiries.`,
  },
  {
    label: "Step 8: On-Device Processing",
    description: `Rest assured that all interactions with the chatbot and document processing occur directly on your device or within your controlled infrastructure. Your data remains private and secure.`,
  },
  {
    label: "Step 9: End the Session",
    description: `Once you have received the information you need, you can choose to end the chatbot session or continue exploring other aspects of the document.`,
  },
  {
    label: "Step 10: Feedback and Support",
    description: `We value your feedback. Let us know about your experience with the chatbot and any suggestions for improvement.
    If you encounter any issues or need technical assistance, feel free to reach out to our support team for help.
    `,
  },
];

export default function SideBar() {
  const updateOpen = useAppStore((state) => state.updateOpen);
  const dopen = useAppStore((state) => state.dopen);

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === steps.length - 1) {
      updateOpen(!dopen);
      setActiveStep(0);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ overflowWrap: "break-word" }} marginLeft={3}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 9 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography style={{ lineBreak: "true" }}>
                {step.description}
              </Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 1 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
