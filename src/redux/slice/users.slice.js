import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import UserApi from "../../api/services/userApi";
import Swal from "sweetalert2";

const toastMixin =
    Swal.mixin({
        toast: true,
        icon: 'success',
        title: 'General Title',
        animation: false,
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            toast.addEventListener('click', Swal.close)
        }
    });

const initialState = {
    user: {},
    otp: '',
    isLoading: false,
    isError: false,
    error: ''
}

function isRejectedAction(action) {
    return typeof action.type === 'string' && action.type.endsWith('/rejected') && action.type.includes('users')
}

function isPendingAction(action) {
    return typeof action.type === 'string' && action.type.endsWith('/pending') && action.type.includes('users')
}

export const getUserByToken = createAsyncThunk('users/getUserByToken', async (token, thunkAPI) => {
    const response = await UserApi.getUserByToken(token, thunkAPI);
    return response;
})

export const login = createAsyncThunk('users/login', async (data, thunkAPI) => {
    const response = await UserApi.login(data.data);
    localStorage.setItem('jwt', response.jwt);
    thunkAPI.dispatch(getUserByToken(response.jwt));
    data.modal.close();
    return response;
})

export const registerAccount = createAsyncThunk('users/register', async (data, thunkAPI) => {
    const response = await UserApi.register(data.data);
    localStorage.setItem('jwt', response.jwt);
    thunkAPI.dispatch(getUserByToken(response.jwt));
    data.modal.close();
    return response;
})

export const updateProfile = createAsyncThunk('users/updateProfile', async (data, thunkAPI) => {
    const response = await UserApi.updateProfile(data);

    thunkAPI.dispatch(getUserByToken(response.jwt));
    return response;
})

export const updateContact = createAsyncThunk('users/updateContact', async (data, thunkAPI) => {
    const response = await UserApi.updateContact(data);
    thunkAPI.dispatch(getUserByToken(response.jwt));
    return response;
})

export const sendOtp = createAsyncThunk('users/sendOtp', async (data, thunkAPI) => {
    const response = await UserApi.sendOtp(data);
    return response;
})

export const changePassword = createAsyncThunk('users/changePassword', async (data, thunkAPI) => {
    await UserApi.changePassword(data);
})

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('jwt');
            state.user = {};
        },
        clearOtp: (state) => {
            state.otp = '';
        }
    },
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                toastMixin.fire({
                    icon: 'success',
                    title: 'Login successful!',
                })
            })
            .addCase(registerAccount.fulfilled, (state, action) => {

                state.isLoading = false;
                state.isError = false;
                toastMixin.fire({
                    icon: 'success',
                    title: 'Register successful!',
                })
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                localStorage.setItem('jwt', action.payload.jwt);
                state.isLoading = false;
                state.isError = false;
                toastMixin.fire({
                    icon: 'success',
                    title: 'Update successful!',
                    target: document.getElementById('account_modal')
                })
            })
            .addCase(updateContact.fulfilled, (state, action) => {
                localStorage.setItem('jwt', action.payload.jwt);
                state.isLoading = false;
                state.isError = false;
                toastMixin.fire({
                    icon: 'success',
                    title: 'Update successful!',
                    target: document.getElementById('account_modal')
                })
            })
            .addCase(getUserByToken.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
            })
            .addCase(sendOtp.fulfilled, (state, action) => {
                state.otp = action.payload;
                state.isLoading = false;
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
                toastMixin.fire({
                    icon: 'success',
                    title: 'Change password successful!'
                })
                state.otp = '';
            })
            .addMatcher(isPendingAction, (state) => {
                state.isLoading = true;
            })
            .addMatcher(isRejectedAction, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                toastMixin.fire({
                    icon: 'error',
                    title: action.error.message,
                    target: document.getElementById('account_modal')
                })
            })
    }
})

export const { logout, clearOtp } = usersSlice.actions;
export default usersSlice.reducer