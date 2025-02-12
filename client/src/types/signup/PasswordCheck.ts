export type passwordCheck = {
  length?: string;
  maj?: string;
  number?: string;
  specialChar?: string;
};

export type PasswordValidation = {
  password: string;
  confirmedPassword: string;
  errors: Record<string, string>;
  isSamePassword: boolean;
  handleCheckPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleConfirmedPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
