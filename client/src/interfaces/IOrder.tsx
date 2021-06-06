export default interface IOrder {
    shipping: {
        address: {
            primary_address: string,
            secondary_address: string,
            city: string,
            state: string,
            country: string,
            zip_code: string,

        },
        cost: number
    },
    contact: {
        email: string,
        phone: string
    },
    billing: {
        payment_method: string,
        total_price: number
    },
    order_date: Date,
    items: Array<{
        id: string,
        quantity: number
    }>
}