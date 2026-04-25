import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "duubr3p4",
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-01-01",
});