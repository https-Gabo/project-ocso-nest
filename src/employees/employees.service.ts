import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { Employee } from "./entities/employee.entity";

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.employeeRepository.save(createEmployeeDto);
    return employee;
  }

  async findAll() {
    return await this.employeeRepository.find();
  }

  async findOne(id: string) {
    const employee = await this.employeeRepository.findOneBy({
      employeeId: id,
    });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = await this.employeeRepository.preload({
      employeeId: id,
      ...updateEmployeeDto,
    });

    if (!employeeToUpdate) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return await this.employeeRepository.save(employeeToUpdate);
  }

  async remove(id: string) {
    const employee = await this.findOne(id);
    await this.employeeRepository.remove(employee);
    return {
      message: `Employee with ID ${id} successfully deleted`,
    };
  }
  async uploadPhoto(photoUrl: string) {
    const employee = new Employee();
    employee.photoUrl = photoUrl;
    return await this.employeeRepository.save(employee);
  }
}
