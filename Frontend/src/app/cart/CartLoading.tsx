import Skeleton from "react-loading-skeleton";

export default function CartLoading() {
  return (
    <section className="max-w-[1200px] mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <Skeleton width={180} height={46} />
        <Skeleton width={180} height={46} />
      </div>
      <ul className="w-full h-[56px] shadow flex items-center justify-between rounded-2xl text-center mb-2">
        {[1,2,3,4].map((i) => (
          <li key={i} className="w-1/4"><Skeleton width={80} height={18} /></li>
        ))}
      </ul>
      {[...Array(3)].map((_, i) => (
        <div key={i} className="w-full flex items-center my-2 p-2 bg-white rounded-xl shadow">
          <div className="w-1/4 flex items-center gap-2">
            <Skeleton width={65} height={65} />
            <Skeleton width={90} height={18} />
          </div>
          <div className="w-1/4 flex justify-center"><Skeleton width={60} height={18} /></div>
          <div className="w-1/4 flex justify-center gap-2">
            <Skeleton width={40} height={32} />
            <Skeleton circle width={32} height={32} />
          </div>
          <div className="w-1/4 flex justify-center"><Skeleton width={60} height={18} /></div>
        </div>
      ))}
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 mt-6">
        <div className="w-full lg:w-1/2"></div>
        <div className="w-full lg:w-1/2 flex justify-end">
          <div className="px-6 py-8 border rounded shadow-lg w-full max-w-md">
            <Skeleton width={120} height={28} className="mb-4" />
            <Skeleton width={180} height={22} className="mb-3" />
            <Skeleton width={180} height={22} className="mb-3" />
            <Skeleton width={180} height={28} className="mb-6" />
            <Skeleton width={218} height={56} />
          </div>
        </div>
      </div>
    </section>
  );
}