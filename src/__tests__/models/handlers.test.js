import {
  createStudentHandler,
  listStudentsHandler,
  findStudentByNameHandler,
  findStudentByInscriptionHandler,
  listStudentsByCourseHandler,
  deleteStudentHandler,
  updateStudentHandler,
} from "../../controllers/studentController.js";
import * as studentRepository from "../../repository/studentRepository.js";
const logSpy = jest.spyOn(console, "log").mockImplementation();
const errorSpy = jest.spyOn(console, "error").mockImplementation();

describe("Student Handlers", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should return a 201 when create a new student", async () => {
    const mockStudent = {
      name: "Test name",
      year: 2022,
      course: "Test course",
    };
    jest.spyOn(studentRepository, "create").mockResolvedValue(mockStudent);

    const req = { body: mockStudent };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await createStudentHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockStudent);
  });
  it("should return a 400 when create a student with invalid data", async () => {
    const mockStudent = {
      name: "Test name",
      year: 2022,
    };
    jest.spyOn(studentRepository, "create").mockResolvedValue(mockStudent);

    const req = { body: mockStudent };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await createStudentHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith("Invalid student data");
  });
  it("should return a 500 when create a student with invalid data", async () => {
    const mockStudent = {
      name: "Test name",
      year: 2022,
      course: "Test course",
    };
    jest
      .spyOn(studentRepository, "create")
      .mockRejectedValue(new Error("Error creating student"));

    const req = { body: mockStudent };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await createStudentHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      "Error creating student: Error creating student"
    );
  });
  it("should return a 200 when list all students", async () => {
    const mockStudents = [
      {
        name: "Test name",
        year: 2022,
        course: "Test course",
      },
      {
        name: "Test name 2",
        year: 2022,
        course: "Test course 2",
      },
    ];
    jest.spyOn(studentRepository, "findAll").mockResolvedValue(mockStudents);

    const req = {};
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

    await listStudentsHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(mockStudents);
  });
  it("should return a 500 when list all students", async () => {
    jest
      .spyOn(studentRepository, "findAll")
      .mockRejectedValue(new Error("Error listing students"));

    const req = {};
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

    await listStudentsHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(
      "Error listing students:",
      "Error listing students"
    );
  });
    it("should return a 200 when find a student by name", async () => {
        const mockStudent = {
        name: "Test name",
        year: 2022,
        course: "Test course",
        };
        jest.spyOn(studentRepository, "findByName").mockResolvedValue(mockStudent);
    
        const req = { params: { name: "Test name" } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    
        await findStudentByNameHandler(req, res);
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(mockStudent);
    });
    it("should return a 404 when find a student by name", async () => {
        jest.spyOn(studentRepository, "findByName").mockResolvedValue(null);
    
        const req = { params: { name: "Test name" } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    
        await findStudentByNameHandler(req, res);
    
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith("Student not found");
    });
    it("should return a 500 when find a student by name", async () => {
        jest
        .spyOn(studentRepository, "findByName")
        .mockRejectedValue(new Error("Error finding student"));
    
        const req = { params: { name: "Test name" } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    
        await findStudentByNameHandler(req, res);
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(
        "Error finding student:",
        "Error finding student"
        );
    });
    it("should return a 200 when find a student by inscription", async () => {
        const mockStudent = {
        name: "Test name",
        year: 2022,
        course: "Test course",
        };
        jest
        .spyOn(studentRepository, "findByInscription")
        .mockResolvedValue(mockStudent);
    
        const req = { params: { inscription: "Test inscription" } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    
        await findStudentByInscriptionHandler(req, res);
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(mockStudent);
    });
    it("should return a 404 when find a student by inscription", async () => {
        jest.spyOn(studentRepository, "findByInscription").mockResolvedValue(null);
    
        const req = { params: { inscription: "Test inscription" } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    
        await findStudentByInscriptionHandler(req, res);
    
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith("Student not found");
    });
    it("should return a 500 when find a student by inscription", async () => {
        jest
        .spyOn(studentRepository, "findByInscription")
        .mockRejectedValue(new Error("Error finding student"));
    
        const req = { params: { inscription: "Test inscription" } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    
        await findStudentByInscriptionHandler(req, res);
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(
        "Error finding student:",
        "Error finding student"
        );
    });
    it("should return a 200 when list students by course", async () => {
        const mockStudents = [
        {
            name: "Test name",
            year: 2022,
            course: "Test course",
        },
        {
            name: "Test name 2",
            year: 2022,
            course: "Test course",
        },
        ];
        jest.spyOn(studentRepository, "findByCourse").mockResolvedValue(mockStudents);
    
        const req = { params: { course: "Test course" } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    
        await listStudentsByCourseHandler(req, res);
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(mockStudents);
    });
    it("should return a 404 when list students by course", async () => {
        jest.spyOn(studentRepository, "findByCourse").mockResolvedValue([]);
    
        const req = { params: { course: "nonExistent" } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    
        await listStudentsByCourseHandler(req, res);
    
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith("Students not found");
    });
    it("should return a 500 when list students by course", async () => {
        jest
        .spyOn(studentRepository, "findByCourse")
        .mockRejectedValue(new Error("Error finding students"));
    
        const req = { params: { course: "Test course" } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    
        await listStudentsByCourseHandler(req, res);
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(
        "Error finding students:",
        "Error finding students"
        );
    });
    it("should return a 200 when delete a student", async () => {
        const mockStudent = {
        name: "Test name",
        year: 2022,
        course: "Test course",
        };
        jest.spyOn(studentRepository, "deleteById").mockResolvedValue(mockStudent);
    
        const req = { params: { id: "123" } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    
        await deleteStudentHandler(req, res);
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith("Student deleted successfully");
    });
    it("should return a 404 when delete a student", async () => {
        jest.spyOn(studentRepository, "deleteById").mockResolvedValue(null);
    
        const req = { params: { id: "123" } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    
        await deleteStudentHandler(req, res);
    
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith("Student not found");
    });
    it("should return a 500 when delete a student", async () => {
        jest
        .spyOn(studentRepository, "deleteById")
        .mockRejectedValue(new Error("Error deleting student"));
    
        const req = { params: { id: "123" } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    
        await deleteStudentHandler(req, res);
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(
        "Error deleting student:",
        "Error deleting student"
        );
    });
    it("should return a 200 when update a student", async () => {
        const mockStudent = {
        name: "Test name",
        year: 2022,
        course: "Test course",
        };
        jest.spyOn(studentRepository, "updateById").mockResolvedValue(mockStudent);
    
        const req = { params: { id: "123" }, body: mockStudent };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    
        await updateStudentHandler(req, res);
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(mockStudent);
    });
    it("should return a 404 when update a student", async () => {
        jest.spyOn(studentRepository, "updateById").mockResolvedValue(null);
    
        const req = { params: { id: "123" }, body: {} };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    
        await updateStudentHandler(req, res);
    
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith("Student not found");
    });
    it("should return a 500 when update a student", async () => {
        jest
        .spyOn(studentRepository, "updateById")
        .mockRejectedValue(new Error("Error updating student"));
    
        const req = { params: { id: "123" }, body: {} };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    
        await updateStudentHandler(req, res);
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(
        "Error updating student:",
        "Error updating student"
        );
    });
});
