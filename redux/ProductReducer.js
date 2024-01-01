import { createSlice } from "@reduxjs/toolkit";


export const productSlice = createSlice({
    name:'product',
    initialState:{
        product:[],
    },
    reducers:{
        getProducts:(state,action) => {
            state.product.push({...action.payload})
        },
        incrementQuantity:(state,action) => {
            const itemPresent = state.product.find((item) => item._id === action.payload._id);
            itemPresent.quantity++;
        },
        decrementQuantity:(state,action) => {
            const itemPresent = state.product.find((item) => item._id === action.payload._id);
            if(itemPresent.quantity == 1){
                const removeFromCart = state.product.filter((item) => item._id !== action.payload._id);
                state.cart = removeFromCart;
            }else{
                itemPresent.quantity--;
            }
        }
    }
})


export const {getProducts,incrementQuantity,decrementQuantity} = productSlice.actions;

export default productSlice.reducer;