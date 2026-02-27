import Skeleton from "react-loading-skeleton";

export default function ProductsLoading() {
  return (
    <section className="max-w-[1200px] mx-auto pb-10">
      {/* Categories Skeleton */}
      <div className="mb-8">
        <Skeleton width={300} height={36} className="my-6" />
        <div className="flex gap-2 items-center justify-center">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <Skeleton key={index} width={190} height={160} />
          ))}
        </div>
      </div>
      {/* Toolbar Skeleton */}
      <div className="bg-gray-50 py-3 px-4 rounded mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <Skeleton width={220} height={32} />
        <Skeleton width={180} height={32} />
      </div>
      {/* Product Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-6 px-2 animate-fade-in">
        {[...Array(15)].map((_, index) => (
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
      {/* Pagination Skeleton */}
      <div className="flex justify-center mt-10 space-x-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} width={40} height={36} />
        ))}
      </div>
    </section>
  );
}
