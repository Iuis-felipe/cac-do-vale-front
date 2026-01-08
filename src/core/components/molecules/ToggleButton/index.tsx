import { FC } from "react";
import { LayoutGridIcon, ListIcon } from "lucide-react";

type ViewType = "grid" | "list";

interface IViewToggleButton {
  view: ViewType;
  setView: (view: ViewType) => void;
}

const ViewToggleButton: FC<IViewToggleButton> = ({ view, setView }) => (
  <div className="flex items-center gap-2">
    {(["grid", "list"] as const).map((v) => {
      const isActive = view === v;
      const Icon = v === "grid" ? LayoutGridIcon : ListIcon;
      return (
        <button
          key={v}
          onClick={() => setView(v)}
          className={`h-9 w-9 flex items-center justify-center rounded-md border text-gray-600 hover:bg-gray-50 cursor-pointer ${
            isActive ? "bg-gray-100 border-gray-300" : "border-gray-200"
          }`}
          aria-label={`Visualização em ${v === "grid" ? "grade" : "lista"}`}
        >
          <Icon className="size-4" />
        </button>
      );
    })}
  </div>
);

export default ViewToggleButton;