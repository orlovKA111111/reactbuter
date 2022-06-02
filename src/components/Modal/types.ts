import * as React from "react";

export interface IModal {
  onClose:() => void;
  children?: React.ReactNode | undefined;
};