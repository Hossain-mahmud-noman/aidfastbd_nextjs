import { del, get, patch, post, postForm, put, deleted } from "./api";

//auth
export const sendOtp = (data) => post("/otps/send", data);
export const postSignup = (data) => post("/users/register", data);
export const postLogin = (data) => post("/auth/login", data);
export const googleLogin = (data) => post("/auth/verify-with-google", data);
export const postVerifyOTP = (data) => post("/auth/forget-password/verify-otp", data);
export const updatePassword = (data) => patch("/auth/password-update", data);

//newsletter
export const fetchNewsletterList = (data) => get('/subscribers', data)
export const postNewsletterList = (data) => post('/subscribers', data)
export const fetchNewsletterDetails = (data) => get(`/newsletters/${data._id}`, data)
export const postNewsletter = (data) => post('/newsletters', data)
export const postNewsletterMessage = (data) => post(`/subscribers/send-email`, data)
export const patchNewsletter = (data) => patch(`/newsletters/${data._id}`, data)
export const deleteNewsletter = (data) => del(`/subscribers/${data._id}`)

