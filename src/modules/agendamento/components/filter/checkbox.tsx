interface IFilterCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterCheckbox: React.FC<IFilterCheckboxProps> = ({ label, checked, onChange }) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <label className="text-sm font-medium text-gray-700">{label}</label>
    </div>
  )
}

export default FilterCheckbox;