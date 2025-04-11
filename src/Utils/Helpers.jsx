export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };
  
  export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };