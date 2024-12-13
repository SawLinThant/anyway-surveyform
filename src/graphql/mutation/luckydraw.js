import { gql } from "@apollo/client";

export const CREATE_LUCKYDRAW_NUMBER = gql`
  mutation createLuckyDrawNumber(
    $phone: String
    $number: String
  ) {
    insert_luckydraw_numbers_one(
      object: { phone: $phone, number: $number }
    ) {
      phone
      number
    }
  }
`;

