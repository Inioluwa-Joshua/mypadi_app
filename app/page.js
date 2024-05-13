"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/navbar";

const subjectsData = [
  { code: "Math 101", name: "Mathematics" },
  { code: "Phy 102", name: "Physics" },
  { code: "Chm 102", name: "Chemistry" },
];

const Home = () => {
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
    <div className="text-tecxe-whit">
      <Navbar section={"GPA Calculator"} />

      <div className="text-[white] ">
        {/* <h1>Welcome, {user ? user.displayName : "Guest"}</h1> */}

        <div className="md:w-[60%] w-[90%] mx-auto">
          <div class="relative overflow-x-auto shadow-md">
            <table class="w-full text-sm text-left ">
              <caption class="p-5 text-lg font-semibold text-left">
                GPA Calculator
                <p class="mt-1 text-sm md:text-[1rem] font-normal text-[#aaaaaa]">
                  Calculate your Grade Point Average with ease using our
                  user-friendly GPA calculator. Whether {"you're"} a student or an
                  educator, our tool helps you stay on top of your academic
                  performance. Input your subjects, units, and grades to get
                  instant GPA results. Start calculating now and track your
                  progress effortlessly.
                </p>
              </caption>
              <thead class="text-xs text-gray-700 uppercase bg-[gray]">
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
    </div>
  );
};

export default Home;
