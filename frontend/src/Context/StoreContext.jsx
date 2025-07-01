import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify';
import { jwtDecode } from "jwt-decode";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [Cartitem, setCartitem] = useState({});
    const url = "http://localhost:3000";
    const [token, setToken] = useState("")
    const [Product_list, setProductlist] = useState([]);

    const handleTokenExpiration = () => {
        localStorage.removeItem("token");
        setToken("");
        toast.error("Your session has expired. Please login again.");
    };

    const isTokenExpired = (token) => {
        try {
            const decoded = jwtDecode(token);
            return decoded.exp * 1000 < Date.now();
        } catch (error) {
            return true;
        }
    };

    const addtoCart = async(itemId) => {
        if (!Cartitem[itemId]) {
            setCartitem((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartitem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removefromCart = async (itemId) => {
        setCartitem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    const deletefromCart = (itemId) => {
        setCartitem((prev) => ({ ...prev, [itemId]: prev[itemId] * 0 }))
    }

    const getTotalcartAmount = () => {
        let totalAmount = 0;
        for (const item in Cartitem) {
            if (Cartitem[item] > 0) {
                let itemInfo = Product_list.find((product) => product._id === item);
                totalAmount += (itemInfo.price * Cartitem[item]);
            }
        }
        return totalAmount;
    }

    const fetchProductList = async () => {
        const response = await axios.get(`${url}/api/Product/list`);
        if (response.data.success) {
            setProductlist(response.data.data);
        } else {
            toast.error("error");
        }
    }

    const loadCartData=async (token) => {
        const response=await axios.post(url+"/api/cart/fetch",{},{headers:{token}})
        setCartitem(response.data.cartData);
    }

    useEffect(() => {
        async function loadData() {
            await fetchProductList();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                if (isTokenExpired(storedToken)) {
                    handleTokenExpiration();
                } else {
                    setToken(storedToken);
                    await loadCartData(storedToken);
                }
            }
        }
        loadData();
    }, [])

    // Add axios interceptor to handle token expiration
    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    handleTokenExpiration();
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, []);

    const ContextValue = {
        Product_list,
        Cartitem,
        setCartitem,
        addtoCart,
        removefromCart,
        deletefromCart,
        getTotalcartAmount,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={ContextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;