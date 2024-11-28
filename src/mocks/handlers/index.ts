import { AuthHandlers } from "@/mocks/handlers/auth";
import { ScheduleHandlers } from "@/mocks/handlers/schedule";

export const handlers = [...ScheduleHandlers, ...AuthHandlers];

export default handlers;
