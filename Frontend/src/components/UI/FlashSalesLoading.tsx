import Skeleton from "react-loading-skeleton";

const FlashSalesLoading = () => {
  return (
    <>
      <div className="flex justify-between items-end mb-8 mt-4 border-b pb-4 border-gray-200">
        <div>
          <Skeleton width={180} height={28} className="mb-2" />
          <Skeleton width={220} height={16} />
        </div>
        <Skeleton width={160} height={40} />
      </div>
        <Skeleton width={300} height={40} className="mb-4" />
      <div className="grid grid-cols-5 gap-2">
        <Skeleton width={220} height={260} className="mb-2" />
        <Skeleton width={220} height={260} className="mb-2" />
        <Skeleton width={220} height={260} className="mb-2" />
        <Skeleton width={220} height={260} className="mb-2" />
        <Skeleton width={220} height={260} className="mb-2" />
      </div>
    </>
  );
};

export default FlashSalesLoading;
