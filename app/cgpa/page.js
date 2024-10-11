"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/navbar";
import Modal from "@/components/Modal";
import BannerAd from "@/components/ads/BannerAd";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cgpa, setCGPA] = useState(0);
  const [semesters, setSemesters] = useState([
    { name: "Year 1 (1st Semester)", totalGrade: "", totalCreditUnit: "" },
    { name: "Year 1 (2nd Semester)", totalGrade: "", totalCreditUnit: "" },
  ]);
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

  useEffect(() => {
    calculateCGPA();
  }, [semesters]);

  const handleAddSemester = () => {
    const semesterNumber = Math.floor(semesters.length / 2) + 1;
    const semesterType = semesters.length % 2 === 0 ? "1st" : "2nd";
    const newSemester = {
      name: `Year ${semesterNumber} (${semesterType} Semester)`,
      totalGrade: "",
      totalCreditUnit: "",
    };
    setSemesters([...semesters, newSemester]);
  };

  const calculateCGPA = () => {
    let totalGradePoints = 0;
    let totalCreditUnits = 0;

    semesters.forEach((semester) => {
      if (semester.totalGrade && semester.totalCreditUnit) {
        totalGradePoints += parseFloat(semester.totalGrade);
        totalCreditUnits += parseFloat(semester.totalCreditUnit);
      }
    });

    if (totalCreditUnits === 0) {
      setCGPA(0);
    } else {
      const calculatedCGPA = totalGradePoints / totalCreditUnits;
      setCGPA(calculatedCGPA.toFixed(2));
    }
  };

  return (
    <div className="text-tecxe-whit" id="top">
      <div>
        <BannerAd />
      </div>
      <Navbar section={"CGPA Calculator"} />

      <div className="text-[white] ">
        {/* <h1>Welcome, {user ? user.displayName : "Guest"}</h1> */}

        <div className="md:w-[60%] w-[90%] mx-auto">
          <div className="relative overflow-x-auto shadow-md">
            <table className="w-full text-sm text-left">
              <caption className="p-5 text-[1.4rem] font-semibold text-left">
                Calculate Your CGPA
                <p className="mt-2 text-sm md:text-[1rem] font-normal text-[#ffffffbe] text-justify">
                  {"Here's"} how it works: Enter your total grade point and
                  total credit unit for each semester. Your CGPA is calculated
                  automatically, helping you track your progress seamlessly.
                </p>
              </caption>
            </table>
            <div>
              <div className="flex flex-col">
                {semesters.map((semester, index) => (
                  <div
                    key={index}
                    className="border border-[gray] rounded-[10px] py-3 px-4 bg-[#ffffff15] mb-3"
                  >
                    <h3>{semester.name}</h3>
                    <div className="flex gap-4">
                      <div>
                        <p className="">Total Grade Point</p>
                        <input
                          type="number"
                          placeholder="E.g 85"
                          value={semester.totalGrade}
                          onChange={(e) => {
                            const newSemesters = [...semesters];
                            newSemesters[index].totalGrade = e.target.value;
                            setSemesters(newSemesters);
                          }}
                          className="w-[100%] bg-[transparent] border border-[white] outline-none p-2 py-1"
                        />
                      </div>
                      <div>
                        <p>Total Credit Unit</p>
                        <input
                          type="number"
                          placeholder="E.g 20"
                          value={semester.totalCreditUnit}
                          onChange={(e) => {
                            const newSemesters = [...semesters];
                            newSemesters[index].totalCreditUnit =
                              e.target.value;
                            setSemesters(newSemesters);
                          }}
                          className="w-[100%] bg-[transparent] border border-[white] outline-none p-2 py-1"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={handleAddSemester}
                className="bg-[#284a56] py-1 px-5 rounded"
              >
                ADD NEXT SEMESTER
              </button>
              <p className="text-center text-[1.4rem]">Your CGPA: {cgpa}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-[white] py-12  xl:px-14">
        <div className="md:container w-[90%] mx-auto px-4 flex justify-center items-center">
          <div className="md:w-[70%]">
            <div className="text-center">
              <h2 className="text-[1.3rem] font-[500]">What is CGPA?</h2>
              <p className="text-[#ffffffd2]">
                CGPA stands for Cumulative Grade Point Average. {"It's"} a
                measure of a {"student's"} academic performance, particularly in
                the context of educational institutions that use a grading
                system based on a points scale. CGPA is calculated by averaging
                the grade points obtained in all subjects over a certain period,
                typically a semester or an academic year. {"It's"} a way to
                summarize overall academic achievement into a single numerical
                value.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <h2 className="text-[1.3rem] font-[500]">
                How To Improve Your CGPA
              </h2>
              <div className="mt-2 grid grid-cols-1 md:gap-3 bg-gradient-to-r from-[#2e1010] via-[#1a1313] to-[#F30600] rounded-lg p-4 
              shadow-md w-500">
                <h3 className=" text-lg font-medium  text-gray-900">
                  <span className="">1</span> - Stay Organized
                </h3>
                <p className="mt-2 text-base text-[#ffffffd2]">
                  Keep track of your assignments, deadlines, and exam dates. Use
                  planners or digital tools to help you stay organized.
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  <span className="">2</span> - Attend Classes Regularly
                </h3>
                <p className="mt-2 text-base text-[#ffffffd2]">
                  Attending classes regularly ensures that you {"don't"} miss
                  out on important information and helps you stay updated with
                  the course material.
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  <span className="">3</span> - Participate Actively
                </h3>
                <p className="mt-2 text-base text-[#ffffffd2]">
                  Engage in classroom discussions, ask questions, and seek
                  clarification when needed. Active participation can deepen
                  your understanding of the subject matter.
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  <span className="">4</span> - Manage Your Time Wisely
                </h3>
                <p className="mt-2 text-base text-[#ffffffd2]">
                  Develop good time management skills to balance academic work
                  with other activities. Allocate sufficient time for studying,
                  assignments, and relaxation.
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  <span className="">5</span> - Seek Help When Needed
                </h3>
                <p className="mt-2 text-base text-[#ffffffd2]">
                  {"Don't"} hesitate to reach out to your teachers, professors,
                  or classmates if {"you're"} struggling with a particular
                  subject or concept. Utilize resources such as tutoring
                  services or study groups.
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  <span className="">6</span> - Review and Revise Regularly
                </h3>
                <p className="mt-2 text-base text-[#ffffffd2]">
                  Review your notes and course material regularly to reinforce
                  your learning. Practice past exam papers or problems to
                  identify areas where you need improvement.
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  <span className="">7</span> - Set Realistic Goals
                </h3>
                <p className="mt-2 text-base text-[#ffffffd2]">
                  Set achievable goals for each semester or academic year. Break
                  down larger goals into smaller, manageable tasks, and track
                  your progress regularly.
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  <span className="">8</span> - Take Care of Your Health
                </h3>
                <p className="mt-2 text-base text-[#ffffffd2]">
                  Ensure you get enough sleep, eat healthily, and exercise
                  regularly. Physical and mental well-being are crucial for
                  academic success.
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  <span className="">9</span> - Minimize Distractions
                </h3>
                <p className="mt-2 text-base text-[#ffffffd2]">
                  Identify and minimize distractions that may hinder your
                  studying, such as social media, excessive noise, or
                  procrastination.
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  <span className="">10</span> - Stay Motivated
                </h3>
                <p className="mt-2 text-base text-[#ffffffd2]">
                  Find intrinsic motivation by connecting your academic goals to
                  your personal interests and long-term aspirations. Celebrate
                  your achievements along the way to stay motivated.
                </p>
              </div>
              <p className="mt-4 text-[1rem] font-[500]">
                Remember, improving your CGPA is a gradual process, and it
                requires consistent effort and dedication. Be patient with
                yourself and focus on continuous improvement rather than
                perfection.
              </p>
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
          <div className=" w-[19rem] md:w-[22rem]">
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
                class="font-[700] border focus:outline-none hover:bg-[#bc1717] hover:text-tecxe-white hover:border-none text-sm px-5 py-2.5"
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

export default Index;
