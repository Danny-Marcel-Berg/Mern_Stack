import http from "http";

// Simple test runner for backend API
const PORT = 3000;

function makeRequest(options, postData) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve({ statusCode: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          resolve({ statusCode: res.statusCode, body: data });
        }
      });
    });
    req.on("error", reject);
    if (postData) {
      req.write(JSON.stringify(postData));
    }
    req.end();
  });
}

async function runTests() {
  console.log("Starting API Tests...");

  try {
    // 1. Test SignUp
    const signupRes = await makeRequest(
      {
        hostname: "localhost",
        port: PORT,
        path: "/api/auth/signup",
        method: "POST",
        headers: { "Content-Type": "application/json" },
      },
      { username: "testuser", email: "test@example.com", password: "password123" }
    );
    console.log("Signup status:", signupRes.statusCode, signupRes.body);

    // 2. Test SignIn
    const signinRes = await makeRequest(
      {
        hostname: "localhost",
        port: PORT,
        path: "/api/auth/signin",
        method: "POST",
        headers: { "Content-Type": "application/json" },
      },
      { email: "test@example.com", password: "password123" }
    );
    console.log("Signin status:", signinRes.statusCode, signinRes.body);

    // 3. Test Get Listings
    const listingsRes = await makeRequest({
      hostname: "localhost",
      port: PORT,
      path: "/api/listing/get",
      method: "GET",
    });
    console.log("Get listings status:", listingsRes.statusCode, "Count:", listingsRes.body.length);

    console.log("All API Tests completed successfully.");
  } catch (err) {
    console.error("API Test Error:", err);
    process.exit(1);
  }
}

runTests();
