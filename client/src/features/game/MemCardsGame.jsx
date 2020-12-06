import { useCallback, useEffect, useState } from "react";
import MemCard from "./MemCard";
import errorHandler from "../utils/errorHandler";
import requester from "../utils/requester";
import { Button, Col, Progress, Row } from "antd";
import Title from "antd/lib/typography/Title";
import { RightCircleOutlined } from "@ant-design/icons";

// get numbers from server
const getNumbers = (amount, cb) => {
  requester
    .get(`rand/${amount}`)
    .then((numbers) => cb(numbers))
    .catch(errorHandler);
  return cb;
};

// calculate a score depending on card statuses
const calculateScore = (cards) => {
  const amountTotal = cards.length;
  let score = 0;
  let amountCorrect = 0;
  for (const card of cards) {
    if (card.status === "correct") {
      amountCorrect += 1;
    }
  }

  // If full correct add 100 points
  if (amountCorrect === amountTotal) {
    score += 100;
  } else if (amountCorrect > 0) {
    // If something correct exponentially shrink 100 points depending on amount wrong
    score += Math.floor(100 / 2 ** (amountTotal - amountCorrect));
  }

  return score;
};

const MemCardsGame = ({ cardCount, rounds: maxRound, seconds, onFinish }) => {
  const [cards, setCards] = useState([]);
  const [progress, setProgress] = useState(100);
  const [hasStarted, setHasStarted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);

  // Setup
  useEffect(() => {
    getNumbers(cardCount, (numbers) => {
      setCards(
        numbers.map((num) => ({
          value: num,
          flipped: true,
          clickable: false,
          status: null,
        }))
      );
      const newAnswers = [...numbers].sort((a, b) => a - b);
      setAnswers(newAnswers);
    });
  }, [cardCount]);

  // Timer
  useEffect(() => {
    if (hasStarted) {
      if (progress === 0) {
        // flip cards and make clickable
        setCards((cards) =>
          cards.map(({ flipped, clickable, ...props }) => ({
            flipped: true,
            clickable: true,
            ...props,
          }))
        );
      } else {
        setTimeout(() => {
          setProgress(progress - Math.floor(100 / seconds));
        }, 1000);
      }
    }
  }, [progress, hasStarted, seconds]);

  const start = useCallback(() => {
    if (hasStarted === false) {
      setHasStarted(true);
      setCards(
        cards.map(({ flipped, clickable, ...props }) => ({
          flipped: false,
          clickable: false,
          ...props,
        }))
      );
    }
  }, [cards, hasStarted]);

  const finish = () => {
    // Set back to initial values
    setHasStarted(false);
    setProgress(100);
    setRound(1);
    getNumbers(cardCount, (numbers) => {
      setCards(
        numbers.map((num) => ({
          value: num,
          flipped: true,
          clickable: false,
          status: null,
        }))
      );

      const newAnswers = [...numbers].sort((a, b) => a - b);
      setAnswers(newAnswers);

      const currentScore = score + calculateScore(cards);
      setScore(0);
      // After reset complete finish with latest score added
      onFinish(currentScore);
    });
  };

  const newRound = () => {
    setRound(round + 1);

    setScore((score) => score + calculateScore(cards));

    // Reset if not finished
    getNumbers(cardCount, (numbers) => {
      setCards(
        numbers.map((num) => ({
          value: num,
          clickable: false,
          flipped: false,
          status: null,
        }))
      );

      setProgress(100);
      const newAnswers = [...numbers].sort((a, b) => a - b);
      setAnswers(newAnswers);
    });
  };

  const handleCardClick = (value) => {
    const answersClone = [...answers];
    const firstAnswer = answersClone.shift();

    let status;
    if (firstAnswer === value) {
      status = "correct";
    } else {
      status = "wrong";
    }

    // New round if wrong or all answers were correct
    if (status === "wrong" || answersClone.length === 0) {
      const newCards = cards.map((card) => {
        if (card.value === value) {
          card.status = status;
        }
        card.clickable = false;
        card.flipped = false;
        return card;
      });
      setCards(newCards);

      if (round === maxRound) {
        finish();
      } else {
        setTimeout(() => {
          newRound();
        }, 3000);
      }
    } else {
      const newCards = cards.map((card) => {
        if (card.value === value) {
          card.status = status;
          card.clickable = false;
        }
        return card;
      });
      setCards(newCards);
      // Save shifted answers
      setAnswers(answersClone);
    }
  };

  const titleStyle = { paddingBottom: "20px", paddingTop: "20px" };

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <Progress
        strokeColor={{
          "0%": "#108ee9",
          "100%": "#87d068",
        }}
        showInfo={false}
        percent={progress}
      />
      <Row>
        <Col span={16}>
          <Title style={titleStyle}>
            Remember the numbers and select from Small to Big{" "}
          </Title>
        </Col>
        <Col span={8}>
          <Title style={titleStyle}>Score: {score}</Title>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ margin: "0px", padding: "20px" }}>
        {cards.map((card, i) => (
          <Col key={i} span={24 / cardCount}>
            <MemCard card={card} onClick={handleCardClick} />
          </Col>
        ))}
      </Row>
      {hasStarted === false && (
        <Button
          block
          style={{ height: "50px" }}
          onClick={start}
          icon={<RightCircleOutlined />}
          type="primary"
          size="large"
        >
          Start
        </Button>
      )}
    </div>
  );
};

export default MemCardsGame;
