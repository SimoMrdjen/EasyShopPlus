import fetch from 'unfetch';

const checkStatus = response => {
    if (response.ok) {
        return response;
    }
    // convert non-2xx HTTP responses into errors:
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
}

export const getAllCustomers = () =>
    fetch("api/customers") //ovo je url API-a, prvi deo je definisan u proxy-u
        .then(checkStatus);

export const getCustomer = (id) =>
    fetch("api/customers/${id}") //ovo je url API-a, prvi deo je definisan u proxy-u
        .then(checkStatus);

export const getCustomersLike = (value) =>
    fetch(`api/customers/like?lastNameLike=${value}`) //ovo je url API-a, prvi deo je definisan u proxy-u
        .then(checkStatus);

 export const addNewCustomer = customer =>
     fetch("api/customers", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(customer)
            }
         ).then(checkStatus);

 export const deleteCustomer = customerId =>
     fetch(`api/customers/${customerId}`, {method: 'DELETE'})
            .then(checkStatus);

export const editCustomer = customer =>
     fetch(`api/customers/${customer.id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(customer)
            }
         );

export const createContract = contract =>
    fetch("api/contracts", {
        headers: {
            'Content-Type': 'application/json'
        },
        method:'POST',
        body:JSON.stringify(contract)
    }).then(checkStatus);

export const extractContract = response => {
    if (response.status !== 200) {
        throw new Error("Failed to create contract");
    }
    return response.json();
};
