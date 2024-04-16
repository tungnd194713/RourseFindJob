export default (context, inject) => {
  const handleResponse = (response) => {
    if (response.status === 200) {
      return {
        message: response.data.message ?? '',
        errors: []
      };
    } else {
      return {
        message: '',
        errors: response.response.data.errors,
        errorMsg: response.response.data.message ?? ''
      };
    }
  };

  inject('handleResponse', handleResponse);
  context.$handleResponse = handleResponse;
};
