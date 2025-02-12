export type FormData = {
  lastname: string;
  firstname: string;
  email: string;
};

export type FormDataProps = {
  value: string;
  handleChangeFormData: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
