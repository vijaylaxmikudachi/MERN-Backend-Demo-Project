import express from "express";
//import EmpController from "../controllers/EmpController";
import EmpController from "../controllers/EmpController";
//const empC = new EmpController();
const router = express.Router();
const getRoute = new EmpController();

router.get('/employee', getRoute.getAllEmployee);
router.get('/employee/:id', getRoute.getEmployee);
router.post('/employee', getRoute.creatEmployee);
router.put('/employee/:id', getRoute.updateEmployee);
router.delete('/employee/:id', getRoute.deleteEmployee);

export default router;