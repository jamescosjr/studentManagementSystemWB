import { Student } from "../schema/studentSchema.js"

export function findAll() {
    try {
        return Student.find();
    } catch (error) {
        next(error);
    }
};

export async function findByName(name){
    try{
        return Student.find({ name })   
    } catch (error) {
        next(error);
    }
};

export async function findByInscription(inscription) { 
    try{
        return Student.find({ inscription }) 
    } catch (error) {
        next(error);
    }
};

export async function findByCourse(course) { 
    try {
        return Student.find({ course }) 
    }catch (error) {
        next(error)
    }
};
