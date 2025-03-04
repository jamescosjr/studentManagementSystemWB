import supertest from "supertest";
import { Student } from "../../infrastrucuture/schema/studentSchema.js";
import app from "../../../server.js";
import { AppError, ValidationError, NotFoundError } from "../../domain/utils/error/customErros.js";
const dbHandler = require('../../../jest/jest.setup.js');

beforeAll(async () => {
    await dbHandler.connect();
});

afterEach(async () => {
    await dbHandler.clearDatabase();
});

afterAll(async () => {
    await dbHandler.closeDatabase();
});

describe("Update student by Id", () => {
    describe("success cases", () => {
        it("should return status 200 for a valid update", async () => {
            const student = {
                name: "John Doe",
                course: "Computer Science",
                year: 2021,
                _id: "677693a87933d6cacc1066a6",
                inscription: "COM1",
                __v: 0
            };
            await Student.create(student);

            const response = await supertest(app).put(`/students/677693a87933d6cacc1066a6`).send({
                name: "John Doe",
                course: "Computer Science",
                year: 2022,
            });
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                name: "John Doe",
                course: "Computer Science",
                year: 2022,
                _id: expect.any(String),
                inscription: "COM1",
                __v: 0
            });
        });
    });

    describe("non success cases", () => {
        it("should return 404 with 'Student with ID 677693a87933d6cacc1066a6 not found' message on invalid id", async () => {
            const response = await supertest(app).put("/students/677693a87933d6cacc1066a6").send({
                name: "John Doe",
                course: "Computer Science",
                year: 2022,
            });
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Student with ID 677693a87933d6cacc1066a6 not found');
        });

        it("should return 400 with 'Invalid student data' message on invalid data", async () => {
            const student = {
                name: "John Doe",
                course: "Computer Science",
                year: 2021,
                _id: "677693a87933d6cacc1066a6",
                inscription: "COM1",
                __v: 0
            };
            await Student.create(student);

            const response = await supertest(app).put(`/students/677693a87933d6cacc1066a6`).send({
                name: "John Doe",
                course: 234,
                year: 2022,
            });
            expect(response.status).toBe(400);
            expect(response.body.message).toBe("The course should be a valid string");
        });
    });
});