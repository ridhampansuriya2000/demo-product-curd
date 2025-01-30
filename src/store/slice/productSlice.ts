import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (page: number) => {
        const response = await fetch(`https://dummyjson.com/products?skip=${0*9}&limit=0`); // if pass page then we can get get data of spacific page
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
            state.totalPages = Math.ceil(action.payload.length/9);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.items = action.payload.products;
                state.totalPages = Math.ceil(action.payload.total/9);
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                const  newArray = state.items.filter((product) => product.id !== action.payload)
                state.items = state.items.filter((product) => product.id !== action.payload);
                state.totalPages = Math.ceil(newArray.length/9);
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.items.push(action.payload);
            });
    },
});

export const { setPage, setProducts } = productSlice.actions;

export default productSlice.reducer;