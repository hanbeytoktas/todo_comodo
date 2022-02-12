import { action, computed, createContextStore, thunk } from 'easy-peasy';
import {deleteProduct,getProduct,getProducts,saveProduct} from '../../../services/GroupService'

const latest = [{ field: 'createdAt', direction: 'desc' }];
const oldest = [{ field: 'createdAt', direction: 'asc' }];
const latestUpdated = [{ field: 'updatedAt', direction: 'desc' }];
const oldestUpdated = [{ field: 'updatedAt', direction: 'asc' }];

const productItems = {
  id:null,
  ref: null,
  amount: null,
  customer: null,
  createdAt: null,
  status: 'pending'
};

const initialProducts = {
  loading: false,
  items: [],
  search: '',
  limit: 12,
  size: 0,
  page: 0,
  pages: 0,
  total: 0,
  sort: { value: latest, label: 'common.latestCreated' },
  sortOptions: [
    { value: latest, label: 'common.latestCreated' },
    { value: oldest, label: 'common.oldestCreated' },
    { value: latestUpdated, label: 'common.latestUpdated' },
    { value: oldestUpdated, label: 'common.oldestUpdated' }
  ]
};


const ProductStore = createContextStore ({

  product: { ...productItems },
  productList: {...initialProducts},
  //Actions
  setRef: action((state, payload) => {
    state.product.ref = payload;
  }),
  setAmount: action((state, payload) => {
    state.product.amount = payload;
  }),
  setCustomer: action((state, payload) => {
    state.product.customer = payload;
  }),
  setCreatedAt: action((state, payload) => {
    state.product.createdAt = payload;
  }),
  setStatus: action((state, payload) => {
    state.product.status = payload;
  }),
  addProduct: action((state) => {
    state.productList.items.push(state.product);
  }),
  isPending: computed((state) => {
    return state.product.status==='pending';
  }),
  //Thunks
  saveProduct: thunk(async (actions, payload) => {
    //await saveProduct(payload);
  }),
  deleteProduct: thunk(async (actions, id) => {
    //await deleteProduct(id);
  }),
  getProducts:  thunk(async (actions, payload) => {
    //const { limit, page, search, sort } = getState();//getState mevcut local state'i getirir
    //const response = await getProducts({ limit, page, search, sort: sort.value });
  }),
  getProduct:  thunk(async (actions, id) => {
    //const response = await getProduct(id);
  }),
});

export default ProductStore;
