const print = (message) => console.log(message)

const signIn = document.getElementById('signIn')

const userNameValue = document.getElementById('userName')
const passwordValue = document.getElementById('password')


signIn.addEventListener('click', function () {
    const userName = userNameValue.value
    const password = passwordValue.value
    if (userName == 'admin' && password == 'admin123') {
        window.location.href = "home.html"
    } else {
        alert("Wrong username or password")
    }

})