const initialState = {
  newVendor: {},
  servicesList: [],
  ongoingAppointmentsList: [],
  completedAppointmentsList: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_SERVICES":
      return {
        ...state,
        servicesList: action.payload,
      };
    case "ADD_NEW_VENDOR":
      return {
        ...state,
        newVendor: action.payload,
      };
    case "ADD_NEW_SERVICE":
      return {
        ...state,
        servicesList: state.servicesList.concat(action.payload),
      };
    case "DELETE_SERVICE":
      return {
        ...state,
        servicesList: state.servicesList.filter(
          (service) => service._id !== action.payload
        ),
      };
    case "LOAD_APPOINTMENTS":
      return {
        ...state,
        appointmentsList: action.payload,
      };
    case "COMPLETE_APPOINTMENT":
      return {
        ...state,
        servicesList: action.payload,
      };
    case "STORE_VENDOR_DATA":
      return {
        ...state,
        profile: action.payload,
      };
  }
  return state;
};
