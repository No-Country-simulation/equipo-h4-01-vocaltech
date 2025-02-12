interface Option {
  id: number;
  text: string;
}

interface Rating2Props {
  name: string;
  options: Option[];
  value?: string | number;
  onChange: (value: string | number) => void;
}

export function Rating2({ name, options, value, onChange }: Rating2Props) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center gap-2">
        {options.map(option => (
          <div key={option.id} className="flex flex-col items-center gap-2">
            <label className="relative">
              <input
                type="radio"
                name={name}
                value={option.id.toString()}
                checked={value === option.id.toString() || value === option.id}
                onChange={() => onChange(option.id)}
                className="appearance-none w-4 h-4 rounded-full border border-primary checked:border-[4px] checked:bg-primary transition-all duration-200 cursor-pointer"
              />
            </label>
            <span className="text-sm text-gray-600">
              {option.text.split(' ')[0]}
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>Nunca</span>
        <span>Siempre</span>
      </div>
    </div>
  );
}
