"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/navbar";
import Modal from "@/components/Modal";
import BannerAd from "@/components/ads/BannerAd";

const subjectsData = [
  { code: "Math 101", name: "Mathematics" },
  { code: "Phy 102", name: "Physics" },
  { code: "Chm 102", name: "Chemistry" },
];

const Home = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (typeof storedUser !== "undefined" && storedUser !== null) {
      // If user data is available, update the state
      setUser(JSON.parse(storedUser));
    } else {
      // If user data is not available, set default state
      localStorage.clear();
      setUser(null); // or whatever default value you want
    }
  }, []);

  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState([]);
  const [points, setPoints] = useState([]);
  const [gpa, setGPA] = useState(0);
  const [notification, setNotification] = useState("");

  const handleAddSubject = () => {
    // Add a new subject to the list
    setSubjects([...subjects, ""]);
    setGrades([...grades, ""]);
    setPoints([...points, ""]);
  };

  const handleSubjectChange = (index, value) => {
    // Update the subject for the grade at the specified index
    const newSubjects = [...subjects];
    newSubjects[index] = value;
    setSubjects(newSubjects);
  };

  const handleGradeChange = (index, value) => {
    // Update the grade for the subject at the specified index
    const newGrades = [...grades];
    newGrades[index] = value;
    setGrades(newGrades);
  };

  const handlePointChange = (index, value) => {
    // Update the points for the subject at the specified index
    const newPoints = [...points];
    newPoints[index] = value;
    setPoints(newPoints);
  };

  const handleDeleteSubject = (index) => {
    setNotification("");
    // Create copies of the subjects, grades, and points arrays
    const newSubjects = [...subjects];
    const newGrades = [...grades];
    const newPoints = [...points];

    // Remove the course at the specified index from each array
    newSubjects.splice(index, 1);
    newGrades.splice(index, 1);
    newPoints.splice(index, 1);

    // Update the state with the new arrays
    setSubjects(newSubjects);
    setGrades(newGrades);
    setPoints(newPoints);
  };

  const calculateGPA = () => {
    if (grades.length == 0 || points.length == 0) {
      setNotification("You need to fill in at least a course.");
      return;
    }
    // setNotification("");
    // Filter out empty subjects
    const nonEmptySubjects = subjects.filter((subject, index) => {
      return (
        subject.trim() !== "" || grades[index] !== "" || points[index] !== ""
      );
    });

    setSubjects(nonEmptySubjects);
    // Find index of first empty subject field with grade or point filled
    const emptySubjectIndex = subjects.findIndex((subject, index) => {
      return (
        (subject.trim() !== "" && grades[index] === "") ||
        (subject.trim() !== "" && points[index] === "")
      );
    });

    console.log("Empty Subject Index:", subjects[emptySubjectIndex]);

    // If an empty subject field with grade or point filled is found
    if (emptySubjectIndex !== -1) {
      const fieldName = subjects[emptySubjectIndex] !== "" ? "unit/grade" : "";
      setNotification(
        `Please input the course ${fieldName} for Subject number ${
          emptySubjectIndex + 1
        }`
      );
      return;
    } else {
      setNotification("");
    }

    // Calculate GPA based on grades and points of non-empty subjects
    let totalPoints = 0;
    let totalCredits = 0;
    for (let i = 0; i < nonEmptySubjects.length; i++) {
      totalPoints += getGradePoints(grades[i]) * parseFloat(points[i]);
      totalCredits += parseFloat(points[i]);
    }
    const gpa = totalPoints / totalCredits;
    setGPA(gpa);
  };

  const getGradePoints = (grade) => {
    switch (grade) {
      case "A":
        return 5;
      case "B":
        return 4;
      case "C":
        return 3;
      case "D":
        return 2;
      case "E":
        return 1;
      case "F":
        return 0;
      default:
        return 0;
    }
  };

  return (
    <div className="" id="top">
      <div>
        <BannerAd />
      </div>
      <Navbar section={"GPA Calculator"} />

      <div className="text-[white] ">
        {/* <h1>Welcome, {user ? user.displayName : "Guest"}</h1> */}

        <div className="md:w-[60%] w-[90%] mx-auto">
          <div className="px-5 pb-3 flex justify-center items-center gap-1 flex-wrap lg:hidden">
            <p className=" text-[.7rem] text-[white] text-left">
              Want To Calculate Your CGPA?
            </p>
            <a
              href="/cgpa"
              className="text-[white] bg-[#0080008f] rounded-[5px] px-2 py-1 text-[.8rem] underline hover:bg-[#37c125] font-[500]"
            >
              Calculate CGPA
            </a>
          </div>
          <div class="relative overflow-x-auto shadow-md">
            <table class="w-full text-sm text-left ">
              <caption class="px-5 lg:py-5 text-[1.4rem] font-semibold text-left">
                Predict Your GPA
                <p class="mt-2 mb-3 text-sm md:text-[1rem] font-normal text-[#ffffffbe] text-justify">
                  Explore the power of our GPA prediction tool to stay ahead in
                  your academic journey. Whether {"you're"} a student planning
                  your next semester or an educator guiding your students, our
                  intuitive calculator simplifies the process. Input your
                  subjects, units, and anticipated grades to forecast your GPA
                  instantly. Begin predicting your GPA today and make informed
                  decisions about your academic goals.
                </p>
              </caption>
              <thead class="text-xs text-gray-700 uppercase bg-[gray] ">
                <tr>
                  <th scope="col" class=""></th>
                  <th scope="col" class="px-2 py-3">
                    Course Title (Optional)
                  </th>
                  <th scope="col" class="px-2 py-3">
                    Unit
                  </th>
                  <th scope="col" class="px-2 py-3">
                    Grade
                  </th>
                  <th scope="col" class="px-2 py-3">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              {subjects.map((subject, index) => (
                <tbody key={index}>
                  <tr class="bg-white border-b">
                    <th
                      scope="row"
                      class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap border-r-[1px]"
                    >
                      <span>{index + 1}</span>
                    </th>
                    <td class="px-2 py-1">
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) =>
                          handleSubjectChange(index, e.target.value)
                        }
                        className="bg-[transparent] w-full h-full border-b- outline-none"
                      />
                    </td>
                    <td class="px-2 py-2 w-[100px] border-l-[1px]">
                      <input
                        type="text"
                        value={points[index]}
                        onChange={(e) =>
                          handlePointChange(index, e.target.value)
                        }
                        className="bg-[transparent] w-[100%] h-full outline-none"
                      />
                    </td>
                    <td class="px-2 py-2 border-l-[1px]">
                      <select
                        value={grades[index]}
                        onChange={(e) =>
                          handleGradeChange(index, e.target.value)
                        }
                        className="bg-[#0a0f0f] w-[50px] md:w-[initial]"
                      >
                        <option value="">Select Grade</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                        <option value="F">F</option>
                      </select>
                    </td>
                    <td class="px-2 py-2 text-right border-l-[1px]">
                      <button
                        onClick={() => handleDeleteSubject(index)}
                        class="font-medium text-blue-600 hover:underline text-[red]"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
            <button
              onClick={handleAddSubject}
              className="w-full bg-[#284a56] py-1"
            >
              Add Subject
            </button>
          </div>
          {notification && <p style={{ color: "red" }}>{notification}</p>}
          {subjects.length > 0 && (
            <div className="my-4">
              <button
                onClick={calculateGPA}
                className="py-2 px-5 font-[600] bg-social-green rounded"
              >
                Calculate GPA
              </button>
              {/* Display GPA if it exists */}
              {gpa !== 0 && (
                <div>
                  <p className="text-center text-[1.2rem] font-[600]">
                    GPA: {gpa.toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="text-[white] py-12  xl:px-14">
        <div className="md:container w-[90%] mx-auto px-4">
          <div className="md:w-[70%]">
            <div className="">
              <h2 className="text-[1.3rem] font-[500]">How It Works</h2>
              <p className="text-[#ffffffd2]">
                Our GPA calculator simplifies the process of determining your
                Grade Point Average (GPA) by providing a straightforward and
                efficient tool. Follow these simple steps to calculate your GPA:
              </p>
            </div>
            <div className="mt-5 grid grid-cols-1 md:gap-3">
              <div className="flex flex-col">
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  <span className="">1</span> - Input Your Courses
                </h3>
                <p className="mt-2 text-base text-[#ffffffd2]">
                  Begin by entering the names of your courses or subjects into
                  the designated fields. You can add as many courses as you
                  need.
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  <span className="">2</span> - Enter Your Grades
                </h3>
                <p className="mt-2 text-base text-[#ffffffd2]">
                  For each course, select the grade you received from the
                  dropdown menu. Grades range from A (excellent) to F (fail).
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  <span className="">3</span> - Provide Credit Units
                </h3>
                <p className="mt-2 text-base text-[#ffffffd2]">
                  Assign credit units or hours to each course based on its
                  weight or workload. These units represent the value or weight
                  of each course.
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  <span className="">4</span> - Calculate Your GPA
                </h3>
                <p className="mt-2 text-base text-[#ffffffd2]">
                  Once {"you've"} entered all your courses, grades, and credit
                  units, click the {'"Calculate GPA"'} button. Our calculator
                  will instantly compute your GPA based on the information
                  provided.
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  <span className="">5</span> - View Your GPA
                </h3>
                <p className="mt-2 text-base text-[#ffffffd2]">
                  Your GPA results will be displayed on the screen, providing
                  you with an accurate assessment of your academic performance.
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  <span className="">6</span> - Sreenshot Result
                </h3>
                <p className="mt-2 text-base text-[#ffffffd2]">
                  If desired, you can screenshot your GPA results for future
                  reference or academic planning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="community"
        class="flex items-center w-full justify-center relative bg-[#ffffff1a]"
      >
        <div class="mb-8 text-center w-[90%] md:w-[70%] pt-[4rem]">
          <h1 class="text-[1.5rem] font-[600] leading-snug tracking-tight lg:text-[2rem] lg:leading-tight text-tecxe-white capitalize">
            Join a Community on campus
          </h1>
          <div class="w-[78%] md:w-[70%] mx-auto">
            <p class="font-[400] py-5 text-[1rem] leading-normal text-tecxe-white lg:text-[1.2rem]  dark:text-gray-300">
              Discover campus communities aligned with your interests.
            </p>
          </div>
          <div class="flex justify-center  flex-col md:flex-row gap-3">
            <button
              onClick={() => setOpen(true)}
              class="px-6 py-3 mt-3 text-center font-[500] text-[.9rem] md:text-[1.2rem] text-tecxe-white bg-[#30843d] rounded-[100px] lg:ml-5 capitalize"
            >
              Find Community
            </button>
          </div>
        </div>
      </div>

      <footer class="text-[white] rounded-lg shadow m-4">
        <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span class="text-sm sm:text-center ">
            © 2024{" "}
            <a href="https://flowbite.com/" class="hover:underline">
              MyPadi Schools
            </a>
            . All Rights Reserved.
          </span>
          <ul class="flex flex-wrap items-center mt-3 text-sm font-medium sm:mt-0">
            {/* <li>
              <a href="#" class="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li> */}
            <li>
              <a href="#top" class="hover:underline">
                Back To Top
              </a>
            </li>
          </ul>
        </div>
      </footer>
      <div className="">
        <Modal open={open} onClose={() => setOpen(false)}>
          <div className="  w-[19rem] md:w-[22rem]">
            {/* <DeleteIcon size={56} className="mx-auto text-red-500" /> */}
            <div className=" my-4 w-50">
              <h3 className="text-[1.5rem] font-[600] my-2">Communities</h3>
              <p className="text-[1rem] text-gray-500 text-center border border-[#544a4a] p-2">
                No available community to join
              </p>
            </div>
            <p className="text-[1.3rem] font-[500] text-center">
              To promote your community contact us.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setOpen(false)}
                type="button"
                class="font-[700] border focus:outline-none text-white bg-purple-700 hover:bg-[#bc1717] hover:text-tecxe-white hover:border-none text-sm px-5 py-2.5"
              >
                Cancel
              </button>
              <a
                href="https://wa.link/s9lw2t"
                target="blank"
                className="bg-social-green text-tecxe-white font-[700] w-full hover:bg-[green] flex justify-center items-center p-0"
              >
                Contact Us
              </a>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Home;
