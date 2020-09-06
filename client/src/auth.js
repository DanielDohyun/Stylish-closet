

const auth = firebase.auth();
const db = firebase.firestore();

//logout
//need to give id of logout button as logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log('user signed out')
  });
});  


//login 
//need to make login form
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  //get user info from email and password input field 
  //id
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  auth.signInWithEmailAndPassword(email, password).then(credential => {
    console.log(credential.user);

    //close the login modal and reset the form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.requestFullscreen();
  })

})
