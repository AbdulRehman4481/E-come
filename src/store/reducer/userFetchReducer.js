import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, firestore } from "../../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const initialState = {
  userData: null,
  isLoading: false,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async (_, thunkAPI) => {
  try {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const q = query(
            collection(firestore, "users"),
            where("uid", "==", user.uid)
          );
          try {
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
              const userData = querySnapshot.docs.map((doc) => doc.data())[0];
              resolve(userData);
            } else {
              resolve(null); // No data found for this user
            }
          } catch (error) {
            console.error("Error fetching user data from Firestore:", error);
            reject(error);
          }
        } else {
          console.log("User is not authenticated.");
          resolve(null); // Resolve with null if user is not authenticated
        }
      });
    });
  } catch (error) {
    console.error("Error in fetchUser:", error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Redux slice for user data
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
        state.userData = action.payload; // Store fetched user data
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
