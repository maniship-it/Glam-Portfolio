/*
Single source of truth for the studio's contact details, shared by the site UI
(Footer) and the AI assistant's system prompt (server/trainingData.js).

The address previously lived in three places in two different spellings, which
is why the assistant kept inventing variations of it. Change it here only.
*/
export const CONTACT_INFO = {
  locality: "Chandauti More",
  city: "Gaya",
  region: "Bihar",
  postal_code: "823001",
  landmark: "Pyare Palace",

  /* The exact string to display or quote anywhere the full address is needed. */
  address: "Chandauti More, Gaya, Bihar 823001 (Landmark: Pyare Palace)",

  phone_display: "+91 82100 71659",
  phone_numeric: "+918210071659",
  whatsapp: "+918210071659",
  email: "hello@pujaglam.com"
};
