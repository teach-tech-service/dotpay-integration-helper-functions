const { sha256 } = require("js-sha256");
const dotenv = require("dotenv").config();

//kolejność ma znaczenie !!!! - https://www.dotpay.pl/developer/doc/api_payment/pl/index.html#document-03_dodatkowe_funkcjonalnosci
const sendParams = [
  "api_version",
  "lang",
  "id",
  "pid",
  "amount",
  "currency",
  "description",
  "control",
  "channel",
  "credit_card_brand",
  "ch_lock",
  "channel_groups",
  "onlinetransfer",
  "url",
  "type",
  "buttontext",
  "urlc",
  "firstname",
  "lastname",
  "email",
  "street",
  "street_n1",
  "street_n2",
  "state",
  "addr3",
  "city",
  "postcode",
  "phone",
  "country",
  "code",
  "p_info",
  "p_email",
  "n_email",
  "expiration_date",
  "deladdr",
  "recipient_account_number",
  "recipient_company",
  "recipient_first_name",
  "recipient_last_name",
  "recipient_address_street",
  "recipient_address_building",
  "recipient_address_apartment",
  "recipient_address_postcode",
  "recipient_address_city",
  "application",
  "application_version",
  "warranty",
  "bylaw",
  "personal_data",
  "credit_card_number",
  "credit_card_expiration_date_year",
  "credit_card_expiration_date_month",
  "credit_card_security_code",
  "credit_card_store",
  "credit_card_store_security_code",
  "credit_card_customer_id",
  "credit_card_id",
  "blik_code",
  "credit_card_registration",
  "surcharge_amount",
  "surcharge",
  "ignore_last_payment_channel",
  "vco_call_id",
  "vco_update_order_info",
  "vco_subtotal",
  "vco_shipping_handling",
  "vco_tax",
  "vco_discount",
  "vco_gift_wrap",
  "vco_misc",
  "vco_promo_code",
  "credit_card_security_code_required",
  "credit_card_operation_type",
  "credit_card_avs",
  "credit_card_threeds",
  "customer",
  "gp_token",
  "id1",
  "amount1",
  "currency1",
  "description1",
  "control1",
  "control1"
];

const getParams = [
  "id",
  "operation_number",
  "operation_type",
  "operation_status",
  "operation_amount",
  "operation_currency",
  "operation_withdrawal_amount",
  "operation_commission_amount",
  "is_completed",
  "operation_original_amount",
  "operation_original_currency",
  "operation_datetime",
  "operation_related_number",
  "control",
  "description",
  "email",
  "p_info",
  "p_email",
  "credit_card_issuer_identification_number",
  "credit_card_masked_number",
  "credit_card_expiration_year",
  "credit_card_expiration_month",
  "credit_card_brand_codename",
  "credit_card_brand_code",
  "credit_card_unique_identifier",
  "credit_card_id",
  "channel",
  "channel_country",
  "geoip_country"
];

function generateHash(params, allowParams) {
  let stringToHash = process.env.DOTPAY_PIN;

  for (let i = 0; i < allowParams.length; i++) {
    if (allowParams[i] in params) {
      stringToHash += params[allowParams[i]];
    }
  }
  return sha256(stringToHash);
}

function generateURL(params) {
  let httpURL = `https://ssl.dotpay.pl/test_payment/?`;
  for (let key in params) {
    httpURL += `${key}=${params[key]}&`;
  }
  httpURL += `chk=${generateHash(params, sendParams)}`;
  return httpURL;
}

console.log(
  generateURL({
    id: "793781",
    amount: "225",
    description: "Test",
    lang: "pl",
    currency: "PLN",
    url: `http://localhost:5000/api/payments/check`,
    channel_groups: "K,T,M",
    firstname: "Marcin",
    lastname: "Warzybok",
    email: "marcinwarzybok@outlook.com",
    type: "0",
    buttontext: "Powrót",
    ignore_last_payment_channel: "1"
  })
);

console.log(
  generateHash(
    {
      id: "793781",
      operation_number: "M9982-39015",
      operation_type: "payment",
      operation_status: "completed",
      operation_amount: "299",
      operation_currency: "PLN",
      operation_original_amount: "299",
      operation_original_currency: "299",
      operation_datetime: "2014-06-01 12:06:37",
      control: "213123123",
      firstname: "Marcin",
      lastname: "Warzybok",
      email: "marciwarzybok@outlook.com"
    },
    getParams
  )
);
