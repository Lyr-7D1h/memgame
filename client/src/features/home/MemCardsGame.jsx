import { useCallback, useEffect, useState } from "react";
import MemCard from "./MemCard";
import errorHandler from "../utils/errorHandler";
import requester from "../utils/requester";
import { Button, Col, Row } from "antd";
import Title from "antd/lib/typography/Title";
import { RightCircleOutlined } from "@ant-design/icons";

const getNumbers = (amount, cb) => {
  requester
    .get(`rand/${amount}`)
    .then((numbers) => cb(numbers))
    .catch(errorHandler);
  return cb;
};

const mapNumbersToCards = (numbers) => {
  return numbers.map((num) => ({
    value: num,
    flipped: false,
    clickable: false,
    status: null,
  }));
};

const MemCardsGame = ({ amount, rounds: maxRound, onFinish }) => {
  const [cards, setCards] = useState([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [round, setRound] = useState(1);
  const [history, setHistory] = useState([]);

  const start = useCallback(() => {
    if (hasStarted === false) {
      setHasStarted(true);
      setCards(
        cards.map(({ flipped, clickable, ...props }) => ({
          flipped: true,
          clickable: true,
          ...props,
        }))
      );
    }
  }, [cards, hasStarted]);

  useEffect(() => {
    getNumbers(amount, (numbers) => {
      setCards(mapNumbersToCards(numbers));
      setAnswers([...numbers].sort());
    });
  }, [amount]);

  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === "Enter") {
        start();
      }
    };
    document.addEventListener("keypress", handleEnter);

    return function () {
      document.removeEventListener("keypress", handleEnter);
    };
  }, [start]);

  const newRound = () => {
    setRound(round + 1);

    // Add cards to history
    setHistory([cards, ...history]);

    if (round === maxRound) {
      onFinish(history);
    } else {
      // Reset if not finished
      setHasStarted(false);
      getNumbers(amount, (numbers) => {
        setCards(mapNumbersToCards(numbers));
        setAnswers([...numbers].sort());
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

    // New round if wrong or all answers were correct
    if (status === "wrong" || answersClone.length === 0) {
      if (status === "correct") {
        // WON
      }
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
      }, 2000);
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

  const Cards = [];
  for (let i = 0; i < amount; i++) {
    Cards.push();
  }

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <Title style={{ paddingBottom: "20px" }}>
        Remember the numbers and select from Small to Big{" "}
      </Title>
      <Row gutter={[16, 16]} style={{ paddingBottom: "20px" }}>
        {cards.map((card, i) => (
          <Col key={i} span={24 / amount}>
            <MemCard card={card} onClick={handleCardClick} />
          </Col>
        ))}
        {Cards}
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
          Start (Click or press Enter)
        </Button>
      )}
    </div>
  );
};

export default MemCardsGame;
