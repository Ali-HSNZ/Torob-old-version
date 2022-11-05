import { toPersianDigits } from "@/utils/toPersianDigits";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "src/redux/user/userActions";

const UserPageAside = ({
  isMobileScreen,
  setIsMobileScreen,
  mobileScreenClassName,
}) => {
  const { user } = useSelector((state) => state.auth);

  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <aside
      className={`${
        mobileScreenClassName ? mobileScreenClassName : "w-1/5"
      }   h-screen bg-white ${
        isMobileScreen ? "lg:hidden" : "hidden"
      } sticky top-0 lg:flex flex-col overflow-y-auto`}
    >
      {isMobileScreen && (
        <section>
          <div className="px-4 mt-6 flex w-full">
            <button onClick={() => setIsMobileScreen(false)}>
              <svg
                className="w-6 h-6 text-gray-800 "
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h6 className="text-sm  text-center w-full font-sans text-gray-800 ">
              منو
            </h6>
          </div>
          <hr className="mt-5" />
        </section>
      )}

      <div className="py-3">
        <Link href={"/user/analytics"}>
          <a
            className={` flex items-center pr-8 py-3   ${
              router.pathname === "/user/analytics"
                ? "bg-red-50 text-red-600 "
                : "hover:bg-gray-50 "
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
            <span className="font-sans mr-2 font-bold text-sm">
              تغییرات قیمت
            </span>
          </a>
        </Link>
        <Link href={"/user/favorites"}>
          <a
            className={` flex items-center pr-8 py-3 ${
              router.pathname === "/user/favorites"
                ? "bg-red-50 text-red-600 "
                : "hover:bg-gray-50 "
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            <span className="font-sans mr-2  font-bold text-sm">محبوب‌ها</span>
          </a>
        </Link>
        <Link href={"/user/history"}>
          <a
            className={` flex items-center pr-8 py-3 ${
              router.pathname === "/user/history"
                ? "bg-red-50 text-red-600 "
                : "hover:bg-gray-50 "
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-sans mr-2  font-bold text-sm">
              مشاهدات اخیر
            </span>
          </a>
        </Link>
      </div>

      <hr />

      <div className="flex py-3 flex-col">
        <Link href={"#"}>
          <a className="text-gray-700 font-sans pr-8 text-sm py-3 hover:bg-gray-50">
            لیست فروشگاه‌های ترب
          </a>
        </Link>
        <Link href={"#"}>
          <a className="text-gray-700 font-sans pr-8 text-sm py-3 hover:bg-gray-50">
            ثبت نام فروشگاه
          </a>
        </Link>
      </div>

      <hr />

      {user && user.phone_number_primary && (
        <button
          onClick={() => dispatch(userLogout())}
          className=" mt-3 hover:bg-red-50 flex flex-col  pr-8 py-2"
        >
          <p className="font-sans text-sm text-gray-700">خروج از حساب کاربری</p>
          <p className="font-sans mt-2 text-sm text-gray-700">
            {toPersianDigits(
              user && user.phone_number_primary && user.phone_number_primary
            )}
          </p>
        </button>
      )}
    </aside>
  );
};

export default UserPageAside;
