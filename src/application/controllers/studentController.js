import {
  studentRegisterService,
  findAllService,
  updateByIdService,
  deleteByIdService,
  findByCourseService,
  findByNameService,
  findByInscriptionService
} from "../../domain/services/studentService.js";
import { AppError, ValidationError, NotFoundError } from "../../domain/utils/error/customErros.js";
import { validStudentData } from "../../domain/utils/validation.js";

export async function studentRegisterController (req, res, next) {
  const { name, course, year } = req.body;
  const validation = validStudentData(name, course, year);
  if (!validation.valid) {
    return next(new ValidationError(validation.message));
  }
  try {
    const result = await studentRegisterService(name, course, year);
    res.status(201).json(result);
  } catch (error) {
    next(new AppError(AppError.message, 500));
  }
}

export async function findAllController (req, res, next) {
  try {
    const result = await findAllService();
    res.status(200).json(result);
  } catch (error) {
    next(new AppError(AppError.message, 500));
  }
}

export async function updateByIdController(req, res, next) {
  const { id } = req.params;
  const { name, course, year } = req.body;

  const validation = validStudentData(name, course, year);
  if (!validation.valid) {
    return next(new ValidationError(validation.message));
  }

  try {
    const result = await updateByIdService(id, name, course, year);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return next(error);
    }
    next(new AppError(AppError.message, 500));
  }
}


export async function deleteByIdController(req, res, next) {
  const { id } = req.params;
  try {
    const result = await deleteByIdService(id);
    res.status(200).json({ message: "Student deleted successfully", data: result });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return next(error);
    }
    next(new AppError(AppError.message, 500));
  }
}


export async function findByCourseController (req, res, next) {
  const { course } = req.params;
  try {
    const result = await findByCourseService(course);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return next(error);
    }
      next(new AppError(AppError.message, 500));  }
}

export async function findByNameController (req, res, next) {
  const { name } = req.params;
  try {
    const result = await findByNameService(name);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return next(error);
    }
      next(new AppError(AppError.message, 500));  }
}

export async function findByInscriptionController (req, res, next) {
  const { inscription } = req.params;
  try {
    const result = await findByInscriptionService(inscription);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return next(error);
    }
      next(new AppError(AppError.message, 500));  }
}