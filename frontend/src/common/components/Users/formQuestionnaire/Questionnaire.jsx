import React, { useState } from "react";
import { Container, Typography, Button, Paper, Box, Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import sections from "../../../../constants/data";
import Swal from "sweetalert2";
import "./Questionnaire.css";

const { questions } = sections;

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          color="text.secondary"
          sx={{ fontWeight: "bold" }}
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

const Questionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  // Calculate progress as a percentage
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const getAnswerLetter = (questionIndex, answer) => {
    const answerMapping = ["A", "B", "C"];
    const answerIndex = questions[questionIndex].options.indexOf(answer);
    return answerMapping[answerIndex];
  };

  const handleSelect = (answer) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: getAnswerLetter(currentQuestion, answer),
    }));
  };

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      try {
        const mappedAnswers = {
          Q1: answers[0],
          Q2: answers[1],
          Q3: answers[2],
          Q4: answers[3],
          Q5: answers[4],
          Q6: answers[5],
          Q7: answers[6],
          Q8: answers[7],
          Q9: answers[8],
          Q10: answers[9],
        };

        const response = await fetch(
          "http://localhost:6500/backend/auth/submit-questionnaire",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ answers: mappedAnswers }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log("Response from server:", data);

        Swal.fire({
          icon: "success",
          title: "Success!",
          html: `<span style="font-size: 15px;">The form has been sent!</span>`,
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "swal2-confirm-custom", // Add a custom class to the confirm button
          },
        }).then(() => {
          navigate("/portfolio");
        });
      } catch (error) {
        console.error("Error submitting questionnaire:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred while submitting the questionnaire. Please try again.",
        });
      }
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  return (
    <Container
      maxWidth="sm"
      component={Paper}
      className="questionnaire-container"
      sx={{
        padding: "10rem 2rem",
        marginTop: "2rem",
        marginBottom: "4rem",
        minHeight: "calc(100vh - 100px)",
      }}
    >
      <Typography
        variant="h1"
        align="center"
        gutterBottom
        className="questionnaire-label"
        sx={{
          fontSize: "4.5rem",
          color: "var(--clr-robin-blue)",
          fontWeight: "bold",
        }}
      >
        Questionnaire
      </Typography>
      <Box
        sx={{
          borderBottom: "4px solid var(--clr-robin-blue)",
          width: "150px",
          margin: "0 auto 1rem",
        }}
      />
      <Typography
        variant="h6"
        align="center"
        gutterBottom
        sx={{
          fontSize: "1.6rem",
          color: "#757575",
          marginBottom: "4rem",
        }}
      >
        Help Us Craft the Ultimate Investment Portfolio Just for You!
      </Typography>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontSize: "2.2rem",
          color: "#757575",
          fontWeight: "bold",
          marginBottom: "2rem",
          whiteSpace: "pre-wrap",
          overflowWrap: "break-word",
        }}
      >
        {/* Progress Indicator */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "2rem",
            fontSize: "4rm",
          }}
        >
          <CircularProgressWithLabel value={progress} />
        </Box>
        {questions[currentQuestion].question}
      </Typography>
      <Box sx={{ marginBottom: "2rem" }}>
        {questions[currentQuestion].options.map((option, index) => (
          <Button
            key={index}
            variant={
              answers[currentQuestion] ===
              getAnswerLetter(currentQuestion, option)
                ? "contained"
                : "outlined"
            }
            onClick={() => handleSelect(option)}
            fullWidth
            sx={{
              marginBottom: "1rem",
              textTransform: "none",
              fontSize: "1.5rem",
              backgroundColor:
                answers[currentQuestion] ===
                getAnswerLetter(currentQuestion, option)
                  ? "var(--clr-black)"
                  : "inherit",
              color:
                answers[currentQuestion] ===
                getAnswerLetter(currentQuestion, option)
                  ? "#fff"
                  : "inherit",
              "&:hover": {
                backgroundColor:
                  answers[currentQuestion] ===
                  getAnswerLetter(currentQuestion, option)
                    ? "var(--clr-black)"
                    : "rgba(0, 0, 0, 0.08)",
              },
            }}
          >
            {option}
          </Button>
        ))}
      </Box>
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item>
          <Button
            variant="outlined"
            onClick={handleBack}
            disabled={currentQuestion === 0}
            sx={{
              fontWeight: "bold",
              fontSize: "1.3rem",
            }}
          >
            Back
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={!answers[currentQuestion]}
            sx={{
              fontWeight: "bold",
              fontSize: "1.3rem",
            }}
          >
            {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Questionnaire;
