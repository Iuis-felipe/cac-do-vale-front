import { LayoutGridIcon, ListIcon } from "lucide-react";
import { ToggleButtonRoot, ToggleButtonItem } from './ToggleButton.styled';

type ViewType = "grid" | "list";

interface IViewToggleButton {
  view: ViewType;
  setView: (view: ViewType) => void;
}

const ViewToggleButton = ({ view, setView }: IViewToggleButton) => (
  <ToggleButtonRoot>
    {(["list", "grid"] as const).map((v) => {
      const isActive = view === v;
      const Icon = v === "grid" ? LayoutGridIcon : ListIcon;
      return (
        <ToggleButtonItem
          key={v}
          isActive={isActive}
          onClick={() => setView(v)}
          aria-label={`Visualização em ${v === "grid" ? "grade" : "lista"}`}
          disableRipple
        >
          <Icon size={16} />
        </ToggleButtonItem>
      );
    })}
  </ToggleButtonRoot>
);

export default ViewToggleButton;