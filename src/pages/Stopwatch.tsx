import { useState, useEffect, useMemo, useCallback } from "react";

export default function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  const start = useCallback(() => setRunning(true), []);
  const pause = useCallback(() => setRunning(false), []);
  const reset = useCallback(() => {
    setRunning(false);
    setSeconds(0);
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const display = useMemo(() => {
    const mm = Math.floor(seconds / 60);
    const ss = seconds % 60;
    const mmStr = String(mm).padStart(2, "0");
    const ssStr = String(ss).padStart(2, "0");
    return `${mmStr}:${ssStr}`;
  }, [seconds]);

  return (
    <div className="w-full flex flex-col items-center p-6">
      <div className="w-80 p-4 border rounded">
        <h1 className="text-xl font-bold mb-2">⏱ Stopwatch</h1>

        <div className="mb-2" style={{ fontSize: 40, textAlign: "center" }}>
          {display}
        </div>

        <div className="mb-2" style={{ textAlign: "center" }}>
          <button
            className="btn btn-primary mr-2"
            onClick={start}
            disabled={running}
          >
            시작
          </button>
          <button
            className="btn btn-outline mr-2"
            onClick={pause}
            disabled={!running}
          >
            일시정지
          </button>
          <button className="btn" onClick={reset}>
            리셋
          </button>
        </div>

        <p className="text-sm" style={{ textAlign: "center" }}>
          상태: {running ? "동작 중" : "정지"}
        </p>
      </div>
    </div>
  );
}
