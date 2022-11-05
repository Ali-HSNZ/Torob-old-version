import UserPageAside from "@/components/userPage/Aside";
import Layout from "@/layout/Layout";
import AnalyticsComponent from "@/components/userPage/AnalyticsComponent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAnalytics } from "@/redux/analytics/analyticsActions";
import { Modal, Pagination } from "@mui/material";
import { useState } from "react";
import ReactLoading from "react-loading";
import empty_watched from "@/images/empty_watched.png";

const Analytics = () => {
  const dispatch = useDispatch();
  const { analytics, loading, analyticsLoading } = useSelector(
    (state) => state.analytics
  );
  const { likes, likesLoading } = useSelector((state) => state.likes);
  const [isAsideModal, setIsAsideModal] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, []);

  //? Pagination =>
  const [analyticsPage, setAnalyticsPage] = useState(0);
  const numOfAnalyticsOnPage = 5;
  const analyticsShown = analyticsPage * numOfAnalyticsOnPage;
  const pageCount = analytics
    ? Math.ceil(analytics.length / numOfAnalyticsOnPage)
    : 1;
  const paginationHandler = (event, value) => {
    setAnalyticsPage(value - 1);
    window.scroll({ top: 0 });
  };
  const renderAnalytics =
    analytics &&
    analytics
      .slice(analyticsShown, analyticsShown + numOfAnalyticsOnPage)
      .map((product, index) => {
        const isLiked = () => {
          const likedProduct =
            likes && likes.find((item) => item.hash_id === product.hash_id);
          if (likedProduct) {
            return true;
          }
          return false;
        };
        const isAnalyze = () => {
          const analyticsProduct =
            analytics &&
            analytics.find((item) => item.hash_id === product.hash_id);
          if (analyticsProduct) {
            return true;
          }
          return false;
        };
        const isLikeLoading = () => {
          const loadingProduct =
            likesLoading &&
            likesLoading.length > 0 &&
            likesLoading.find((item) => item.hash_id === product.hash_id);
          if (loadingProduct) {
            return true;
          }
        };
        const isAnalyzeLoading = () => {
          const loadingProduct =
            analyticsLoading &&
            analyticsLoading.length > 0 &&
            analyticsLoading.find((item) => item.hash_id === product.hash_id);
          if (loadingProduct) {
            return true;
          }
        };
        return (
          <AnalyticsComponent
            key={index}
            user={user && user.phone_number_primary ? true : false}
            isAnalyze={isAnalyze()}
            isAnalyzeLoading={isAnalyzeLoading()}
            isLikeLoading={isLikeLoading()}
            isLiked={isLiked()}
            product={product}
          />
        );
      });

  return (
    <Layout isFooter={true}>
      <div className="w-full flex flex-col lg:flex-row  justify-between ">
        <UserPageAside />
        <section className="w-full lg:w-4/5 flex-0 h-max px-4 ">
          <div className="lg:hidden">
            <Modal
              open={isAsideModal}
              onClose={() => setIsAsideModal(false)}
              className="lg:hidden"
            >
              <>
                <UserPageAside
                  isMobileScreen={true}
                  setIsMobileScreen={setIsAsideModal}
                  mobileScreenClassName={"sm:w-1/3 w-full"}
                />
              </>
            </Modal>
          </div>
          {!loading && (
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <button
                  onClick={() => setIsAsideModal(!isAsideModal)}
                  className="lg:hidden p-2 bg-white ml-4 rounded-md cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </button>
                <span className="font-sans text-gray-800 font-bold text-xl">
                  تغییرات قیمت
                </span>
              </div>
            </div>
          )}
          {!loading && !analytics && (
            <div className="w-full flex justify-center my-7 lg:mt-7">
              <div className="w-full sm:w-1/2 flex flex-col items-center">
                <img className="w-full h-auto" src={empty_watched.src} />
                <p className=" text-center leading-5 font-sans relative text-gray-500 sm:left-0 sm:w-4/6 text-xs">
                  اعلان قیمت را برای محصولات دلخواه خود فعال کنید تا از موجودی و
                  تغییرات قیمت‌شان مطلع شوید.
                </p>
              </div>
            </div>
          )}
          {loading && (
            <div className="w-full flex justify-center my-8">
              <ReactLoading
                type="spinningBubbles"
                height={50}
                width={50}
                color="red"
              />
            </div>
          )}
          {analytics && (
            <>
              <section className="h-max flex flex-col gap-y-4  mt-5">
                {renderAnalytics}
              </section>
              <div className="w-full flex justify-center my-7">
                <Pagination
                  dir="ltr"
                  count={pageCount}
                  color="primary"
                  onChange={paginationHandler}
                />
              </div>
            </>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default Analytics;
