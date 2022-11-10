// hooks are only called inside a functional components.
// not in the callback functions.

// createRef() is a function used to create references in the class components. In functinal components, we use them inside callback functions.
// useRef() is a hook works in the functional components.

import { useState, createRef, useEffect, useRef } from "react";

export function TypingBox(props) {
  // these are used to get the particular character.
  const [currWordIdx, setCurrWordIdx] = useState(0);
  const [currCharIdx, setCurrCharIdx] = useState(0);

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
  const wordSpanRef = Array(props.words.length)
    .fill(0)
    .map((idx) => createRef(null));

  const keyDownHandler = (e) => {
    // let allChildrenSpans =  wordSpanRef[currWordIdx].current.querySelectorAll("span");
    // above one works too
    let allChildrenSpans = wordSpanRef[currWordIdx].current.childNodes;

    // logic for space

    // logic for backspace

    // logic when we enter correct / incorrect key
    if (e.key === allChildrenSpans[currCharIdx].innerText) {
      console.log("pressed correct key");
      allChildrenSpans[currCharIdx].className = "char correct";
    } else {
      console.log("pressed wrong key");
      allChildrenSpans[currCharIdx].className = "char incorrect";
    }

    // it moves to the next character
    setCurrCharIdx(currCharIdx + 1);
  };

  // this one autofocus on the hidden 'inputfield'. whenever the page loads.
  // and also when we click on the 'text-container'
  const focusInput = () => {
    inputTextRef.current.focus();
  };
  useEffect(() => {
    focusInput();
  }, []);

  return (
    <div>
      <div className="type-box" onClick={focusInput}>
        <div className="words">
          {/* text area */}
          {props.words.map((word, index) => {
            return (
              <span className="word" ref={wordSpanRef[index]}>
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
