import Link from "next/link";
import Image from "next/image";
import { Disclosure } from "@headlessui/react";
import { clientUrl } from "@/urls";

const Navbar = ({ section }) => {
  const navigation = [
    { title: "Products", link: "" },
    { title: "Community", link: `${clientUrl}/#community` },
  ];
  // "Pricing",
  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-14">
        {/* Logo  */}
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                <Link href="/">
                  <span className="flex items-center space-x-2 md:text-2xl font-medium text-indigo-500 dark:text-gray-100 text-tecxe-white">
                    <span>
                      {/* <Image
                        src="/img/XCTools.svg"
                        alt="N"
                        width="60"
                        height="60"
                        className=""
                      /> */}
                    </span>
                    <span>
                      {/* <Image
                        src="/img/tecxe/logo.svg"
                        alt="N"
                        width="300"
                        height="700"
                        className=""
                      /> */}
                      MyPadi {section ? "-" : ""} {section}
                    </span>
                  </span>
                </Link>

                <Disclosure.Button
                  aria-label="Toggle Menu"
                  className="px-2 py-1 ml-auto text-[white] rounded-md lg:hidden hover:text-[white] focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none"
                >
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    {open && (
                      <path
                        fill="white" // Add fill attribute with white color
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      />
                    )}
                    {!open && (
                      <path
                        fill="white" // Add fill attribute with white color
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      />
                    )}
                  </svg>
                </Disclosure.Button>

                <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                  <>
                    {navigation.map((item, index) => (
                      <Link
                        key={index}
                        href={item.link}
                        className="w-full px-4 py-2 -ml-4 text-[white] rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none"
                      >
                        {item.title}
                      </Link>
                    ))}
                    {/* <Link
                      href="/"
                      className="w-full px-6 py-2 mt-3 text-center text-[white] bg-indigo-600 rounded-md lg:ml-5"
                    >
                      Get Started
                    </Link> */}
                  </>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>

        {/* menu  */}
        <div className="flex">
          <div className="hidden text-center lg:flex lg:items-center bg-[rgba(255,255,255,0.06)] rounded-[10px]">
            <ul className="items-center gap-4 justify-end flex-1 px-6 list-none lg:pt-0 lg:flex">
              {navigation.map((menu, index) => (
                <li className="nav__item" key={index}>
                  <Link
                    href={menu.link}
                    className="inline-block  py-3 text-[.9rem] font-normal text-tecxe-white no-underline rounded-md hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none"
                  >
                    {menu.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* <div className="hidden ml-9 space-x-4 lg:flex nav__item">
            <Link
              href="/"
              className="px-6 py-2 flex items-center text-tecxe-white bg-social-green rounded-md md:ml-2 "
            >
              Generate Tags
            </Link>
          </div> */}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
