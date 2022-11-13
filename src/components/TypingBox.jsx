// hooks are only called inside a functional components.
// not in the callback functions.

// createRef() is a function used to create references in the class components. In functinal components, we use them inside callback functions.
// useRef() is a hook works in the functional components.

import randomWords from "random-words";
import { useState, createRef, useEffect, useRef, useMemo } from "react";
import { useTestMode } from "../context/TestMode";
import UpperMenu from "./UpperMenu";
import Stats from "./Stats";

export function TypingBox() {
  // these are used to get the particular character.
  const [currWordIdx, setCurrWordIdx] = useState(0);
  const [currCharIdx, setCurrCharIdx] = useState(0);
  const [countDown, setCountDown] = useState(15);
  const [testStarted, setTestStarted] = useState(false);
  const [testEnded, setTestEnded] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const [correctChars, setCorrectChars] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);

  const [wordsArray, setWordsArray] = useState(() => {
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

  const { testTime } = useTestMode();

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
    const timer = () => {
      setCountDown((prevCountDown) => {
        if (prevCountDown === 0) {
          clearInterval(intervalId);
          setCountDown(0);
          setTestEnded(true);
        } else {
          return prevCountDown - 1;
        }
      });
    };
    const intervalId = setInterval(timer, 1000);
    setIntervalId(intervalId);
  };

  const keyDownHandler = (e) => {
    if (!testStarted) {
      startTimer();
      setTestStarted(true);
    }
    // let allChildrenSpans =  wordSpanRef[currWordIdx].current.querySelectorAll("span");
    // above one works too
    let allChildrenSpans = wordSpanRef[currWordIdx].current.childNodes;

    // logic for space
    if (e.keyCode === 32) {
      const correctChar =
        wordSpanRef[currWordIdx].current.querySelectorAll(".correct");
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

      return;
    }

    // logic when we enter correct / incorrect key
    if (e.key === allChildrenSpans[currCharIdx].innerText) {
      allChildrenSpans[currCharIdx].className = "char correct";
      setCorrectChars(correctChars + 1);
    } else {
      allChildrenSpans[currCharIdx].className = "char incorrect";
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
    return Math.round(correctChars / 5 / (testTime / 60));
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
    let random = randomWords(100);
    setWordsArray(random);
    resetWordSpanRefClassNames();
  };

  // this one autofocus on the hidden 'inputfield'. whenever the page loads.
  // and also when we click on the 'text-container'
  const focusInput = () => {
    inputTextRef.current.focus();
  };

  useEffect(() => {
    resetTest();
  }, [testTime]);

  useEffect(() => {
    focusInput();
    wordSpanRef[0].current.childNodes[0].className = "char current";
  }, []);

  return (
    <div>
      <UpperMenu countDown={countDown} />

      {testEnded ? (
        <Stats wpm={calculateWPM()} accuracy={calculateAccuracy()} />
      ) : (
        <div className="type-box" onClick={focusInput}>
          <div className="words">
            {/* text area */}
            {words.map((word, index) => {
              return (
                <span key={index} className="word" ref={wordSpanRef[index]}>
                  {word.split("").map((char, idx) => {
                    return (
                      <span key={idx} className="char">
                        {char}
                      </span>
                    );
                  })}
                </span>
              );
            })}
          </div>
        </div>
      )}

      <input
        type="text"
        className="hidden-input"
        ref={inputTextRef}
        onKeyDown={(e) => {
          keyDownHandler(e);
        }}
      />
    </div>
  );
}
