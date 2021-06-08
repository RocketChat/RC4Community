import { useEffect, useState } from "react";

interface Props {
    end: number,
    className: string
}

export default function Countup(props: Props) {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("");
  const speed = 1000 / props.end;
  // eslint-disable-next-line
  useEffect(() => {
    if (count < props.end && count < 1000) {
      setTimeout(() => {
        setCount((prevCount) => prevCount + 1);
      }, speed);
    } else {
      setValue(props.end.toString());
    }
  });
  return <div className={props.className}>{value || count}</div>;
}