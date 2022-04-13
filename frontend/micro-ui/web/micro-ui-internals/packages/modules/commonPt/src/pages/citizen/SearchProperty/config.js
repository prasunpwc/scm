export const config = [
  {
    texts: {
      header: "SEARCH_PROPERTY",
      submitButtonLabel: "PT_HOME_SEARCH_RESULTS_BUTTON_SEARCH",
      text: "Provide atleast one search parameter",
    },
    inputs: [
      {
        label: "Owner Mobile Number",
        type: "mobileNumber",
        name: "mobileNumber",
        validation:{pattern:{  value: /[6789][0-9]{9}/,
        message: "CORE_COMMON_MOBILE_ERROR",}},
        error: "CORE_COMMON_MOBILE_ERROR",
      },
      {
        label: "Property ID",
        description: "CS_PROPERTY_ID_FORMAT_MUST_BE",
        type: "text",
        name: "propertyIds",
        error: "ERR_INVALID_PROPERTY_ID",
        validation: {
          pattern: {
            value: /^[a-zA-Z0-9-]*$/i,
            message: "ERR_INVALID_PROPERTY_ID",
          },
        },
      },
      {
        label: "Old Property ID",
        type: "text",
        name: "oldPropertyId",
        error: "ERR_INVALID_PROPERTY_ID",
        validation: {
          pattern: {
            value: /^[a-zA-Z0-9-]*$/i,
            message: "ERR_INVALID_PROPERTY_ID",
          },
        },
      }, {
        label: "Consumer Name",
        type: "text",
        name: "name",
        validation: {
          pattern: {
            value: "[A-Za-z .`'-]{3,63}",
            message: "PAYMENT_INVALID_NAME",
          },
        },
        error: "PAYMENT_INVALID_NAME",
      }, {
        label: "Door Number",
        type: "text",
        name: "doorNumber",
        validation:{pattern: {
          value: "[A-Za-z0-9#,/ -()]{1,63}",
          message: "ERR_INVALID_DOOR_NO",
        }},
        error: "ERR_INVALID_DOOR_NO",
      },
    ],
  },
];
