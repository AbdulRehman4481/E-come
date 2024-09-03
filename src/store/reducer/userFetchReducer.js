import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, firestore } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const initialState = {
  userData: null,
  isLoading: false,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(firestore, "users", user.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            resolve(userDoc.data());  
          } else {
            reject("User document does not exist");
          }
        } catch (error) {
          reject(error.message);  
        }
      } else {
        resolve(null);  
      }
    });
  });
});


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
