"use client";

import { useEffect, useState } from "react";

type LocalTimeProps = {
  timeZone?: string;
  className?: string;
};

// Current time in a zone, filled in after mount so server and client markup match.
export function LocalTime({ timeZone = "Africa/Kigali", className }: LocalTimeProps) {
  const [time, setTime] = useState<string>();

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone
    });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [timeZone]);

  return <span className={className}>{time ?? "--:--"}</span>;
}
