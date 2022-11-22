import React, { useEffect } from "react";
import Graph from "./Graph";
import { useAlert } from "../context/AlertContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebaseConfig";

const Stats = ({
  wpm,
  accuracy,
  graphData,
  correctChars,
  incorrectChars,
  extraChars,
  missedChars,
}) => {
  /*
    graphData = [
      [0, 23],
      [0, 23],
      [1, 26],
      [1, 26],
      [2, 23],
      [2, 23]
    ]
  */
  const [user] = useAuthState(auth);
  const { setAlert } = useAlert();
  // to remove multiple instances in the graph x-axis.
  let timeSet = new Set();
  const newGraph = graphData.filter((i) => {
    if (!timeSet.has(i[0])) {
      timeSet.add(i[0]);
      return i;
    }
  });

  // to push the results to the database
  const pushResultsToDB = async () => {
    const resultsRef = db.collection("Results");
    const { uid } = auth.currentUser;
    if (!isNaN(accuracy)) {
      await resultsRef
        .add({
          userId: uid,
          wpm: wpm,
          accuracy: accuracy,
          characters: `${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
          timeStamp: new Date(),
        })
        .then((res) => {
          setAlert({
            open: true,
            type: "success",
            message: "result saved in DataBase.",
          });
        });
    } else {
      setAlert({
        open: true,
        type: "error",
        message: "invalid test",
      });
    }
  };

  useEffect(() => {
    if (user) {
      pushResultsToDB();
    } else {
      setAlert({
        open: true,
        type: "warning",
        message: "login to save results",
      });
    }
  }, []);

  return (
    <div className="stats-box">
      <div className="left-stats">
        <div className="title">WPM</div>
        <div className="subtitle">{wpm}</div>
        <div className="title">Accuracy</div>
        <div className="subtitle">{accuracy}%</div>
        <div className="title">Characters</div>
        <div className="subtitle">
          {correctChars}/{incorrectChars}/{missedChars}/{extraChars}
        </div>
      </div>
      <div className="right-stats">
        <Graph graphData={newGraph} />
      </div>
    </div>
  );
};

export default Stats;
