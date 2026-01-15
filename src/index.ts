import express from "express";
import type { Request, Response } from "express";
import { logger } from "./utils/logger.js";
import { envConfig } from "./env.config.js";
import { connectPostgres } from "./config/index.js";
import { initializeModels, propertyService } from "./models/init.js";

const app = express();

app.use(express.json());
const port:number = Number(envConfig.port);

const startServer = async function () {
  try {

    const pgPool = await connectPostgres(envConfig);
    await initializeModels(pgPool);

    app.get("/health", function (req: Request, res: Response) {
      res.status(200).json({
        success: true,
        message: "Server is Healthy",
      });
    });

    app.post(
      `/create-properties`,
      async function (req: Request, res: Response) {
        try {

          const { name, price, location } = req.body;

          const response = await propertyService.createProperty(name, price, location)

          return res.status(200).json({
            success: true,
            message: `Successfully created property`,
            data:response
          })

        } catch (error) {
          logger.error(`Error in creating properties`, error)
          return res.status(200).json({
            success: false,
            message:`${error}`
          })
        }
      }
    )

    app.listen(
      port,
      "0.0.0.0", function () {
      logger.info(`Server is listening in on port ${port}`);
    });

  } catch (error) {
    logger.error(`Error in server start up`, error)
  }
}

startServer()
