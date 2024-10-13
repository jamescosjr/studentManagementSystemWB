import request from "supertest";
import { app, server } from "../../../server.js";
import { students } from "../../repository/studentRepository.js";

afterAll((done) => {
  server.close(done);
});

describe("Student Routes", () => {
    beforeEach(() => {
        jest.resetModules();
        students.splice(0, students.length);
      });
    it ("should do all the process of create a new student", async () => {
        const student = {
            name: "John Doe",
            course: "Engineering",
            year: 2000,
          };
      
          const response = await request(app).post("/students").send(student);
      
          expect(response.status).toBe(201);
          expect(response.body).toEqual(expect.objectContaining(student));
    });
    it("should return 400 for invalid student data", async () => {
        const student = {
            name: "John Doe",
            course: "Engineering",
            year: "2000",
          };
      
          const response = await request(app).post("/students").send(student);
      
          expect(response.status).toBe(400);
          expect(JSON.parse(response.text)).toBe("Invalid student data");
    });
    it("should return all students", async () => {
        students.push({ name: "John Doe", course: "Engineering", year: 2000 });
        students.push({ name: "Jane Doe", course: "Medicine", year: 2001 });
      
        const response = await request(app).get("/students");
      
        expect(response.status).toBe(200);
        expect(response.body).toEqual(students);
    });
    it("should return a student by name", async () => {
        students.push({ name: "John Doe", course: "Engineering", year: 2000 });
        students.push({ name: "Jane Doe", course: "Medicine", year: 2001 });
      
        const response = await request(app).get("/students/name/John Doe");
      
        expect(response.status).toBe(200);
        expect(response.body).toEqual(students[0]);
    });
    it("should return 404 for a non-existing student name", async () => {
        students.push({ name: "John Doe", course: "Engineering", year: 2000 });
        students.push({ name: "Jane Doe", course: "Medicine", year: 2001 });
      
        const response = await request(app).get("/students/name/Non-existing Name");
      
        expect(response.status).toBe(404);
        expect(response.text).toBe("Student not found");
    });
    it("should return a student by inscription", async () => {
        students.push({ name: "John Doe", course: "Engineering", year: 2000, inscription: "unique-inscription" });
        students.push({ name: "Jane Doe", course: "Medicine", year: 2001 });
      
        const response = await request(app).get("/students/inscription/unique-inscription");
      
        expect(response.status).toBe(200);
        expect(response.body).toEqual(students[0]);
    });
    it("should return 404 for a non-existing student inscription", async () => {
        students.push({ name: "John Doe", course: "Engineering", year: 2000 });
        students.push({ name: "Jane Doe", course: "Medicine", year: 2001 });
      
        const response = await request(app).get("/students/inscription/non-existing-inscription");
      
        expect(response.status).toBe(404);
        expect(response.text).toBe("Student not found");
    });
    it("should return students by course", async () => {
        students.push({ name: "John Doe", course: "Engineering", year: 2000 });
        students.push({ name: "Jane Doe", course: "Medicine", year: 2001 });
        students.push({ name: "Alice Doe", course: "Engineering", year: 2002 });
      
        const response = await request(app).get("/students/course/Engineering");
      
        expect(response.status).toBe(200);
        expect(response.body).toEqual([students[0], students[2]]);
    });
    it("should return 404 for a non-existing course", async () => {
        students.push({ name: "John Doe", course: "Engineering", year: 2000 });
        students.push({ name: "Jane Doe", course: "Medicine", year: 2001 });
      
        const response = await request(app).get("/students/course/Non-existing Course");
      
        expect(response.status).toBe(404);
        expect(response.text).toBe("Students not found");
    });
    it("should create a student calling the route and then delete by id", async () => {
        const student = {
            name: "John Doe",
            course: "Engineering",
            year: 2000,
          };
      
          const response = await request(app).post("/students").send(student);
      
          expect(response.status).toBe(201);
          expect(response.body).toEqual(expect.objectContaining(student));
      
          const deletedResponse = await request(app).delete(`/students/${response.body.id}`);
      
          expect(deletedResponse.status).toBe(200);
    });
    it("should return 404 for a non-existing student id", async () => {
        const response = await request(app).delete("/students/non-existing-id");
      
        expect(response.status).toBe(404);
        expect(response.text).toBe("Student not found");
    });
    it("should create a student calling the route and then update by id", async () => {
        const student = {
            name: "John Doe",
            course: "Engineering",
            year: 2000,
          };
      
          const response = await request(app).post("/students").send(student);
      
          expect(response.status).toBe(201);
          expect(response.body).toEqual(expect.objectContaining(student));
      
          const updatedStudent = {
            name: "John Doe Updated",
            course: "Medicine",
            year: 2001,
          };
      
          const updatedResponse = await request(app).put(`/students/${response.body.id}`).send(updatedStudent);
      
          expect(updatedResponse.status).toBe(200);
          expect(updatedResponse.body).toEqual(expect.objectContaining(updatedStudent));
    });
    it("should return 404 for a non-existing student id", async () => {
        const response = await request(app).put("/students/non-existing-id");
      
        expect(response.status).toBe(404);
        expect(response.text).toBe("Student not found");
    });
});