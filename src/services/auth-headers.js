// Con esto nos aseguramos a la hora de sacar informacion de la API, protegemos dichos recursos con un Authorization header

export default function authHeader(){
    const user = JSON.parse(localStorage.getItem("user"));

    if(user && user.accessToken)
        return {'x-access-token':user.accessToken}
    else
        return {};
}