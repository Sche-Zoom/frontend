import { AuthHandlers } from "@/mocks/handlers/auth";
import { ScheduleHandlers } from "@/mocks/handlers/schedule";
import { UserHandlers } from "@/mocks/handlers/user";

export const handlers = [...ScheduleHandlers, ...AuthHandlers, ...UserHandlers];

export default handlers;
