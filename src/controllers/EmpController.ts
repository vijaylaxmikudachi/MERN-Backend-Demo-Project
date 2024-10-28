import { Request, Response } from "express";
import { EmployeeModel } from "../db/employees";
import logger from "../config/logger"; // Assuming logger is defined in `logger.ts`

class EmpController {
    public getAllEmployee = async (request: Request, response: Response): Promise<any> => {
        try {
            const employees = await EmployeeModel.find();
            logger.info("Fetched all employees", { count: employees.length });
            return response.status(200).json({ data: employees });
        } catch (error) {
            logger.error("Error fetching all employees", { error });
            return response.sendStatus(400);
        }
    }

    public getEmployee = async (request: Request, response: Response): Promise<any> => {
        try {
            const { id } = request.params;
            const employee = await EmployeeModel.findById(id);
            if (!employee) {
                logger.warn("Employee not found", { employeeId: id });
                return response.sendStatus(404);
            }
            logger.info("Fetched employee by ID", { employee });
            return response.status(200).json({ data: employee });
        } catch (error) {
            logger.error("Error fetching employee by ID", { error, employeeId: request.params.id });
            return response.sendStatus(400);
        }
    }

    public creatEmployee = async (request: Request, response: Response): Promise<any> => {
        try {
            const { name, email, mobile, dob, doj } = request.body;
            const employee = new EmployeeModel({ name, email, mobile, dob, doj });
            await employee.save();
            logger.info("Created new employee", { employee });
            return response.status(201).json({ message: "Employee created", data: employee });
        } catch (error) {
            logger.error("Error creating employee", { error });
            return response.sendStatus(400);
        }
    }

    public updateEmployee = async (request: Request, response: Response): Promise<any> => {
        try {
            const { id } = request.params;
            const { name, email, mobile, dob, doj } = request.body;
            const employee = await EmployeeModel.findById(id);
            if (employee) {
                employee.name = name;
                employee.email = email;
                employee.mobile = mobile;
                employee.dob = dob;
                employee.doj = doj;
                await employee.save();
                logger.info("Updated employee", { employee });
                return response.status(200).json({ message: "Employee updated", data: employee });
            }
            logger.warn("Employee not found for update", { employeeId: id });
            return response.sendStatus(404);
        } catch (error) {
            logger.error("Error updating employee", { error, employeeId: request.params.id });
            return response.sendStatus(400);
        }
    }

    public deleteEmployee = async (request: Request, response: Response): Promise<any> => {
        try {
            const { id } = request.params;
            const result = await EmployeeModel.findByIdAndDelete(id);
            if (result) {
                logger.info("Deleted employee", { employeeId: id });
                return response.status(200).json({ message: "Employee deleted" });
            }
            logger.warn("Employee not found for deletion", { employeeId: id });
            return response.sendStatus(404);
        } catch (error) {
            logger.error("Error deleting employee", { error, employeeId: request.params.id });
            return response.sendStatus(400);
        }
    }
}

export default EmpController;
