import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import AppError from "../utils/errors.utils.js";
import Course from "../models/course.models.js";
import cloudinary from 'cloudinary'
import fs from "fs/promises"
import { json } from "express";
import path from "path";

const getAllCourses = asyncHandler(async (req, res, next) => {
    const courses = await Course.find({}).select('-lectures');

    res.status(200).json({
        success: true,
        message: 'All courses',
        courses
    })
});
const getLecturesByCoursId = asyncHandler(async (req, res, next) => {
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


});

const createCourse = asyncHandler(async (req, res, next) => {
    const { title, description, category, createdBy } = req.body;

    if (!title || !description || !category || !createdBy) {
        return next(new AppError('All field are required', 404));
    }

    const course = await Course.create({
        title,
        description,
        category,
        createdBy
    });

    if (!course) {
        return next(new AppError('course could not be crated plase try again', 404));
    }

    if (req.file) {
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'lms',
            });
            if (result) {
                course.thumbnail.public_id = result.public_id
                course.thumbnail.secure_url = result.secure_url
            }
            fs.rm(`uploads/${req.file.filename}`)
        } catch (e) {
            for (const file of await fs.readdir(`uploads/`)) {

                await fs.unlink(path.join('uploads', file))
            }
            return next(new AppError(JSON.stringify(e) || "fill not uploads, please try again", 404));
        }
    }
    await course.save();
    res.status(200).json({
        success: true,
        message: 'course lecture feteched succcesfully',
        course
    })
});

const removeLectureFromCourse = asyncHandler(async (req, res, next) => {
    const { courseId, lectureId } = req.query;
    if (!courseId) {
        return next(new AppError('Course Id is required ', 404));
    }
    if (!lectureId) {
        return next(new AppError('leture Id is required', 404));
    }

    const course = await Course.findById(courseId);
    if (!course) {
        return next(new AppError('Invalid course invalid .', 404));
    }
    const lectureIndex = course.lectures.findIndex((lecture) => lecture._id.toString() === lectureId.toString());

    if (lectureIndex === -1) {
        return next(new AppError('lecture does not exist.', 404));
    }
    await cloudinary.v2.uploader.destroy(
        course.lectures[lectureIndex].lecture.public_id, {
        resource_type: 'video',
    }
    );
    course.lectures.splice(lectureIndex, 1);

    course.numberOfLectures = course.lectures.length;

    await course.save();
    res.status(200).json({
        success: true,
        message: 'course remove succcesfully',
    });
});

const addLectureToCourseById = asyncHandler(async (req, res, next) => {
    const { title, description } = req.body;
    const { id } = req.params;
    let lectureData = {};
    if (!title || !description) {
        return next(new AppError('Title and Description are required', 400));
    }
    const course = await Course.findById(id);

    if (!course) {
        return next(new AppError('Invalid course id or course not found.', 400));
    }

    if (req.file) {
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'lms', // Save files in a folder named lms
                chunk_size: 50000000, // 50 mb size
                resource_type: 'video',
            });

            // If success
            if (result) {
                // Set the public_id and secure_url in array
                lectureData.public_id = result.public_id;
                lectureData.secure_url = result.secure_url;
            }

            // After successful upload remove the file from local storage
            fs.rm(`uploads/${req.file.filename}`);

        } catch (e) {
            for (const file of await fs.readdir('uploads/')) {
                await fs.unlink(path.join('uploads/', file));
            }
            return next(
                new AppError(
                    JSON.stringify(error) || 'File not uploaded, please try again',
                    400
                )
            );

        }
    }
    course.lectures.push({
        title,
        description,
        lecture: lectureData,
    });
    course.numberOfLectures = course.lectures.length;
    await course.save();
    res.status(200).json({
        success: true,
        message: 'Course lecture added successfully',
        course,
    });
});

const updateCourseById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const course = await Course.findByIdAndUpdate(
        id,
        {
            $set: req.body, // This will only update the fields which are present
        },
        {
            runValidators: true, // This will run the validation checks on the new data
        }
    );
    if (!course) {
        return next(new AppError('Invalid course id or course not found.', 400));
    }
    res.status(200).json({
        success: true,
        message: 'Course updated successfully',
      });    

})

export {
    getAllCourses,
    getLecturesByCoursId,
    createCourse,
    removeLectureFromCourse,
    addLectureToCourseById,
    updateCourseById

}