import supertest from "supertest";
import { Student } from "../../infrastrucuture/schema/studentSchema";
import { app } from "../../../server";
import { AppError, ValidationError, NotFoundError } from "../../domain/utils/error/customErros";
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

describe("find student by course", () => {
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
            const response = await supertest(app).get("/students/course/Computer Science");
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
    });

    describe("error cases", () => {
        it("should return status 404 for a student not found", async () => {
            const response = await supertest(app).get("/students/course/mathematics");
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: "Resource not found" });
        });

        it("should return status 500 with message on error", async () => {
            jest.spyOn(Student, 'find').mockRejectedValue(new Error('Internal server error'));
            const response = await supertest(app).get("/students/course/mathematics");
            expect(response.status).toBe(500);
            expect(response.body.message).toBe('something went wrong');
        });
    });
});