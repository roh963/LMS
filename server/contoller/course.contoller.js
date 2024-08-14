import AppError from "../utils/errors.utils.js";
import Course from "../models/course.models.js";
import cloudinary from 'cloudinary'
import fs from "fs/promises"
import { json } from "express";
import path from "path";

const getAllCourses = async (req, res, next) => {
    const courses = await Course.find({}).select('-lectures');

    res.status(200).json({
        success: true,
        message: 'All courses',
        courses
    })
};
const getLecturesByCoursId = async (req, res, next) => {
    try {
        const { id } = req.params;

        const course = await Course.findById(id);
        if (!course) {
            return next(new AppError('Invalid course id or course not found.', 404));
        }
        res.status(200).json({
            success: true,
            message: 'Course lectures fetched successfully',
            lectures: course.lectures,
        });

    } catch (e) {
        return next(new AppError(e.message, 500));
    }



};

const createCourse = async (req, res, next) => {
    try {
        const { title, description, category, createdBy } = req.body;
        console.log(title, description, category, createdBy);

        if (!title || !description || !category || !createdBy) {
            return next(new AppError('All fields are required', 400));
        }

        const course = await Course.create({
            title,
            description,
            category,
            createdBy,
            thumbnail: {
                public_id: 'Dummy',
                secure_url: 'Dummy',
            },
        })
        console.log(course);


        if (!course) {
            return next(new AppError('Course could not created, please try again', 500));
        }

        // file upload
        if (req.file) {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'lms',
            })

            if (result) {
                course.thumbnail.public_id = result.public_id;
                course.thumbnail.secure_url = result.secure_url;
            }

            fs.rm(`uploads/${req.file.filename}`);
        }

        await course.save();

        res.status(200).json({
            success: true,
            message: 'Course successfully created',
            course
        })

    } catch (e) {
        return next(new AppError(e.message, 500));
    }
};
const updateCourse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const course = await Course.findByIdAndUpdate(id, {
            $set: req.body
        }, {
            runValidators: true
        }
        )
        if (!course) {
            return new AppError('Course could not updated, please try again', 500);
        }
        res.status(200).json({
            success: true,
            message: 'course updated successfully!'
        })
    } catch (e) {
        new AppError(e.message, 500)

    }
}
const removeCourse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id);
        if (!course) {
            return new AppError('Course could not be deleted, please try again', 500);
        }
        await Course.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: 'course remove successfully!'
        })
    } catch (e) {
        new AppError(e.message, 500)

    }
}

const addLectureToCourseById = async (req, res, next) => {

    try {
        const { title, description } = req.body;
        const { id } = req.params;
        if (!title || !description) {
            return next(new AppError('All field are required', 400))
        }
        const course = await Course.findById(id);
        if (!course) {
            return new AppError('Course throgth are adding lecture, please try again', 500);
        }
        const lectureData = {
            title,
            description,
            lecture: {}
        }
        if (req.file) {
            try {
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: 'lms',
                    resource_type: "video"
                });
                if (result) {
                    lectureData.lecture.public_id = result.public_id;
                    lectureData.lecture.secure_url = result.secure_url;
                }

                fs.rm(`uploads/${req.file.filename}`);
            } catch (e) {
                return next(new AppError(e.message, 500));
            }
        }
        course.lectures.push(lectureData);
        course.numberOfLectures = course.lectures.length;
        await course.save();
        res.status(200).json({
            success: true,
            message: 'lecture added successfully'
        })
    } catch (e) {
        return next(new AppError(e.message, 500));
    }

}

const deleteCourseLecture = async(req,res,next)=>{
    try {
        const { courseId, lectureId } = req.query;
        const course = await Course.findById(courseId);
        if (!course) {
            return next(new AppError('Course not found', 404));
        }
        const lectureIndex = course.lectures.findIndex(lecture => lecture._id.toString() === lectureId);
        if (lectureIndex === -1) {
            return next(new AppError('Lecture not found in the course', 404));
        }
        course.lectures.splice(lectureIndex, 1);

        course.numberOfLectures = course.lectures.length;

        await course.save();

        res.status(200).json({
            success: true,
            message: 'Lecture deleted successfully'
        });
    } catch (error) {
        return next(new AppError(e.message, 500));
    }
}

const updateCourseLecture = async (req, res, next) => {
    try {
        const { courseId, lectureId } = req.query;
        const { title, description } = req.body;

        if (!title || !description) {
            return next(new AppError('All fields are required', 400));
        }

        const course = await Course.findById(courseId);

        if (!course) {
            return next(new AppError('Course not found', 404));
        }

        const lectureIndex = course.lectures.findIndex(lecture => lecture._id.toString() === lectureId);

        if (lectureIndex === -1) {
            return next(new AppError('Lecture not found in the course', 404));
        }

        const updatedLectureData = {
            title,
            description,
            lecture: {
                public_id: course.lectures[lectureIndex].lecture.public_id,
                secure_url: course.lectures[lectureIndex].lecture.secure_url
            }
        };

        if (req.file) {
            try {
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: 'lms',
                    resource_type: "video"
                });
                if (result) {
                    updatedLectureData.lecture.public_id = result.public_id;
                    updatedLectureData.lecture.secure_url = result.secure_url;
                }

                // If there's an existing video, delete the old one from Cloudinary
                if (course.lectures[lectureIndex].lecture.public_id) {
                    await cloudinary.v2.uploader.destroy(course.lectures[lectureIndex].lecture.public_id);
                }

                fs.rm(`uploads/${req.file.filename}`);
            } catch (e) {
                return next(new AppError(e.message, 500));
            }
        }

        // Update the lecture details
        course.lectures[lectureIndex] = updatedLectureData;

        await course.save();

        res.status(200).json({
            success: true,
            message: 'Lecture updated successfully'
        });
    } catch (e) {
        return next(new AppError(e.message, 500));
    }
};

export {
    getAllCourses,
    getLecturesByCoursId,
    createCourse,
    updateCourse,
    removeCourse,

    addLectureToCourseById,
    deleteCourseLecture,
    updateCourseLecture
}