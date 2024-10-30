export interface IProduct {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    category: string;
    rating: {
        count: number;
        rate: number;
    };
}

export interface ICartProduct extends IProduct {
    quantity: number;
}

export interface ICart {
    id: number;
    userId: number;
    totalQuantity: number;
    totalPrice: number;
    products: IProduct[];
}
