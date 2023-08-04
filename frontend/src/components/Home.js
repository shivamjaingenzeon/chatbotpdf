import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { useState } from "react";
import Tour from "reactour";
import FAQ from "./FAQ";
import FileUploader from "./FileUploader";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Phone from "./Phone";
import Sidenav from "./Sidenav";
import { useAppStore } from "./appStore";

const Home = () => {
  const open = useAppStore((state) => state.dopen);
  const isTourCompleted = localStorage.getItem("tourCompleted");
  const [isTourOpen, setIsTourOpen] = useState(
    Boolean(isTourCompleted) ? false : true
  );

  const handleTourClose = () => {
    setIsTourOpen(false);
    localStorage.setItem("tourCompleted", "true");
  };

  const steps = [
    {
      selector: ".step-1",
      content: " Upload your PDF!",
    },
    {
      selector: ".step-2",
      content: "Ask your question here!",
    },
    {
      selector: ".step-3",
      content: "Refer FAQs and Previously asked questions (History)!",
    },
  ];

  return (
    <div>
      <Tour
        isOpen={isTourOpen}
        onRequestClose={handleTourClose}
        steps={steps} // Pass the steps array as the `steps` prop
      />

      <Stack spacing={1.5}>
        <Box marginBottom={8}>
          <Navbar />
        </Box>

        <Stack direction="row" spacing={2}>
          <Sidenav />
          <Stack>
            <Box width={open ? 400 : 600} className="step-1">
              <FileUploader />
            </Box>
            <Box width={open ? 400 : 600} className="step-3" marginBottom={7}>
              <FAQ />
            </Box>
          </Stack>
          <Box width={open ? 480 : 580} className="step-2">
            <Phone />
          </Box>
        </Stack>
        <Box>
          <Footer />
        </Box>
      </Stack>
    </div>
  );
};

export default Home;
