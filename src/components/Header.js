import BigScreenMenu from "@/common/BigScreenMenu";
import SmallScreenMenu from "@/common/SmallScreenMenu";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { Modal } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authPanel, userLogout } from "src/redux/user/userActions";
import Login from "./Login";

const Header = () => {
  const [categories, setCategories] = useState(null);
  const [isCategoryPanel, setIsCategoryPanel] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("");
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [userPanel, setUserPanel] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios
        .get("https://project-torob-clone.iran.liara.run/api/categories")
        .then((res) => res.data);
      const setIdToMainCategories = data.map((category) => {
        return { ...category, id: Date.now() + Math.random() };
      });
      setCategories(setIdToMainCategories);
    };
    getData();
  }, []);

  const closeCategory = () => {
    const allCategories =
      categories && categories.length > 0 ? [...categories] : [];
    allCategories.forEach((category) => (category.status = false));
    setCategories(allCategories);
    setIsCategoryPanel(false);
  };

  function handleCategory(id) {
    closeCategory();
    const index = categories.findIndex((category) => category.id === id);
    const category = { ...categories[index] };
    category.status = true;
    const allCategories = [...categories];
    allCategories[index] = category;
    setCategories(allCategories);
    setIsCategoryPanel(true);
  }

  return (
    <>
      <div
        onClick={() => {
          closeCategory();
        }}
        className={`fixed ${
          isCategoryPanel ? "" : "hidden"
        }  inset-0  h-full w-full z-10`}
      ></div>
      <div
        onClick={() => {
          setUserPanel(false);
        }}
        className={`fixed ${
          userPanel ? "" : "hidden"
        } bg-[#44444438] inset-0  h-full w-full z-10`}
      ></div>

      <header className="flex relative  justify-between md:px-10  px-4 py-2 bg-gray-50 items-center z-10">
        {user && user.phone_number_primary ? <></> : <Login />}

        {/* //? LapTop Menu */}
        <section className="hidden sm:flex  gap-x-6 ">
          {categories &&
            categories.length > 0 &&
            categories.map((category, index) => (
              <BigScreenMenu
                setUserPanel={setUserPanel}
                closeCategory={closeCategory}
                handleCategory={handleCategory}
                category={category}
                key={index}
                customClassname={
                  "z-40 absolute mx-10 right-0 left-0 rounded-md top-14"
                }
              />
            ))}
        </section>

        {/* //? Mobile Menu Button  */}
        {categories && categories.length > 0 && (
          <section className="sm:hidden">
            <button
              className="flex items-center justify-center p-2 bg-white"
              onClick={() => setIsCategoryPanel(!isCategoryPanel)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </section>
        )}

        {/* //? User Modal */}
        <section className="w-full sm:w-fit flex justify-end relative ">
          {user && user.phone_number_primary ? (
            <>
              <button
                onClick={() => closeCategory() & setUserPanel(!userPanel)}
                className="bg-white px-6 py-1.5 border border-gray-300 rounded-md text-xs font-sans text-gray-500"
              >
                {toPersianDigits(user.phone_number_primary)}
              </button>
              <div
                className={`bg-gray-50 rounded-b-md ${
                  userPanel ? "" : "hidden"
                } absolute  top-[37px] left-0  whitespace-nowrap py-2`}
              >
                <Link href={"/user/analytics"}>
                  <a className="text-xs cursor-pointer hover:bg-gray-200 px-6 font-bold text-gray-700 py-1.5 text-center font-sans block">
                    تغیرات قیمت
                  </a>
                </Link>
                <Link href={"/user/favorites"}>
                  <a className="text-xs cursor-pointer hover:bg-gray-200 px-6 font-bold text-gray-700 py-1.5 text-center font-sans block">
                    محبوب‌ها
                  </a>
                </Link>
                <Link href={"/user/history"}>
                  <a className="text-xs cursor-pointer hover:bg-gray-200 px-6 font-bold text-gray-700 py-1.5 text-center font-sans block">
                    مشاهدات اخیر
                  </a>
                </Link>
                <button
                  onClick={() => {
                    dispatch(userLogout());
                    setUserPanel(false);
                  }}
                  className="text-xs cursor-pointer hover:bg-red-100 px-6 font-bold text-red-600 w-full py-1.5 text-center font-sans "
                >
                  خروج
                </button>
              </div>
            </>
          ) : (
            <>
              {!loading ? (
                <button
                  onClick={() => closeCategory() & dispatch(authPanel(true))}
                  className="bg-white px-4 py-1.5 border border-gray-300 rounded-md text-xs font-sans text-gray-500"
                >
                  ورود / ثبت نام
                </button>
              ) : (
                <button className="bg-white px-4 py-1.5 border border-gray-300 rounded-md text-xs font-sans text-gray-500">
                  ...
                </button>
              )}
            </>
          )}
        </section>
      </header>

      {/* //? MenuMobile =>  */}
      <SmallScreenMenu
        setCurrentCategory={setCurrentCategory}
        currentCategory={currentCategory}
        isCategoryPanel={isCategoryPanel}
        closeCategory={closeCategory}
        setIsCategoryPanel={setIsCategoryPanel}
        categories={categories}
        handleCategory={handleCategory}
      />
    </>
  );
};

export default Header;
