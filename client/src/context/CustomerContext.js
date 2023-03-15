import React, {useState,createContext} from 'react'

export const CustomerContext = createContext();

export const CustomerContextProvider = (props) => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null)

    const addCustomers = (customer) => {
        //... customers adds the current customer that are currently saved in the Users array
        //, second customer adds the newly passed customer to the customers array
        setCustomers([...customers, customer])
    }
    return(
        <UserContext.Provider value = {{customers, setCustomers,addCustomers,selectedCustomer,setSelectedCustomer}}>
            {props.children}
        </UserContext.Provider>
    )
}