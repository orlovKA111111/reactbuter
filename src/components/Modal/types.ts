export interface IModal {
  onClose:() => void;
  children?: React.ReactNode | undefined;
};