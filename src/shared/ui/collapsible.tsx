import {
  createContext,
  useContext,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

type CollapsibleContextValue = {
  open: boolean;
  toggle: () => void;
};

const CollapsibleContext = createContext<CollapsibleContextValue | null>(null);

function useCollapsible() {
  const context = useContext(CollapsibleContext);

  if (!context) {
    throw new Error("Collapsible components must be used inside Collapsible");
  }

  return context;
}

type CollapsibleProps = {
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
};

export function Collapsible({
  children,
  defaultOpen = false,
  className = "",
}: CollapsibleProps) {
  const [open, setOpen] = useState(defaultOpen);

  const toggle = () => {
    setOpen((current) => !current);
  };

  return (
    <CollapsibleContext.Provider
      value={{
        open,
        toggle,
      }}
    >
      <div className={className}>{children}</div>
    </CollapsibleContext.Provider>
  );
}

type CollapsibleTriggerProps = {
  children: ReactNode;
  asChild?: boolean;
};

export function CollapsibleTrigger({
  children,
  asChild = false,
}: CollapsibleTriggerProps) {
  const { toggle } = useCollapsible();

  if (asChild) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={toggle}
        onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggle();
          }
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <button type="button" onClick={toggle}>
      {children}
    </button>
  );
}

type CollapsibleContentProps = {
  children: ReactNode;
  className?: string;
};

export function CollapsibleContent({
  children,
  className = "",
}: CollapsibleContentProps) {
  const { open } = useCollapsible();

  if (!open) {
    return null;
  }

  return <div className={className}>{children}</div>;
}
