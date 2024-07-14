import { Router } from 'express';
import { authorizeRoles, authorizeSubscribers, isLoggedIn } from '../middlewares/auth.middlware.js';
import { addLectureToCourseById, createCourse, getAllCourses, getLecturesByCoursId, removeLectureFromCourse, updateCourseById } from '../contoller/course.contoller.js';
import upload from "../middlewares/multer.middleware.js"

const router = Router();

router
    .route('/')
    .get(getAllCourses)
    .post(
        isLoggedIn,
        authorizeRoles('ADMIN'),
        upload.single('thumbnail'),
        createCourse
    )
    .delete(isLoggedIn, authorizeRoles('ADMIN'), removeLectureFromCourse);

router
    .route('/:id')
    .get(isLoggedIn, authorizeSubscribers,getLecturesByCoursId) // Added authorizeSubscribers to check if user is admin or subscribed if not then forbid the access to the lectures
    .post(
        isLoggedIn,
        authorizeRoles('ADMIN'),
        upload.single('lecture'),
        addLectureToCourseById
    )
    .put(isLoggedIn, authorizeRoles('ADMIN'), updateCourseById);


export default router;