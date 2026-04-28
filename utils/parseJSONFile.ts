import fs from "fs";
/**
 * Read and parse a JSON file
 * @param jsonPath The path to the JSON file
 * @returns The JSON object
 */
export const parseJSONFile = <T>(jsonPath: string): T =>
  <T>JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
