
// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.getElementById("addForm");

//   form.addEventListener("submit", async (e) => {
//     e.preventDefault();  // stop default page reload

//     const formData = new FormData(form);
//     const data = {
//       username: formData.get("username"),
//       email: formData.get("email"),
//       password: formData.get("password")
//     };

//     try {
//       const response = await fetch("/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(data)
//       });

//       const result = await response.json();
//       console.log("User created:", result);

//       alert("✅ Password added successfully!");
//       form.reset();
//     } catch (err) {
//       console.error("Error:", err);
//       alert("❌ Something went wrong.");
//     }
//   });
// });
