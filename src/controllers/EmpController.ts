import { Request, Response } from "express";
import { EmployeeModel } from "../db/employees";
import logger from "../config/logger"; 
import redisClient from "../config/redisClient";

class EmpController {
    // Get all employees (without caching)
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
    
    // Get employee by ID with Redis caching
    public getEmployee = async (request: Request, response: Response): Promise<any> => {
        try {
            const { id } = request.params;
            const cacheKey = `employee:${id}`;
            
            // Check if data exists in Redis cache
            const cachedEmployee = await redisClient.get(cacheKey);
            if (cachedEmployee) {
                logger.info("Fetched employee from Redis cache", { employeeId: id });
                return response.status(200).json({ data: JSON.parse(cachedEmployee) });
            }
            
            // If not in cache, fetch from database
            const employee = await EmployeeModel.findById(id);
            if (!employee) {
                logger.warn("Employee not found", { employeeId: id });
                return response.sendStatus(404);
            }
            
            // Store the result in Redis cache
            await redisClient.set(cacheKey, JSON.stringify(employee), { EX: 3600 }); // Cache for 1 hour
            logger.info("Fetched employee from database and cached", { employeeId: id });
            logger.info("Fetched employee by ID", { employee });
            return response.status(200).json({ data: employee });
        } catch (error) {
            logger.error("Error fetching employee by ID", { error, employeeId: request.params.id });
            return response.sendStatus(400);
        }
    }
    
    // Create employee and cache the result
    public creatEmployee = async (request: Request, response: Response): Promise<any> => {
        try {
            const { name, email, mobile, dob, doj } = request.body;
            const employee = new EmployeeModel({ name, email, mobile, dob, doj });
            await employee.save();
            
            // Cache the newly created employee
             const cacheKey = `employee:${employee._id}`;
             await redisClient.set(cacheKey, JSON.stringify(employee), { EX: 3600 });
             logger.info("Created new employee and cached", { employee });
            return response.status(201).json({ message: "Employee created", data: employee });
        } catch (error) {
            logger.error("Error creating employee", { error });
            return response.sendStatus(400);
        }
    }
    
    // Update employee and refresh cache
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
                
                 // Update cache with new data
                 const cacheKey = `employee:${id}`;
                 await redisClient.set(cacheKey, JSON.stringify(employee), { EX: 3600 });
                 logger.info("Updated employee and refreshed cache", { employee });
                return response.status(200).json({ message: "Employee updated", data: employee });
            }
            logger.warn("Employee not found for update", { employeeId: id });
            return response.sendStatus(404);
        } catch (error) {
            logger.error("Error updating employee", { error, employeeId: request.params.id });
            return response.sendStatus(400);
        }
    }
    
    // Delete employee and invalidate cache
    public deleteEmployee = async (request: Request, response: Response): Promise<any> => {
        try {
            const { id } = request.params;
            const result = await EmployeeModel.findByIdAndDelete(id);
            if (result) {
                
                // Invalidate cache
                 const cacheKey = `employee:${id}`;
                 await redisClient.del(cacheKey);
                 logger.info("Deleted employee and removed from cache", { employeeId: id });
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
