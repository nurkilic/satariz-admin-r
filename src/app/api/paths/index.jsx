const API_URL = 'https://www.satariz.com/api/v1'
export const BASE_URL = 'https://www.satariz.com/storage/'
export const GET_USER_DATA = `${API_URL}/auth/me`;
export const GET_SETTINGS_DATA = `${API_URL}/admin/app/init`;
export const GET_CONTRACTS = `${API_URL}/admin/contracts`;
export const UPDATE_CONTRACTS = `${API_URL}/admin/contracts/update`;
export const SETTING_IMAGE_STORE = `${API_URL}/admin/settings/image-store`;
export const PROVINCE_UPDATE = `${API_URL}/admin/geo-locations/province-update`;
export const PROVINCE_CREATE = `${API_URL}/admin/geo-locations/province-create`;
export const PROVINCE_DELETE = `${API_URL}/admin/geo-locations/province-delete/`;
export const SETTING_CONTACT_INFO_STORE = `${API_URL}/admin/settings/contact-store`;
export const SETTING_COMPANY_INFO_STORE = `${API_URL}/admin/settings/company-info-store`;
export const ALT_BASE_URI = `https://www.satariz.com`;

export const GET_PROVINCES = `${API_URL}/admin/values/provinces`;
export const GET_DISTRICTS = `${API_URL}/admin/values/districts/`;
export const GET_TAX_OFFICES = `${API_URL}/admin/values/tax-offices/`;
export const GET_TOWNS = `${API_URL}/admin/values/towns/`;

export const GET_COMPANIES = `${API_URL}/admin/companies`;
export const GET_COMPANY = `${API_URL}/admin/companies/profile/`;
export const PUT_USER = `${API_URL}/admin/users/update/:id`;
export const PUT_INVOICE_INFORMATION = `${API_URL}/admin/invoice/information-update/:id`;
export const PUT_COMPANY = `${API_URL}/admin/companies/profile/:id/update`;
export const PUT_SALE_REPRESENTATIVE = `${API_URL}/admin/companies/profile/:id/sale-representative-update`;
export const DELETE_SALE_REPRESENTATIVE = `${API_URL}/admin/companies/profile/:id/sale-representative-delete/`;

export const GET_LISTINGS = `${API_URL}/admin/listings`;
export const GET_CATEGORIES = `${API_URL}/admin/categories`;
