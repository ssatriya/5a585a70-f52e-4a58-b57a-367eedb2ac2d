import { z } from "zod";

const CoordinatesSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

const AddressSchema = z.object({
  address: z.string(),
  city: z.string(),
  coordinates: CoordinatesSchema,
  postalCode: z.string(),
  state: z.string(),
});

const HairSchema = z.object({
  color: z.string(),
  type: z.string(),
});

const BankSchema = z.object({
  cardExpire: z.string(),
  cardNumber: z.string(),
  cardType: z.string(),
  currency: z.string(),
  iban: z.string(),
});

const CompanySchema = z.object({
  address: AddressSchema,
  department: z.string(),
  name: z.string(),
  title: z.string(),
});

const UserSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  maidenName: z.string(),
  age: z.number(),
  gender: z.string(),
  email: z.string(),
  phone: z.string(),
  username: z.string(),
  password: z.string(),
  birthDate: z.string(),
  image: z.string(),
  bloodGroup: z.string(),
  height: z.number(),
  weight: z.number(),
  eyeColor: z.string(),
  hair: HairSchema,
  domain: z.string(),
  ip: z.string(),
  address: AddressSchema,
  macAddress: z.string(),
  university: z.string(),
  bank: BankSchema,
  company: CompanySchema,
  ein: z.string(),
  ssn: z.string(),
  userAgent: z.string(),
});

export type UserType = z.infer<typeof UserSchema>;

export const GetUserSchema = z.number({
  required_error: "Id is required",
});
