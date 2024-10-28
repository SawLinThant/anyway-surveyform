import { gql } from "@apollo/client";

export const GET_EVENT_THEME = gql`
  query getTheme{
    event_themes (order_by: { created_at: desc }){
      id
      name
      created_at
    }
  }
`;