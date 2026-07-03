import Skeleton from "react-loading-skeleton";
const BlogLoading = () => {
  return (
    <section className="max-w-[1200px] mx-auto py-16 px-4">
      {/* Header Skeleton */}
      <div className="flex justify-between items-end mb-8 border-b pb-4 border-gray-200">
        <Skeleton width={180} height={28} className="mb-2" />
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        {/* Left Column: 3 News Cards */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="group block h-full">
                <article className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
                  <div className="relative w-full h-40 overflow-hidden">
                    <Skeleton
                      width="100%"
                      height="100%"
                      className="!h-40 !w-full"
                    />
                    <div className="absolute top-2 left-2">
                      <Skeleton width={48} height={16} />
                    </div>
                  </div>
                  <div className="p-3 flex flex-col flex-grow">
                    <Skeleton width={160} height={18} className="mb-2" />
                    <Skeleton count={2} height={12} className="mb-1" />
                    <Skeleton width={80} height={10} className="mt-auto" />
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
        {/* Right Column: Aside Skeleton */}
        <aside className="lg:col-span-3 space-y-8">
          <div className="relative w-full h-64 rounded-lg overflow-hidden my-[2px]">
            <Skeleton width="100%" height="100%" className="!h-64 !w-full" />
          </div>
          <div className="relative w-full h-64 rounded-lg overflow-hidden my-[2px]">
            <Skeleton width="100%" height="100%" className="!h-64 !w-full" />
          </div>
        </aside>
      </div>
    </section>
  );
};

export default BlogLoading;
