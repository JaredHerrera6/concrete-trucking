import React, {useState, createContext} from "react";


export const OrderContext = createContext();

export const OrderContextProvider = (props) => {
    //Order Context Arrays
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null)

    //Driver Context Arrays
    
    //Manager Context Arrays

    

    const addOrders = (order) => {
        //... order adds the current orders that are currently saved in the order array
        //, second user adds the newly passed order to the users array
        setOrders([...orders,order])
    }
    return (
        <OrderContext.Provider value = {{orders, setOrders, addOrders, selectedOrder,setSelectedOrder}}>
            {props.children}
        </OrderContext.Provider>
    )
}
