import { useMemo, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";

export interface SearchableAdminSelectOption {
  value: string;
  label: string;
}

interface SearchableAdminSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SearchableAdminSelectOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  className?: string;
}

export function SearchableAdminSelect({
  value,
  onChange,
  options,
  placeholder = "Vel avdeling",
  searchPlaceholder = "Søk etter avdeling...",
  disabled = false,
  className = "",
}: SearchableAdminSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selectedOption = options.find((option) => option.value === value);

  const filteredOptions = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return options;
    }

    return options.filter((option) =>
      option.label.toLowerCase().includes(query),
    );
  }, [options, search]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setOpen(false);
    setSearch("");
  };

  return (
    <div className={`searchable-admin-select ${className}`}>
      <button
        type="button"
        className="searchable-admin-select__trigger"
        onClick={() => !disabled && setOpen((prev) => !prev)}
        disabled={disabled}
      >
        <span
          className={
            selectedOption
              ? "searchable-admin-select__value"
              : "searchable-admin-select__placeholder"
          }
        >
          {selectedOption?.label ?? placeholder}
        </span>

        <ChevronDown
          size={18}
          className={
            open
              ? "searchable-admin-select__chevron searchable-admin-select__chevron--open"
              : "searchable-admin-select__chevron"
          }
        />
      </button>

      {open && (
        <div className="searchable-admin-select__dropdown">
          <div className="searchable-admin-select__search">
            <Search size={17} />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={searchPlaceholder}
              autoFocus
            />
          </div>

          <div className="searchable-admin-select__options">
            {filteredOptions.length === 0 ? (
              <div className="searchable-admin-select__empty">
                Ingen avdelinger funnet
              </div>
            ) : (
              filteredOptions.map((option) => {
                const selected = option.value === value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    className={
                      selected
                        ? "searchable-admin-select__option searchable-admin-select__option--selected"
                        : "searchable-admin-select__option"
                    }
                    onClick={() => handleSelect(option.value)}
                  >
                    <span>{option.label}</span>

                    {selected && <Check size={17} />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
