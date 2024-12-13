import { gql } from "@apollo/client";

export const CREATE_SURVEY_DATA = gql`
  mutation createSurveyData(
    $name: String
    $phone: String
    $theme: String
    $aboutus: String
  ) {
    insert_survey_data_one(
      object: { name: $name, phone: $phone, theme: $theme, aboutus: $aboutus }
    ) {
      name
      phone
      theme
      aboutus
    }
  }
`;

export const SEND_SMS = gql`
  mutation sendSMS($name: String!, $phone: String!) {
    sendSMS(name: $name, phone: $phone) {
      message
      transactionId
      luckyDrawNumber
    }
  }
`;
