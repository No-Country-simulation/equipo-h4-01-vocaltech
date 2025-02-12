interface ScaleOption {
  min: string;
  max: string;
  steps: number;
}

interface Rating2Props {
  name: string;
  scale: ScaleOption;
  value?: number;
  onChange: (value: number) => void;
}

export function Rating2({ name, scale, value, onChange }: Rating2Props) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center gap-2">
        {[...Array(scale.steps)].map((_, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <label className="relative">
              <input
                type="radio"
                name={name}
                value={index + 1}
                checked={value === index + 1}
                onChange={() => onChange(index + 1)}
                className="appearance-none w-4 h-4  rounded-full border border-primary checked:border-[4px] checked:border-accent transition-all duration-200 cursor-pointer"
              />
            </label>
            <span className="text-sm text-gray-600">{index + 1}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-sm text-gray-600 px-2">
        <span>{scale.min}</span>
        <span>{scale.max}</span>
      </div>
    </div>
  );
}
