import { gql } from "@apollo/client";

export const CREATE_SURVEY_DATA = gql`
  mutation createCard(
    $name: String
    $phone: String
    $theme: String
    $aboutus: String
  ) {
    insert_survey_data_one(
      object: {
        name: $name
        phone: $phone
        theme: $theme
        aboutus: $aboutus
      }
    ) {
      name
      phone
      theme
      aboutus
    }
  }
`;
