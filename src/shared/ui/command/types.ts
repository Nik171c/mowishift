import * as React from "react";

export interface CommandOption {
  value: string;
  label: string;

  keywords?: string[];

  disabled?: boolean;

  icon?: React.ReactNode;

  avatar?: React.ReactNode;

  badge?: React.ReactNode;

  description?: React.ReactNode;
}

export interface CommandGroupOption {
  heading?: string;

  items: CommandOption[];
}
