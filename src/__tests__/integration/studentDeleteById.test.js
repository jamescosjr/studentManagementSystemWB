import supertest from "supertest";
import { Student } from "../../infrastrucuture/schema/studentSchema.js";
import app from "../../../server.js";
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

describe("delete student by Id", () => {
    describe("success cases", () => {
        it("should return 200 when trying to delete a student by Id", async () => {
            const student = {
                name: "John Doe",
                course: "Computer Science",
                year: 2021,
                _id: "677693a87933d6cacc1066a6",
                inscription: "COM1",
                __v: 0
            };
            await Student.create(student);
      
            const response = await supertest(app).delete(`/students/677693a87933d6cacc1066a6`);
      
            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Student deleted successfully");
      
            const deletedStudent = await Student.findById("677693a87933d6cacc1066a6");
            expect(deletedStudent).toBeNull();
        });
    });

    describe("non success cases", () => {
        it("should return 404 with 'Student with ID 677693a87933d6cacc1066a6 not found' message on invalid id", async () => {
            const response = await supertest(app).delete("/students/677693a87933d6cacc1066a6");
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Student with ID 677693a87933d6cacc1066a6 not found');
        });
    });
});
