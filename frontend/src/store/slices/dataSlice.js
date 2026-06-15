import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchPlayers = createAsyncThunk(
  'data/fetchPlayers',
  async ({ page = 1, limit = 10, search = '', sort = '' }, { rejectWithValue }) => {
    try {
      let endpoint = `/players?page=${page}&limit=${limit}`;
      if (search) {
        endpoint = `/search/players?q=${search}&page=${page}&limit=${limit}`;
      } else if (sort) {
        endpoint = `/players/sort/${sort}?page=${page}&limit=${limit}`;
      }
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch players');
    }
  }
);

export const deletePlayer = createAsyncThunk(
  'data/deletePlayer',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/players/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete player');
    }
  }
);

const initialState = {
  players: [],
  total: 0,
  page: 1,
  limit: 10,
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
      state.page = 1; // Reset to page 1 on limit change
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.loading = false;
        // Adjust these depending on the exact backend response structure
        state.players = action.payload.data || action.payload; 
        state.total = action.payload.total || action.payload.length || 0;
      })
      .addCase(fetchPlayers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePlayer.fulfilled, (state, action) => {
        state.players = state.players.filter((p) => p.ID !== action.payload && p._id !== action.payload && p.id !== action.payload);
        state.total -= 1;
      });
  },
});

export const { setPage, setLimit } = dataSlice.actions;

export default dataSlice.reducer;
