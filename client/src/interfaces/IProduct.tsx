export default interface IProduct {
    code: string,
    name: string,
    description: string,
    weight?: string,
    image: string,
    calories?: string
    price: number,
    available: Boolean,
    stock: number,
    images: Array<string>,
    ingredients?: Array<string>
}