import IProduct from '../interfaces/IProduct';
export const PRODUCT_LOADING = "PRODUCT_LOADING";
export const PRODUCT_FAIL = "PRODUCT_FAIL";
export const PRODUCT_SUCCESS = "PRODUCT_SUCCESS";

export interface ProductLoading {
  type: typeof PRODUCT_LOADING
}

export interface ProductFail {
  type: typeof PRODUCT_FAIL
}

export interface ProductSuccess {
  type: typeof PRODUCT_SUCCESS,
  payload: Array<IProduct>
}

export type ProductDispatchTypes = ProductLoading | ProductFail | ProductSuccess