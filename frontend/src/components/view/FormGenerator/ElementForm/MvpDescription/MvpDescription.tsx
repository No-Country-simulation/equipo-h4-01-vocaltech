import mvpData from './MvpData.json';

interface MvpData {
  title: string;
  mainDescription: string;
  subheading: string;
  benefits: string[];
  conclusion: string;
}
interface MvpDescriptionProps {
  data?: MvpData;
}

export default function MvpDescription({
  data = mvpData
}: MvpDescriptionProps) {
  return (
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-2xl font-semibold text-accent">{data.title}</h2>

      <p className="text-navy-900 leading-relaxed">{data.mainDescription}</p>

      <div className="space-y-2">
        <p className="text-navy-900 font-medium">{data.subheading}</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          {data.benefits.map((benefit, index) => (
            <li key={index} className="text-navy-900">
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-navy-900 leading-relaxed">{data.conclusion}</p>
    </div>
  );
}
