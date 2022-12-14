export type Product = {
    id: string;
    name: string;
    quantity: string;
    status: string;
    thumbnailImage: string;
    qty: number;
    salePrice: string;
    checked: number;
};



export type ProductsContextType = {
    productsContext: Array<Product>
    setProductsContext: (value: Array<Product>)=> void ;
}