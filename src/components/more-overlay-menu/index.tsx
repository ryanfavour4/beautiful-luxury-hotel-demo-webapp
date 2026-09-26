interface OverlayMenuProps {
  onEdit?: () => void;
  onView?: () => void;
  onDelete?: () => void;
  children?: React.ReactNode;
}

export const MoreOverlayMenu = ({ onEdit, onView, onDelete, children }: OverlayMenuProps) => (
  <div className="absolute right-0 z-10 w-fit min-w-32 overflow-hidden rounded-lg border bg-light shadow-lg">
    {children}
    {onView && (
      <button className="block w-full px-4 py-2 text-left hover:bg-gray-100" onClick={onView}>
        View
      </button>
    )}
    {onEdit && (
      <button className="block w-full px-4 py-2 text-left hover:bg-gray-100" onClick={onEdit}>
        Edit
      </button>
    )}
    {onDelete && (
      <button
        className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
        onClick={onDelete}
      >
        Delete
      </button>
    )}
  </div>
);
