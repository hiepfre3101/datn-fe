import { createSlice } from '@reduxjs/toolkit';
interface ICart{
    product_id: string;
    product_name: string;
    product_image: string;
    price:number;
    quantity:number;    
}

const initState ={
    cart:[],
    cart_name:''
} as {cart:ICart[], cart_name:string}

const cartSlice = createSlice({
   name: 'cart',
   initialState: initState,
   reducers: {
      featchCart: (state, action) => {   
         let cart_data  
         if(action.payload!=null){
           cart_data =  localStorage.getItem(action.payload)==null?localStorage.setItem(`${action.payload}`,JSON.stringify([])): JSON.parse(localStorage.getItem(action.payload)!)
            state.cart_name=action.payload
         } 
         else{
             cart_data = localStorage.getItem("cart")==null?localStorage.setItem('cart',JSON.stringify([])): JSON.parse(localStorage.getItem('cart')!)
             state.cart_name='cart'
            }
         state.cart = cart_data;  
      },
      addCart:(state,action)=>{
         state.cart = [...state.cart, action.payload];
         localStorage.setItem(`${state.cart_name}`,JSON.stringify(state.cart));
      }
   }
});

export const { featchCart,addCart  } = cartSlice.actions;

export default cartSlice.reducer;