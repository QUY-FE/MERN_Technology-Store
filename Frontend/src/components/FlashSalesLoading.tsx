import Skeleton from "react-loading-skeleton";

const FlashSalesLoading = () => {
  return (
    <>
      <div className="flex justify-between items-end mb-8 mt-4 border-b pb-4 border-gray-200">
        <div>
          <Skeleton width={180} height={28} className="mb-2" />
          <Skeleton width={220} height={16} />
        </div>
        <Skeleton width={100} height={20} />
      </div>
      <div className="flex flex-row gap-4 w-full py-6">
        {[1, 2, 3, 4, 5].map((_, index) => (
          <div key={index} className="flex flex-col w-[300px]">
            <Skeleton width={200} height={190} className="mb-2" />
            <Skeleton width={190} height={20} className="mb-2" />
            <Skeleton width={100} height={20} className="mb-2" />
            <div className="flex flex-row gap-[2px] mt-1">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <Skeleton width={15} height={15} key={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FlashSalesLoading;
