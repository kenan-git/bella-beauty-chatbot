import "server-only";

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

import type { AppointmentLead, CreateLeadInput } from "../types/lead";

const LEADS_FILE_PATH = path.join(process.cwd(), "src", "data", "leads.json");
const SERVICE_NAMES = [
  "Hair Cut",
  "Hair Coloring",
  "Manicure",
  "Pedicure",
  "Facial Treatment",
  "Eyebrow Shaping",
];

function normalizeValue(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function normalizePhone(value: string): string {
  return normalizeValue(value).replace(/[.,;:!?]+$/g, "");
}

function normalizeService(value: string): string {
  const normalizedService = normalizeValue(value).toLowerCase();
  const matchedService = SERVICE_NAMES.find((serviceName) =>
    normalizedService.includes(serviceName.toLowerCase()),
  );

  return matchedService ?? normalizeValue(value);
}

function extractMatch(message: string, pattern: RegExp): string | null {
  const match = message.match(pattern);
  const value = match?.[1];

  return value ? normalizeValue(value) : null;
}

function isAppointmentLead(value: unknown): value is AppointmentLead {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return (
    "id" in value &&
    typeof value.id === "string" &&
    "name" in value &&
    typeof value.name === "string" &&
    "phone" in value &&
    typeof value.phone === "string" &&
    "service" in value &&
    typeof value.service === "string" &&
    "status" in value &&
    value.status === "new" &&
    "createdAt" in value &&
    typeof value.createdAt === "string"
  );
}

function parseLeadsJson(value: string): AppointmentLead[] {
  const parsed: unknown = JSON.parse(value);

  if (!Array.isArray(parsed)) {
    return [];
  }

  return parsed.filter(isAppointmentLead);
}

/**
 * Extracts appointment lead details from a customer message.
 *
 * @param message - Customer message that may contain name, phone, and service.
 * @returns Lead input when all required fields are found, otherwise null.
 */
export function extractLeadFromMessage(message: string): CreateLeadInput | null {
  const name = extractMatch(
    message,
    /(?:my name is|name is|name)\s*[:\-]?\s*([a-zA-Z\s.'-]+?)(?=\s*(?:,|\.|;|\n|phone|my phone|service|i want|$))/i,
  );
  const phone = extractMatch(
    message,
    /(?:my phone is|phone is|phone)\s*[:\-]?\s*([+\d][+\d\s().,;:!?-]{6,})/i,
  );
  const service = extractMatch(
    message,
    /(?:service is|service|i want(?: to book)?(?: an appointment for)?|i would like)\s*[:\-]?\s*([a-zA-Z\s]+?)(?=\s*(?:,|\.|;|\n|name|my name|phone|my phone|$))/i,
  );

  if (!name || !phone || !service) {
    return null;
  }

  return {
    name,
    phone: normalizePhone(phone),
    service: normalizeService(service),
  };
}

/**
 * Saves an appointment lead to the demo JSON data file.
 *
 * @param leadInput - Lead details collected from the customer.
 * @returns The saved appointment lead.
 */
export async function saveLead(
  leadInput: CreateLeadInput,
): Promise<AppointmentLead> {
  const existingLeads = parseLeadsJson(await readFile(LEADS_FILE_PATH, "utf8"));
  const lead: AppointmentLead = {
    id: randomUUID(),
    ...leadInput,
    status: "new",
    createdAt: new Date().toISOString(),
  };

  await writeFile(
    LEADS_FILE_PATH,
    `${JSON.stringify([...existingLeads, lead], null, 2)}\n`,
    "utf8",
  );

  return lead;
}
