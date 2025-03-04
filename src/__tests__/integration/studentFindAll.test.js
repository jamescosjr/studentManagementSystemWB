import supertest from "supertest";
import { Student } from "../../infrastrucuture/schema/studentSchema.js";
import app from "../../../server.js";
import { AppError, ValidationError } from "../../domain/utils/error/customErros.js";
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

describe("Student findAll", () => {
    describe("success cases", () => {
        it("should return status 200 for a valid student", async () => {
            const student = {
                name: "John Doe",
                course: "Computer Science",
                year: 2021,
                _id: "677693a87933d6cacc1066a6",
                inscription: "COM1",
                __v: 0
            };
            await Student.create(student);
            const response = await supertest(app).get("/students");
            expect(response.status).toBe(200);
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        name: "John Doe",
                        course: "Computer Science",
                        year: 2021,
                        _id: "677693a87933d6cacc1066a6",
                        inscription: "COM1",
                        __v: 0
                    })
                ])
            );
        });

        it("should return an empty array if no student is found", async () => {
            const response = await supertest(app).get("/students");
            expect(response.status).toBe(200);
            expect(response.body).toEqual([]);
        });
    });

    describe("non success cases", () => {
        it("should return 500 with message on error", async () => {
            jest.spyOn(Student, 'find').mockRejectedValue(new Error('Internal server error'));
            const response = await supertest(app).get("/students");
            expect(response.status).toBe(500);
            expect(response.body.message).toBe('something went wrong');
        });
    });
})