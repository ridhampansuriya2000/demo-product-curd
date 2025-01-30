import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (page: number) => {
        const response = await fetch(`https://dummyjson.com/products?skip=${page*9}&limit=9`);
        const data = await response.json();
        return data;
    }
);

export const deleteProduct = createAsyncThunk<number, number>(
    'products/deleteProduct',
    async (productId: number) => {
        await fetch(`https://dummyjson.com/products/${productId}`, {
            method: 'DELETE',
        });
        return productId;
    }
);

export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (newProduct: any) => {
        const response = await fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct),
        });
        const data = await response.json();
        return data;
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        totalPages: 0,
        currentPage: 1,
    },
    reducers: {
        setPage(state, action) {
            state.currentPage = action.payload;
        },
        setProducts(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.items = action.payload.products;
                state.totalPages = Math.floor(action.payload.total/9);
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.items = state.items.filter((product: any) => product.id !== action.payload);
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.items.push(action.payload);
            });
    },
});

export const { setPage, setProducts } = productSlice.actions;

export default productSlice.reducer;