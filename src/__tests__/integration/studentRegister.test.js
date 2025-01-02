import supertest from "supertest";
import { Student } from "../../infrastrucuture/schema/studentSchema";
import { app } from "../../../server";
import { AppError, ValidationError } from "../../domain/utils/error/customErros";
const dbHandler = require('../../../jest/jest.setup');

beforeAll(async () => {
    await dbHandler.connect();
});

afterEach(async () => {
    await dbHandler.clearDatabase();
});

afterAll(async () => {
    await dbHandler.closeDatabase();
});

describe("Student Register", () => {
    describe("success cases", () => {
        it("should return status 201 for a valid student", async () => {
            const student = {
                name: "John Doe",
                course: "Computer Science",
                year: 2021
            };
            const response = await supertest(app).post("/students").send(student);
            expect(response.status).toBe(201);
            expect(response.body).toEqual({
                name: "John Doe",
                course: "Computer Science",
                year: 2021,
                _id: expect.any(String),
                inscription: "COM1",
                __v: 0
            })
        });
    });

    describe("non success cases", () => {
        it("should return 400 with 'The course should be a valid string' message on invalid data", async () => {
            const invalidData = { 
              name: 'Jean Cloud', 
              course: 234, 
              year: 2023 
            }; 
          
            const response = await supertest(app).post("/students").send(invalidData);
            
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('The course should be a valid string');
          });

        it("should return 400 with 'The year should be a valid number' message on invalid data", async () => {
            const invalidData = { 
              name: 'Jean Cloud', 
              course: 'Computer Science', 
              year: '2023' 
            }; 
          
            const response = await supertest(app).post("/students").send(invalidData);
            
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('The year should be a valid number');
          });

        it("should return 400 with 'The name should be a valid string' message on invalid data", async () => {
            const invalidData = { 
              name: 234, 
              course: 'Computer Science', 
              year: 2023 
            }; 
          
            const response = await supertest(app).post("/students").send(invalidData);
            
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('The name should be a valid string');
          });

          it("simulate a repository error", async () => {
            jest.spyOn(Student.prototype, 'save').mockImplementationOnce(() => {
                throw new AppError("Database error");
            });

            const newStudent = {
                name: "John Doe",
                course: "Computer Science",
                year: 2021
            };

            const response = await supertest(app).post("/students").send(newStudent);

            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual({ message: 'something went wrong' });
        });
    });
});
