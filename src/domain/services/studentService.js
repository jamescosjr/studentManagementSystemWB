import { findAll, findByCourse, findByInscription, findByName } from "../../infrastrucuture/repository/studentRepositoryRead";
import { studentRegister, deleteById, updateById } from "../../infrastrucuture/repository/studentRepositoryWrite";
import { AppError, NotFoundError } from "../utils/error/customErros";
import { inscriptionGenerator } from "../utils/generateInscription";

export async function studentRegisterService(name, course, year) {
    const inscription = inscriptionGenerator(course)
    try {
        return await studentRegister(name, inscription, course, year);
    } catch (error) {
        throw new AppError(message, 500)
    }
}

export async function findAllService() {
    try {
        return await findAll();
    }catch (error) {
        throw new AppError(message, 500);
    }
}

export async function updateByIdService(id, name, course, year) {
    try {
      const result = await updateById(id, name, course, year);
      if (!result) {
        throw new NotFoundError(`Student with ID ${id} not found`);
      }
      return result;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new AppError(error.message || "Internal Server Error", 500);
    }
  }
  

  export async function deleteByIdService(id) {
    try {
      const result = await deleteById(id);
      if (!result) {
        throw new NotFoundError(`Student with ID ${id} not found`);
      }
      return result;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new AppError(error.message || "Internal Server Error", 500);
    }
  }
  

export async function findByCourseService (course) {
    try {
        const result = await findByCourse(course);
        if(!result || result.length === 0) {
            throw new NotFoundError();
        }
        return result;
    }catch (error) {
        if (error instanceof NotFoundError) throw error;
        throw new AppError(message, 500);
    }
}

export async function findByNameService (name) {
    try {
        const result = await findByName(name);
        if(!result || result.length === 0) {
            throw new NotFoundError();
        }
        return result;
    }catch (error) {
        if (error instanceof NotFoundError) throw error;
        throw new AppError(message, 500);
    }
}

export async function findByInscriptionService (inscription) {
    try {
        const result = await findByInscription(inscription);
        if(!result || result.length === 0) {
            throw new NotFoundError();
        }
        return result;
    }catch (error) {
        if (error instanceof NotFoundError) throw error;
        throw new AppError(message, 500);
    }
}