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
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-subtitulo leading-10 text-darkgreen">{data.title}</h2>

      <p className="text-seccion font-bold leading-10">{data.mainDescription}</p>

      <section className="space-y-2">
        <h3 className="text-seccion">{data.subheading}</h3>
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
