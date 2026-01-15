import { logger } from "../utils/logger.js";
import { Properties } from "./properties.js";
import { Pool } from "pg";

export let propertyService: Properties;

export async function initializeModels(pgPool:Pool) {
  try {

    propertyService = new Properties(pgPool)
    await propertyService.createTable()

  } catch (error) {
    logger.error(`Error in initalizing models`,error)
  }
}
