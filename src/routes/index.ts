import { Router,Request, Response, NextFunction } from "express";
import EmpController from "../controllers/EmpController";
import logger from "../config/logger"; // Assuming logger is exported from a separate file, e.g., logger.ts

const router = Router();
const empController = new EmpController();

// Log each route and add error handling with logger
router.get('/employee', (req:Request, res:Response) => {
  logger.info("GET /employee accessed");
  empController.getAllEmployee(req, res);
});

router.get('/employee/:id', (req, res, next) => {
  logger.info(`GET /employee/${req.params.id} accessed`);
  empController.getEmployee(req, res);
});

router.post('/employee', (req, res, next) => {
  logger.info("POST /employee accessed");
  empController.creatEmployee(req, res);
});

router.put('/employee/:id', (req, res, next) => {
  logger.info(`PUT /employee/${req.params.id} accessed`);
  empController.updateEmployee(req, res);
});

router.delete('/employee/:id', (req, res, next) => {
  logger.info(`DELETE /employee/${req.params.id} accessed`);
  empController.deleteEmployee(req, res);
});

export default router;
