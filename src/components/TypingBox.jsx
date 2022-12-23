// hooks are only called inside a functional components.
// not in the callback functions.

// createRef() is a function used to create references in the class components. In functinal components, we use them inside callback functions.
// useRef() is a hook works in the functional components.
import { Dialog, DialogTitle } from "@material-ui/core";
import randomWords from "random-words";
import { useState, createRef, useEffect, useRef, useMemo } from "react";
import { useTestMode } from "../context/TestMode";
import UpperMenu from "./UpperMenu";
import Stats from "./Stats";

const TypingBox = () => {
  const { testMode, testTime, testWords } = useTestMode();
  // console.log(typeof testTime, typeof testWords);
  const [currWordIdx, setCurrWordIdx] = useState(0);
  const [currCharIdx, setCurrCharIdx] = useState(0);
  const [countDown, setCountDown] = useState(() => {
    if (testMode === "words") {
      return 180;
    } else {
      return testTime;
    }
  });
  const [testStarted, setTestStarted] = useState(false);
  const [testEnded, setTestEnded] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [extraChars, setExtraChars] = useState(0);
  const [missedChars, setMissedChars] = useState(0);

  const [correctWords, setCorrectWords] = useState(0);

  const [graphData, setGraphData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [wordsArray, setWordsArray] = useState(() => {
    if (testMode === "words") {
      return randomWords(testWords);
    }
    return randomWords(100);
  });

  // useMemo is similar to useEffect
  const words = useMemo(() => {
    return wordsArray;
  }, [wordsArray]);

  // depends on above function
  const wordSpanRef = useMemo(() => {
    return Array(words.length)
      .fill(0)
      .map((i) => createRef(null));
  }, [words]);

  const resetWordSpanRefClassNames = () => {
    wordSpanRef.map((i) => {
      Array.from(i.current.childNodes).map((j) => {
        j.className = "char";
      });
    });
    wordSpanRef[0].current.childNodes[0].className = "char current";
  };

  const handleDialogEvents = (e) => {
    // space key logic
    if (e.keyCode === 32) {
      e.preventDefault();
      redoTest();
      setOpenDialog(false);
      return;
    }

    //tab/enter key logic
    if (e.keyCode === 9 || e.keyCode === 13) {
      e.preventDefault();
      resetTest();
      setOpenDialog(false);
      return;
    }

    e.preventDefault();
    setOpenDialog(false);
    startTimer();
  };

  const redoTest = () => {
    setCurrCharIdx(0);
    setCurrWordIdx(0);
    setTestStarted(false);
    setTestEnded(false);
    clearInterval(intervalId);
    setCountDown(testTime);
    if (testMode === "words") {
      setCountDown(180);
    }
    setGraphData([]);
    setCorrectChars(0);
    setIncorrectChars(0);
    setCorrectWords(0);
    setMissedChars(0);
    setExtraChars(0);
    resetWordSpanRefClassNames();
  };

  // for every html element there is a 'ref' attribute
  const inputTextRef = useRef(null);

  // Array(3) -> creates [undef, undef, undef]
  // we are using 100 random words. means Array(words.length) create an array of 100 items. Because of fill(0), undefined gets replaced as 0 and we can't use map on array of undefined values. so fill is important
  /*
    createRef / useRef returns an object
    wordSpanRef = [
      {
        current: null
      },
      {
        current: null
      }
    ]
  */

  // timer
  const startTimer = () => {
    const intervalId = setInterval(timer, 1000);
    setIntervalId(intervalId);
    function timer() {
      setCountDown((prevCountDown) => {
        // for graph: to know how many correct characters typed upto a particular time
        setCorrectChars((correctChars) => {
          setGraphData((data) => {
            // data: what currently present in 'graphData'.
            const startTime = testMode === "words" ? 180 : testTime;
            return [
              ...data,
              [
                startTime - prevCountDown,
                Math.round(
                  correctChars / 5 / ((startTime - prevCountDown + 1) / 60)
                ),
              ],
            ];
          });
          return correctChars;
        });

        if (prevCountDown === 1) {
          clearInterval(intervalId);
          setCountDown(0);
          setTestEnded(true);
        } else {
          return prevCountDown - 1;
        }
      });
    }
  };

  const keyDownHandler = (e) => {
    //logic for tab
    if (e.keyCode === 9) {
      if (testStarted) {
        clearInterval(intervalId);
      }
      e.preventDefault();
      setOpenDialog(true);
      return;
    }

    if (!testStarted) {
      startTimer();
      setTestStarted(true);
    }
    // let allChildrenSpans =  wordSpanRef[currWordIdx].current.querySelectorAll("span");
    // above one works too
    let allChildrenSpans = wordSpanRef[currWordIdx].current.childNodes;

    // logic for space
    if (e.keyCode === 32) {
      //game over logic for word mode
      if (currWordIdx === wordsArray.length - 1) {
        clearInterval(intervalId);
        setTestEnded(true);
        return;
      }
      const correctChar =
        wordSpanRef[currWordIdx].current.querySelectorAll(".correct");
      const incorrectChar =
        wordSpanRef[currWordIdx].current.querySelectorAll(".incorrect");

      setMissedChars(
        missedChars +
          (allChildrenSpans.length -
            (incorrectChar.length + correctChar.length))
      );

      if (correctChar.length === allChildrenSpans.length) {
        setCorrectWords(correctWords + 1);
      }

      // removing cursor from the word
      if (currCharIdx >= allChildrenSpans.length) {
        // allChildrenSpans[currCharIdx - 1].className = allChildrenSpans[
        //   currCharIdx - 1
        // ].className.replace("right", "");
        // above statement works fine too.
        allChildrenSpans[currCharIdx - 1].classList.remove("right");
      } else {
        // when we click on space the cursor jumps to the next word but it leaves its trace. this one helps to remove that.
        allChildrenSpans[currCharIdx].classList.remove("current");
      }

      // adding cursor to the next word
      wordSpanRef[currWordIdx + 1].current.childNodes[0].className =
        "char current";
      if (
        currWordIdx != 0 &&
        wordSpanRef[currWordIdx + 1].current.offsetLeft <
          wordSpanRef[currWordIdx].current.offsetLeft
      ) {
        wordSpanRef[currWordIdx].current.scrollIntoView();
      }

      setCurrWordIdx(currWordIdx + 1);
      setCurrCharIdx(0);
      return; // important. otherwise else of 'logic when we enter correct / incorrect key' will run.
    }

    // logic for backspace
    if (e.keyCode === 8) {
      if (currCharIdx !== 0) {
        // when we reach the last char, backspace didn't work because we face index out of range error.
        // so the following is to handle that.
        if (currCharIdx === allChildrenSpans.length) {
          // to remove the extra characters that we typed
          if (allChildrenSpans[currCharIdx - 1].className.includes("extra")) {
            allChildrenSpans[currCharIdx - 1].remove();
            allChildrenSpans[currCharIdx - 2].className += " right";
          } else {
            allChildrenSpans[currCharIdx - 1].className = "char current";
          }

          setCurrCharIdx(currCharIdx - 1);
          return;
        }

        // these statements no need to be in order
        allChildrenSpans[currCharIdx].className = "char"; // it removes the char from being correct / incorrect
        allChildrenSpans[currCharIdx - 1].className = "char current"; // moves the pointer one step back
        setCurrCharIdx(currCharIdx - 1); // sets 'prev char' as 'curr char'
      }

      return;
    }

    if (currCharIdx === allChildrenSpans.length) {
      let newSpan = document.createElement("span"); // create new span
      newSpan.innerText = e.key; // it contains what we typed
      newSpan.className = "char incorrect right extra"; // that span contains these classes

      wordSpanRef[currWordIdx].current.append(newSpan); // it adds the characters to the word
      setCurrCharIdx(currCharIdx + 1); // it set currCharIdx

      // when we type the last char of the word, cursor moves to its right.
      // therefore, these extra characters all contains these cursors at their left.
      // this one helps in removing those.
      // if we don't use this, we use cursors left and right.
      allChildrenSpans[currCharIdx - 1].className = allChildrenSpans[
        currCharIdx - 1
      ].className.replace("right", "");

      setExtraChars(extraChars + 1);
      return;
    }

    // logic when we enter correct / incorrect key
    if (e.key === allChildrenSpans[currCharIdx].innerText) {
      allChildrenSpans[currCharIdx].className = "char correct";
      setCorrectChars(correctChars + 1);
    } else {
      allChildrenSpans[currCharIdx].className = "char incorrect";
      setIncorrectChars(incorrectChars + 1);
    }

    // to move the cursor to its next
    // if the character is the last one, border shift from left to right for a visual that we reached last. otherwise stays in left side.
    if (currCharIdx + 1 === allChildrenSpans.length) {
      allChildrenSpans[currCharIdx].className += " right";
    } else {
      allChildrenSpans[currCharIdx + 1].className += " current";
    }

    // if we use this 'setState' before the cursor conditon, it still works fine. but i think its best to use it after the cursor condition because setState is a async.
    // to move to the next character
    setCurrCharIdx(currCharIdx + 1);
  };

  const calculateWPM = () => {
    return Math.round(
      correctChars / 5 / ((graphData[graphData.length - 1][0] + 1) / 60)
    );
  };

  const calculateAccuracy = () => {
    return Math.round((correctWords / currWordIdx) * 100);
  };

  // to reset
  const resetTest = () => {
    setCurrWordIdx(0);
    setCurrCharIdx(0);
    setTestStarted(false);
    setTestEnded(false);
    clearInterval(intervalId);
    setCountDown(testTime);
    if (testMode === "words") {
      let random = randomWords(testWords);
      setWordsArray(random);
      setCountDown(180);
    } else {
      let random = randomWords(100);
      setWordsArray(random);
    }

    setGraphData([]);
    setCorrectChars(0);
    setIncorrectChars(0);
    setCorrectWords(0);
    setMissedChars(0);
    setExtraChars(0);
    resetWordSpanRefClassNames();
  };

  // this one autofocus on the hidden 'inputfield'. whenever the page loads.
  // and also when we click on the 'text-container'
  const focusInput = () => {
    inputTextRef.current.focus();
  };

  useEffect(() => {
    resetTest();
  }, [testTime, testMode, testWords]);

  useEffect(() => {
    focusInput();
    wordSpanRef[0].current.childNodes[0].className = "char current";
  }, []);

  return (
    <div>
      {testEnded ? (
        <Stats
          wpm={calculateWPM()}
          accuracy={calculateAccuracy()}
          graphData={graphData}
          correctChars={correctChars}
          incorrectChars={incorrectChars}
          extraChars={extraChars}
          missedChars={missedChars}
          resetTest={resetTest}
        />
      ) : (
        <>
          <UpperMenu countDown={countDown} currWordIdx={currWordIdx} />
          <div className="type-box" onClick={focusInput}>
            <div className="words">
              {/* spans of words and chars */}
              {words.map((word, index) => (
                <span className="word" ref={wordSpanRef[index]} key={index}>
                  {word.split("").map((char, idx) => (
                    <span className="char" key={`char${idx}`}>
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
      <input
        type="text"
        className="hidden-input"
        ref={inputTextRef}
        onKeyDown={(e) => keyDownHandler(e)}
      />
      <Dialog
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
        open={openDialog}
        onKeyDown={handleDialogEvents}
        style={{
          backdropFilter: "blur(2px)",
        }}
      >
        <DialogTitle>
          <div className="instruction">press Space to redo</div>
          <div className="instruction">pres Tab/Enter to restart</div>
          <div className="instruction">press any other key to exit</div>
        </DialogTitle>
      </Dialog>
    </div>
  );
};

export default TypingBox;
