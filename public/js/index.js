import '@babel/polyfill';
import { login, logout } from './login';
import { updateData } from './updateSettings';

const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');

if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
if (logOutBtn) logOutBtn.addEventListener('click', logout);
if (userDataForm)
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const firstName = document.getElementById('firstName').value;
    updateData(firstName, email);
  });

// Cast to string failed for value "{}" (type Object) at path "firstName"
