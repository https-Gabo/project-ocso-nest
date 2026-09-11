import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {

  private employees: CreateEmployeeDto[] = [
    {
      id: 1,
      name: "Alberto", 
      lastname: "Rodriguez", 
      phonenumber: "XXX209813012"
    },
    {
      id: 2, // Cambiado de 1 a 2 para evitar colisión de IDs
      name: "Jose", 
      lastname: "Vances", 
      phonenumber: "XXX209813012"
    }
  ];

  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = this.employees.length + 1;
    this.employees.push(createEmployeeDto);
    return this.employees; 
  }

  findAll() {
    return this.employees;
  }

  findOne(id: number) {
    const employee = this.employees.filter((employee) => employee.id === id)[0];
    return employee;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    this.employees = this.employees.filter((employee) => employee.id !== id); 
    return this.employees;
  }
}