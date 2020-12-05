import { useCallback, useEffect, useState } from "react";
import MemCard from "./MemCard";
import errorHandler from "../utils/errorHandler";
import requester from "../utils/requester";
import { Button, Col, Progress, Row } from "antd";
import Title from "antd/lib/typography/Title";
import { RightCircleOutlined } from "@ant-design/icons";

const getNumbers = (amount, cb) => {
  requester
    .get(`rand/${amount}`)
    .then((numbers) => cb(numbers))
    .catch(errorHandler);
  return cb;
};

const MemCardsGame = ({ amount, rounds: maxRound, seconds, onFinish }) => {
  const [cards, setCards] = useState([]);
  const [progress, setProgress] = useState(100);
  const [hasStarted, setHasStarted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [round, setRound] = useState(1);
  const [results, setResults] = useState([]);

  // Setup
  useEffect(() => {
    getNumbers(amount, (numbers) => {
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
  }, [amount]);

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

  const newRound = () => {
    setRound(round + 1);

    // Add statuses to results
    setResults((result) => {
      result.push(cards.map((card) => card.status));
      return result;
    });

    if (round === maxRound) {
      // Set back to initial values
      setProgress(100);
      setHasStarted(false);
      setRound(1);
      setResults([]);
      getNumbers(amount, (numbers) => {
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
      onFinish(results);
    } else {
      // Reset if not finished
      getNumbers(amount, (numbers) => {
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
    }
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

    console.log(firstAnswer, value, answersClone, answers);
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
      setTimeout(() => {
        newRound();
      }, 3000);
    } else {
      const newCards = cards.map((card) => {
        if (card.value === value) {
          card.status = status;
          card.clickable = false;
        }
        return card;
      });
      setCards(newCards);
    }

    // Save shifted answers
    setAnswers(answersClone);
  };

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
      <Title style={{ paddingBottom: "20px", paddingTop: "20px" }}>
        Remember the numbers and select from Small to Big{" "}
      </Title>
      <Row gutter={[16, 16]} style={{ margin: "0px", padding: "20px" }}>
        {cards.map((card, i) => (
          <Col key={i} span={24 / amount}>
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
