import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CourseCard from "../../components/CourseCard";
import {getAllCourses} from "../../Redux/Slices/CourseSlice"

import HomeLayout from "../../Layouts/HomeLayout"

function CourseList() {
    const dispatch = useDispatch();
    const {courseData, loading, error} = useSelector((state) => state.course);

    async function loadCourses() {
         dispatch(getAllCourses());
    }
    useEffect(() => {
        console.log("Course Data:", courseData);
        loadCourses();
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
  return (
    <HomeLayout>
    <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white">
        <h1 className="text-center text-3xl font-semibold mb-5">
            Explore the courses made by
            <span className="font-bold text-yellow-500">
                Industry experts
            </span>
        </h1>
        <div className="mb-10 flex flex-wrap gap-14">
            {courseData?.map((element) => {
                return <CourseCard key={element._id} data={element} />
            })}
        </div>


    </div>
</HomeLayout>
  )
}

export default CourseList