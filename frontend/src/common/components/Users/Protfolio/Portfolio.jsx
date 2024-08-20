import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import SweetAlert from "sweetalert2";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import "./Portfolio.css";
import PieChartComponent from "./PieChartComponent";

const determineRiskLevel = (answers) => {
  let riskScore = 0;

  Object.values(answers).forEach((answer) => {
    switch (answer) {
      case "A":
        riskScore += 1;
        break;
      case "B":
        riskScore += 2;
        break;
      case "C":
        riskScore += 3;
        break;
      default:
        break;
    }
  });

  if (riskScore <= 6) return "Low";
  if (riskScore <= 12) return "Medium";
  return "High";
};

const chooseStocksBasedOnRiskLevel = (riskLevel) => {
  const stocksByRiskLevel = {
    Low: ["IBM", "KO", "T", "WMT", "MCD", "CSCO", "PFE", "MRK"],
    Medium: [
      "AAPL",
      "MSFT",
      "GOOGL",
      "BRK.B",
      "UNH",
      "V",
      "JPM",
      "MA",
      "HD",
      "DIS",
      "PYPL",
      "CRM",
      "BA",
    ],
    High: ["AMZN", "TSLA", "META", "NVDA", "NFLX", "ADBE", "INTC", "BABA"],
  };

  return (stocksByRiskLevel[riskLevel] || [])
    .sort(() => 0.5 - Math.random())
    .slice(0, 5); // Shuffle and pick 5 stocks
};

