import Skeleton from "react-loading-skeleton";

export default function ProductDetailLoading() {
  return (
    <section className="max-w-[1200px] mx-auto pb-10">
      {/* Product Info Skeleton */}
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        <div className="w-full md:w-5/12 flex justify-center">
          <Skeleton width={320} height={320} className="rounded-xl" />
        </div>
        <div className="w-full md:w-7/12 space-y-4">
          <Skeleton width={220} height={32} />
          <Skeleton width={120} height={24} />
          <Skeleton width={80} height={24} />
          <Skeleton width={180} height={28} />
          <Skeleton count={3} height={16} />
          <div className="flex gap-2 mt-4">
            <Skeleton width={120} height={46} />
            <Skeleton width={120} height={46} />
          </div>
        </div>
      </div>
      {/* Review Skeleton */}
      <div className="mb-10">
        <Skeleton width={180} height={28} className="mb-2" />
        <Skeleton count={2} height={18} />
      </div>
      {/* Related Products Skeleton */}
      <div className="mt-12 px-2">
        <Skeleton width={180} height={24} className="mb-4" />
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col ">
              <Skeleton width={180} height={180} className="mb-2" />
              <Skeleton width={120} height={20} className="mb-1" />
              <Skeleton width={80} height={16} />
            </div>
          ))}
        </div>
      </div>
      {/* Other Products Skeleton */}
      <div className="mt-12 px-2">
        <Skeleton width={180} height={24} className="mb-4" />
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col ">
              <Skeleton width={180} height={180} className="mb-2" />
              <Skeleton width={120} height={20} className="mb-1" />
              <Skeleton width={80} height={16} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
