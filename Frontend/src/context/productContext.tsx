"use client";
import { fetchData } from "#/utils/api";
import { createContext, useContext, useEffect, useState } from "react";



type Product = {
    _id: string;
    title: string;
    slug: string;
    url: string;
    image: string;
    newPrice: number;
    oldPrice: number;
    countStar: number;
    totalBuy: number;
    salePercent: number;
    category: string;
    description: string;
}

type ProductContextType = {
    products: Product[];
    loading: boolean;
    error: string | null;
    reloadProducts: () => Promise<void>;
}
const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({children}:{children: React.ReactNode}) => {
    const [products , setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const reloadProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchData('/products');
            setProducts(data);
        } catch (error : any ) {
            setError(error.message)
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        reloadProducts();
    },[])
    return (
        <ProductContext.Provider value={{ products, loading, error, reloadProducts}}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if(!context) throw new Error('để sử dụng useProducts phải thêm ProductProvider');
    return context;
}