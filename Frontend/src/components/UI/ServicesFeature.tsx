import { Truck, Headphones, ShieldCheck } from "lucide-react";
import { IconType } from "react-icons";

interface ServicesFeature {
  title: string;
  description: string;
  icon: IconType;
}

const featuresData = [
  {
    id: "free-delivery",
    icon: Truck,
    title: "Miễn phí vận chuyển",
    description: "Miễn phí vận chuyển đơn hàng từ 150$",
  },
  {
    id: "customer-service",
    icon: Headphones,
    title: "Hỗ trợ 24/7",
    description: "Chúng tôi luôn sẵn sàng hỗ trợ bạn bất cứ lúc nào",
  },
  {
    id: "money-back",
    icon: ShieldCheck,
    title: "Chính sách hoàn hàng",
    description: "Hoàn hàng trong 7 ngày",
  },
];

const FeatureItem = ({ icon: Icon, title, description }: ServicesFeature) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-300">
        <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-black text-white">
          <Icon size={28} strokeWidth={1.5} />
        </div>
      </div>

      <h3 className="mb-2 text-[15px] font-bold uppercase tracking-wide text-black">
        {title}
      </h3>

      <p className="text-[14px] text-gray-600">{description}</p>
    </div>
  );
};

export default function ServicesFeature() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-16">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
        {featuresData.map((feature) => (
          <FeatureItem
            key={feature.id}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
}
