import React,{createContext,useCallback,useContext,useEffect,useMemo,useState} from 'react';
import {loadFromStorage,saveToStorage} from '../utils/storage';
const OrderContext=createContext(null);
export function OrderProvider({children}){
 const [orders,setOrders]=useState(()=>loadFromStorage('orders',[]));
 useEffect(()=>saveToStorage('orders',orders),[orders]);
 const placeOrder=useCallback((items,totalItems,totalPrice,user)=>{const order={id:'ORD-'+Date.now(),date:new Date().toISOString(),status:'Demo Order Placed',user:user?.name||'Guest',items:items.map(({id,title,price,thumbnail,quantity})=>({id,title,price,thumbnail,quantity})),totalItems,totalPrice};setOrders(prev=>[order,...prev]);return order;},[]);
 const clearOrders=useCallback(()=>setOrders([]),[]); const value=useMemo(()=>({orders,placeOrder,clearOrders}),[orders,placeOrder,clearOrders]);
 return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}
export function useOrders(){const ctx=useContext(OrderContext);if(!ctx)throw new Error('useOrders must be used inside OrderProvider');return ctx;}
