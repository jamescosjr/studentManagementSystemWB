import { inscriptionGenerator } from '../../domain/utils/generateInscription.js';
import { Student } from '../schema/studentSchema.js';

export function studentRegister(name, inscription, course, year) {
    try{
        const newStudent = new Student({
            name,
            inscription,
            course,
            year,
        })
        return newStudent.save();
    } catch (error) {
        next(error);
    }
    
};

export async function deleteById(id) {
    try {
      return await Student.findByIdAndDelete(id, { lean: true });
    } catch (error) {
      throw new AppError(error.message || "Failed to delete student", 500);
    }
  }
  

export async function updateById(id, name, course, year) {
    try {
      return await Student.findByIdAndUpdate(id, { name, course, year }, {
        new: true,
        lean: true,
      });
    } catch (error) {
      throw new AppError(error.message || "Failed to update student", 500);
    }
  }
  