import { CSSProperties } from "react";

export interface ScheduleColorVariable extends CSSProperties {
  "--schedule-background": string;
  "--schedule": string;
}

export const getScheduleColorVariable: (color: ColorType) => ScheduleColorVariable = (color) => {
  return {
    "--schedule-background": `var(--${color}-background)`,
    "--schedule": `var(--${color})`,
  };
};
