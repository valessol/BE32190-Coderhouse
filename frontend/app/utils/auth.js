// export const registerUser = async (user) => {
//   console.log(user);
//   const response = await fetch(`http://localhost:8080/api/auth/register`, {
//     method: "POST",
//     // headers: {
//     //   Accept: "application/json",
//     //   "Content-Type": "application/json",
//     //   "Access-Control-Allow-Origin": "*",
//     // },
//     // mode: "cors",
//     credentials: "include",
//     body: JSON.stringify(user),
//   });

//   const data = await response.json();
//   const { access_token } = data;

//   if (!access_token) throw new Error("Error de registro");
//   return data;
// };
