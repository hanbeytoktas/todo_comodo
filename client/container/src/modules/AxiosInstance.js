import axios from 'axios';

const getBearer = () =>{
  return "Bearer "+localStorage.getItem('access_token');
}

const apiHeaders = async (configuration) => {
  configuration.headers = {
    Authorization: getBearer()
  };
  return configuration;
};

const apiInterceptorError = async (error) => {
  console.log('error', error);
  Promise.reject(error);
};

//const apiCall = axios.create({ baseURL: `${config.BASE_API}/${config.getTenant()}` });
const apiCall = axios.create({ baseURL: 'http://localhost:8080' });
apiCall.interceptors.request.use(apiHeaders, apiInterceptorError);
apiCall.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      return Promise.reject(error.response);
    }
    if (error.message) {
      return Promise.reject(error.message);
    } else {
      return Promise.reject({ meta: { status: 'BAD_REQUEST', response: 'Please try again.' } });
    }
  }
);

const queryBuilder = ({ page, limit, search = '', sort }) => {
  let sortRule;
  if (sort && sort === 'latest') {
    sortRule = [
      {
        field: 'createdAt',
        direction: 'desc'
      }
    ];
  } else if (sort && sort === 'oldest') {
    sortRule = [
      {
        field: 'createdAt',
        direction: 'asc'
      }
    ];
  }
  const request = {
    page,
    limit,
    search,
    sort: sortRule || sort
  };
  return request;
};

export { apiCall, queryBuilder };
