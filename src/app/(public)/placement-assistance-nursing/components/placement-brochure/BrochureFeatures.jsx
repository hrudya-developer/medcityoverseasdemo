
import { brochureFeatures } from "./brochureData";
import BrochureFeatureCard from "./BrochureFeatureCard";

export default function BrochureFeatures() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
      {brochureFeatures.map((feature, index) => (
        <BrochureFeatureCard
          key={feature.id}
          feature={feature}
          wide={index === 2}
        />
      ))}
    </div>
  );
}
