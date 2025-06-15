import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GitHubCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      fetch("http://localhost:8080/auth/github", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.access_token) {
            localStorage.setItem("githubToken", data.access_token);
            navigate("/");
          } else {
            console.error("Token not received:", data);
          }
        })
        .catch((err) => {
          console.error("Error during token exchange:", err);
        });
    }
  }, [navigate]);

  return <div>Logging you in via GitHub...</div>;
};

export default GitHubCallback;