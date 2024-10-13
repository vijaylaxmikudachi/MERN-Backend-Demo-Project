import { Request,Response } from "express";
import { EmployeeModel } from "../db/employees";

class EmpController{

    public getAllEmployee = async (request:Request,response:Response): Promise<any> =>{
        try{
            const employees = await EmployeeModel.find(); 
            return response.status(200).json({data:employees});
        }
        catch(error){
            return response.sendStatus(400);
        }
    }
    public getEmployee = async (request:Request,response:Response): Promise<any> =>{
    
        try{
            const {id} = request.params;
            const employee = await EmployeeModel.findById(id); 
            return response.status(200).json({data:employee});
        }
        catch(error){
            return response.sendStatus(400);
        }
    }
    public creatEmployee= async (request:Request,response:Response): Promise<any> =>{
     
        try{
            const {name,email,mobile,dob,doj} = request.body;
            const employee = new EmployeeModel({
                name,
                email,
                mobile,
                dob,
                doj
            }) 
            await employee.save();
            return response.status(201).json({message:"Employee created",data:employee});
        }
        catch(error){
            return response.sendStatus(400);
        }
    }
    public updateEmployee= async (request:Request,response:Response): Promise<any> =>{
   
        try{
            const {id} = request.params;
            const {name,email,mobile,dob,doj} = request.body;
            const employee = await EmployeeModel.findById(id); 
           if(employee){
            employee.name = name;
            employee.email = email;
            employee.mobile = mobile;
            employee.dob = dob;
            employee.doj = doj;
            await employee.save();
            return response.status(200).json({message:"Employee updated",data:employee});
           }
           return response.sendStatus(400);
        }
        catch(error){
            return response.sendStatus(400);
        }
    }
    public deleteEmployee= async (request:Request,response:Response): Promise<any> =>{
        try{
            const {id} = request.params;
            await EmployeeModel.findByIdAndDelete({_id: id}); 
            return response.status(200).json({message:"Employee deleted"});
        }
        catch(error){
            return response.sendStatus(400);
        }
    }
}

export default EmpController;
