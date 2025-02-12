import voiceData from './VoiceData.json';

interface VoiceData {
  title: string;
  mainDescription: string;
  subheading: string;
  benefits: string[];
  conclusion: string;
}

interface VoiceDescriptionProps {
  data?: VoiceData;
}

export const VoiceDescription = ({
  data = voiceData
}: VoiceDescriptionProps) => {
  return (
    <div className="space-y-6 w-full">
      <h2 className="text-2xl font-semibold text-accent">{data.title}</h2>

      <p className="text-primary leading-relaxed">{data.mainDescription}</p>

      <section className="space-y-2">
        <h3 className="text-lg font-medium text-primary">{data.subheading}</h3>
        <ul
          className="list-disc list-inside space-y-2 pl-4 text-primary"
          aria-label="Beneficios"
        >
          {data.benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </section>

      <p className="text-navy-900 leading-relaxed">{data.conclusion}</p>
    </div>
  );
};
