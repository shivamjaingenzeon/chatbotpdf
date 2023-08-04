import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid"; // Import Grid component
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import * as React from "react";

import first from "../images/first.png";
import personalizedIcon from "../images/icons/personalized.png"; // Import the privacy.png icon
import privacyIcon from "../images/icons/privacy.png"; // Import the privacy.png icon
import processIcon from "../images/icons/process.png"; // Import the privacy.png icon
import protectionIcon from "../images/icons/protection.png"; // Import the privacy.png icon
import securityIcon from "../images/icons/security.png"; // Import the privacy.png icon
import second from "../images/second.png";
import Navbar2 from "./Navbar2";

import "../css/AboutUs.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const aboutUsData = [
  {
    id: 1,
    highlight: "Private GPT",
    icon: privacyIcon, // Use the imported privacy.png icon here
    description:
      "We utilize a private version of GPT (Generative Pre-trained Transformer) for the chatbot. This ensures that all interactions and data processing occur within a secure and isolated execution environment.",
  },
  {
    id: 2,
    highlight: "User Data Security",
    icon: securityIcon, // Use the imported privacy.png icon here
    description:
      "We understand the sensitive nature of healthcare data. Rest assured that no user data, including the uploaded PDFs, will leave our execution environment at any point. Your data remains private and confidential.",
  },
  {
    id: 3,
    highlight: "On-Device Processing",
    icon: processIcon, // Use the imported privacy.png icon here
    description:
      "All processing, including document analysis and response generation, takes place directly on your device or within your controlled infrastructure. No data is transmitted externally, providing an added layer of privacy and control.",
  },
  {
    id: 4,
    highlight: "Personalized Responses",
    icon: personalizedIcon, // Use the imported privacy.png icon here
    description:
      "Our chatbot leverages the power of LLMs to provide tailored responses based on the content of the uploaded PDFs. It can comprehend complex medical information, making the interactions more relevant and informative.",
  },
  {
    id: 5,
    highlight: "Security Measures",
    icon: protectionIcon, // Use the imported privacy.png icon here
    description:
      "We have implemented robust security measures to safeguard against potential threats, ensuring a safe and trusted environment for our users.",
  },
];
export default function AboutUs() {
  return (
    <>
      <Navbar2 />
      <div className="container">
        <Box sx={{ width: "100%", marginTop: "100px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <img
                src={first}
                alt="Advocacy Healthcare Chatbot"
                style={{ height: "500px", width: "85%" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <div>
                <h2 className="aboutustitle">Advocacy Healthcare Chatbot</h2>
                <Typography>
                  <div>
                    <p className="para1">
                      We are excited to introduce our healthcare chatbot powered
                      by Generative AI and Large Language Models (LLMs). Our
                      chatbot aims to provide personalized and accurate
                      responses to users' queries, allowing them to upload PDF
                      documents (scanned or text) and receive relevant
                      information in return.
                    </p>
                  </div>
                </Typography>
              </div>
            </Grid>
          </Grid>

          <div className="about-us-data">
            <h2
              className="aboutustitle"
              style={{
                background: "linear-gradient(to right, #64B5F6, #1976D2)",
                padding: "10px",
                color: "#fff",
              }}
            >
              Why Choose Us
            </h2>
            <div className="cards">
              <Grid container spacing={2}>
                {aboutUsData.map((item) => (
                  <Grid key={item.id} item xs={12} sm={6}>
                    <Paper style={{ padding: "20px" }} elevation={3}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <img
                          src={item.icon}
                          alt="Icon"
                          style={{ width: "30px", marginRight: "10px" }}
                        />
                        <h3 style={{ color: "#1976D2" }}>{item.highlight}</h3>
                      </div>
                      <Typography>{item.description}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <img
                src={second}
                alt="Our Commitment"
                style={{ height: "400px", width: "85%" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <div>
                <h2
                  className="aboutustitle"
                  style={{
                    background: "linear-gradient(to right, #64B5F6, #1976D2)",
                    padding: "10px",
                    color: "#fff",
                  }}
                >
                  Our Commitment
                </h2>
                <Typography>
                  <div>
                    <p className="para1">
                      We are committed to delivering a healthcare chatbot that
                      prioritizes user privacy while providing valuable medical
                      insights. If you have any questions or concerns about our
                      privacy practices or the functioning of our chatbot,
                      please do not hesitate to reach out to our team. Your
                      trust is essential to us, and we are dedicated to
                      maintaining the confidentiality and security of your data.
                    </p>
                  </div>
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}
