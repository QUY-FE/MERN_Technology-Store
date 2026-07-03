import Skeleton from "react-loading-skeleton";
export default function NewsLoading() {
  return (
    <section className="max-w-[1200px] mx-auto pt-10 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="group block h-full">
            <article className="bg-white rounded-lg border border-gray-100 overflow-hidden flex flex-col h-full">
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
    </section>
  );
};


