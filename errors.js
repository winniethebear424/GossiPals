// this is the file for errors management

export const ERRORS = {
    'auth-missing': 'Please login',
    'required-word': 'Should not be empty. Please input a word',
    'invalid-word': 'Please input a valid word',
    'auth-insufficient': 'wrong password',
    'unauthorized': 'Welcome, Please login',
    'Unauthorized': 'Please login',
    'required-username':'Please input a valid name, and less than 20 characters',
    'logout-failed':'logout error',
    'network-error':'network error, please try again',
    'msgs-required':'Please input a message',
};

export function renderErrorMessage(errorType, elementId) {
    const errorElement = document.getElementById(elementId);
    if (ERRORS[errorType]){
        errorElement.innerHTML = ERRORS[errorType];
        errorElement.style.display = 'block';        
    }
    else{
        errorElement.textContent = 'Unknown error';
    }
    
}