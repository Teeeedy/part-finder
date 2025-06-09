export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// utils/apiPaths.js
export const API_PATHS = {
  DASHBOARD: {
    GET_MAKES: "/api/makes",
    GET_MODELS: (makeId) => `/api/makes/${makeId}/models`,
    GET_TYPES: (makeId, modelId) =>
      `/api/makes/${makeId}/models/${modelId}/types`,
    GET_PARTS: (makeId, modelId, typeId) =>
      `/api/parts?make_id=${makeId}&model_id=${modelId}&type_id=${typeId}`,
  },
};
