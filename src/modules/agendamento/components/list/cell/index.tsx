interface ICellItem {
  text: string;
  textAlign?: 'left' | 'center';
  textColor?: string;
  colSpan?: number;
  hasBar?: boolean;
}

const CellItem: React.FC<ICellItem> = ({ text, textAlign = 'left', textColor = 'text-slate-700', colSpan = 1, hasBar = true}) => {


  return (
    <div className={`col-span-${colSpan} p-2 ${hasBar ? 'border-r border-gray-200' : ''}`}>
      <p className={`text-md ${textAlign === 'left' ? 'text-left' : 'text-center'} ${textColor}`}>
        {text}
      </p>
    </div>
  )
}

export default CellItem;