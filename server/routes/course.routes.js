import { Router } from 'express';
const router = Router();
import {authorizeRoles, authorizeSubscribers, isLoggedIn } from '../middlewares/auth.middlware.js';
import { getAllCourses, getLecturesByCoursId, createCourse, updateCourse, removeCourse, addLectureToCourseById, deleteCourseLecture, updateCourseLecture } from '../contoller/course.contoller.js';
import upload from "../middlewares/multer.middleware.js"


router.route('/')
    .get(isLoggedIn, getAllCourses)
    .post(isLoggedIn, authorizeRoles('ADMIN'), upload.single("thumbnail"), createCourse)
    .delete( isLoggedIn, authorizeRoles('ADMIN'), deleteCourseLecture)
    .put(isLoggedIn, authorizeRoles('ADMIN'), upload.single("lecture"), updateCourseLecture)


router.route('/:id')
    .get(isLoggedIn, getLecturesByCoursId)
    .put(isLoggedIn, authorizeRoles('ADMIN'), updateCourse)
    .delete(isLoggedIn, authorizeRoles('ADMIN'), removeCourse)
    .post(isLoggedIn,authorizeRoles('ADMIN'),upload.single("lecture"), addLectureToCourseById)

   

export default router;