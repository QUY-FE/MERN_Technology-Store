export interface Contact {
  _id: string;
  username: string;
  number: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateContactDto = {
  username: string;
  number: string;
  description: string;
  status: string;
};

export type UpdateContactDto = Partial<CreateContactDto>;
