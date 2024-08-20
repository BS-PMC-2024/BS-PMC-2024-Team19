import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Paper, Box, Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Questionnaire.css";

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
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          "http://localhost:6500/backend/auth/getQuestions"
        );
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error: ${response.status} - ${errorText}`);
        }
        const data = await response.json();
        setQuestions(data.questions); // Ensure `questions` array structure
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred while fetching the questions. Please try again.",
        });
      }
    };

    fetchQuestions();
  }, []);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleSelect = (option) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: getAnswerLetter(currentQuestion, option),
    }));
  };

  const getAnswerLetter = (questionIndex, answer) => {
    const answerMapping = ["A", "B", "C"];
    const answerIndex = questions[questionIndex].options.indexOf(answer);
    return answerMapping[answerIndex];
  };

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      try {
        const mappedAnswers = questions.reduce((acc, _, index) => {
          acc[`Q${index + 1}`] = answers[index];
          return acc;
        }, {});

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

  if (loading) {
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgressWithLabel value={100} />
      </Container>
    );
  }

  if (questions.length === 0) {
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" color="textSecondary">
          No questions available.
        </Typography>
      </Container>
    );
  }

  const current = questions[currentQuestion];

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
            fontSize: "4rem",
          }}
        >
          <CircularProgressWithLabel value={progress} />
        </Box>
        {current.questionText
          ? current.questionText
          : "Question text not available."}
      </Typography>

      <Box sx={{ marginBottom: "2rem" }}>
        {current.options.map((option, index) => (
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
            color="primary"
            onClick={handleBack}
            disabled={currentQuestion === 0}
          >
            Back
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleNext}>
            {currentQuestion < questions.length - 1 ? "Next" : "Submit"}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Questionnaire;