const Portfolio = () => {
  const [hasPortfolio, setHasPortfolio] = useState(false);
  const [showInvestmentForm, setShowInvestmentForm] = useState(false);
  const [portfolioData, setPortfolioData] = useState([]);
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [userAnswers, setUserAnswers] = useState({});
  const [isPrimeUser, setIsPrimeUser] = useState(false);

  const fetchUserAnswers = useCallback(async (email) => {
    try {
      const response = await axios.get(
        "http://localhost:6500/backend/auth/getUserAnswers",
        {
          params: { email },
          withCredentials: true,
        }
      );
      if (response.data.answers) {
        setUserAnswers(response.data.answers);
        setShowInvestmentForm(true);
      } else {
        setShowInvestmentForm(false);
      }
    } catch (error) {
      console.error(
        "Error fetching user answers:",
        error.response?.data || error.message
      );
      setShowInvestmentForm(false);
    }
  }, []);

  const fetchPortfolio = useCallback(async (email) => {
    try {
      const response = await axios.get(
        "http://localhost:6500/backend/auth/getPortfolioDetails",
        {
          params: { email },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        if (response.data.portfolio) {
          setHasPortfolio(true);
          setPortfolioData(response.data.portfolio);
        } else {
          setHasPortfolio(false);
        }
      } else {
        setHasPortfolio(false);
      }
    } catch (error) {
      console.error(
        "Error fetching portfolio:",
        error.response?.data || error.message
      );
      setHasPortfolio(false);
    }
  }, []);

  const fetchUserEmail = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:6500/backend/auth/getUserEmail",
        {
          withCredentials: true,
        }
      );
      const email = response.data.email;
      setUserEmail(email);
      await fetchUserAnswers(email);
      await fetchPortfolio(email);

      // Fetch Prime status
      const userResponse = await axios.get(
        "http://localhost:6500/backend/auth/getUserPrimeStatus",
        {
          params: { email },
          withCredentials: true,
        }
      );
      setIsPrimeUser(userResponse.data.isPrime);
      setLoading(false);
    } catch (error) {
      console.error(
        "Error fetching user email:",
        error.response?.data || error.message
      );
      setLoading(false);
    }
  }, [fetchPortfolio, fetchUserAnswers]);

  const handleInvestmentSubmit = async (e) => {
    e.preventDefault();

    if (
      typeof userAnswers !== "object" ||
      Object.keys(userAnswers).length === 0
    ) {
      SweetAlert.fire("Error!", "Invalid answers format.", "error");
      console.error("Invalid answers format:", userAnswers);
      return;
    }

    try {
      const riskLevel = determineRiskLevel(userAnswers);
      const selectedStocks = chooseStocksBasedOnRiskLevel(riskLevel);

      // Convert investmentAmount to a number
      const investmentAmountNumber = parseFloat(investmentAmount);
      if (isNaN(investmentAmountNumber) || investmentAmountNumber <= 0) {
        SweetAlert.fire("Error!", "Invalid investment amount.", "error");
        console.error("Invalid investment amount:", investmentAmount);
        return;
      }

      const response = await axios.post(
        "http://localhost:6500/backend/auth/generatePortfolio",
        {
          email: userEmail,
          investmentAmount: investmentAmountNumber, // Ensure this is a number
          questionnaireAnswers: userAnswers,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        SweetAlert.fire(
          "Success!",
          "Your portfolio has been created!",
          "success"
        ).then(() => {
          setHasPortfolio(true);
          setPortfolioData(selectedStocks);
          window.location.reload(); // Reload the page
        });
      } else {
        throw new Error("Failed to create portfolio.");
      }
    } catch (error) {
      SweetAlert.fire("Error!", "Failed to create your portfolio.", "error");
      console.error(
        "Error creating portfolio:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchUserEmail();
  }, [fetchUserEmail]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="portfolio-container">
      {userAnswers && Object.keys(userAnswers).length === 0 ? (
        <div className="portfolio-message">
          <h1>Complete the Questionnaire!</h1>
          <p>
            To personalize your portfolio and access all features, please fill
            out the questionnaire.
          </p>
          <a href="/questionnaire" className="portfolio-button">
            Fill Out Questionnaire
          </a>
        </div>
      ) : hasPortfolio ? (
        <div className="portfolio-table-container">
          <TableContainer
            component={Paper}
            className="portfolio-table"
            style={{
              width: "80%",
              marginTop: "20px",
              marginBottom: "20px",
              overflowX: "auto",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Symbol</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Entry Price</TableCell>
                  <TableCell>Mark Price</TableCell>
                  <TableCell>PnL %</TableCell>
                  <TableCell>PnL $</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {portfolioData.map((stock, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{stock.symbol}</TableCell>
                    <TableCell>{stock.qnty}</TableCell>
                    <TableCell>
                      {typeof stock.entryPrice === "number"
                        ? stock.entryPrice.toFixed(2)
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      {typeof stock.markPrice === "number"
                        ? stock.markPrice.toFixed(2)
                        : "N/A"}
                    </TableCell>
                    <TableCell
                      style={{
                        color: isPrimeUser
                          ? stock.pnlPercentage >= 0
                            ? "green"
                            : "red"
                          : "black",
                      }}
                    >
                      {isPrimeUser
                        ? typeof stock.pnlPercentage === "number"
                          ? stock.pnlPercentage.toFixed(2)
                          : "N/A"
                        : "-"}
                      {isPrimeUser ? "%" : ""}
                    </TableCell>
                    <TableCell
                      style={{
                        color: isPrimeUser
                          ? stock.pnlDollar >= 0
                            ? "green"
                            : "red"
                          : "black",
                      }}
                    >
                      {isPrimeUser
                        ? typeof stock.pnlDollar === "number"
                          ? `$${stock.pnlDollar.toFixed(2)}`
                          : "N/A"
                        : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {!isPrimeUser && (
            <div className="pnl-info">
              *PnL feature available only for Prime users
            </div>
          )}
          <div className="pie-chart-container">
            <PieChartComponent data={portfolioData} />
          </div>
        </div>
      ) : showInvestmentForm ? (
        <div className="investment-form">
          <h2>Investment</h2>
          <form onSubmit={handleInvestmentSubmit}>
            <label>
              Investment Amount:
              <input
                type="number"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                placeholder="Enter your budget"
                required
              />
            </label>
            <button type="submit">Submit Investment</button>
          </form>
        </div>
      ) : (
        <div className="portfolio-message">
          <h1>Invest Now!</h1>
          <p>Complete the questionnaire to generate your portfolio.</p>
          <a href="/questionnaire" className="portfolio-button">
            Fill Out Questionnaire
          </a>
        </div>
      )}
    </div>
  );
};

export default Portfolio;