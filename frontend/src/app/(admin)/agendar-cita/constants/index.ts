import { ServiceKey } from "../types";

export const SERVICES: Record<ServiceKey, string> = {
  coaching: "Coaching de comunicación y liderazgo interno y externo",
  mvp: "Desarrollo de MVP de alta fidelidad en cinco semanas",
};

export const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
] as const;
