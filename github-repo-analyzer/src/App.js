import React, { useState } from "react";
import RepoCard from "./components/RepoCard";
import RepoMetrics from "./components/RepoMetrics";
import ContributorList from "./components/ContributorList";
import CommitActivity from "./components/CommitActivity";
import Header from "./components/Header";
import InputSection from "./components/InputSection";
import ErrorMessage from "./components/ErrorMessage";
import GitHubCallback from "./components/GitHubCallback";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [repoData, setRepoData] = useState(null);
  const [contributors, setContributors] = useState([]);
  const [commitActivity, setCommitActivity] = useState([]);
  const [error, setError] = useState(null);
  const [totalCommits, setTotalCommits] = useState(0);
  const [token] = useState(localStorage.getItem("githubToken"));

  const handleInputChange = (event) => {
    setRepoUrl(event.target.value);
  };

  const redirectToGitHub = () => {
    const clientId = "Ov23li7Vb3Ob0OrZAxmR";
    const redirectUri = "http://localhost:3000/callback";
    const scope = "repo user";
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    window.location.href = githubAuthUrl;
  };

  const fetchRepoData = async () => {
    setError(null);

    if (!repoUrl) {
      setError("Please enter a GitHub repository URL.");
      return;
    }

    const repoName = repoUrl.split("github.com/")[1];

    if (!repoName) {
      setError(
        "Invalid URL format. Make sure the URL is in the correct format."
      );
      return;
    }

    if (!token) {
      setError("Authorization required. Please log in with GitHub.");
      return;
    }

    try {
      const response = await fetch(`https://api.github.com/repos/${repoName}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.status === 403) {
        setError("API rate limit exceeded. Please try again later.");
        return;
      }

      if (!response.ok) {
        setError("Error fetching repository data.");
        return;
      }

      const [contributorsResponse, commitsResponse] = await Promise.all([
        fetch(`https://api.github.com/repos/${repoName}/contributors`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        fetch(
          `https://api.github.com/repos/${repoName}/stats/commit_activity`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
      ]);

      const contributorsData = await contributorsResponse.json();
      const commitsData = await commitsResponse.json();
      const commits = await fetchTotalCommits(repoName, token);

      setRepoData(data);
      setContributors(Array.isArray(contributorsData) ? contributorsData : []);
      setCommitActivity(Array.isArray(commitsData) ? commitsData : []);

      setTotalCommits(commits);
    } catch (err) {
      setError("Error fetching repository data.");
    }
  };

  const fetchTotalCommits = async (repoName, token) => {
    const response = await fetch(
      `https://api.github.com/repos/${repoName}/commits`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const commits = await response.json();
    setTotalCommits(commits);
  };

  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <button
                    onClick={redirectToGitHub}
                    className="github-login-button"
                  >
                    {!token
                      ? "Login with GitHub"
                      : "Welcome to GitHub Repo Analyzer"}
                  </button>

                  <InputSection
                    repoUrl={repoUrl}
                    onInputChange={handleInputChange}
                    onAnalyzeClick={fetchRepoData}
                  />
                  {error && <ErrorMessage error={error} />}
                  {repoData && (
                    <>
                      <div className="results-grid">
                        <RepoCard repoData={repoData} />
                        <RepoMetrics
                          repoData={repoData}
                          totalCommits={totalCommits}
                        />
                        <CommitActivity commitActivity={commitActivity} />
                      </div>
                      <ContributorList contributors={contributors} />
                    </>
                  )}
                </>
              }
            />
            <Route path="/callback" element={<GitHubCallback />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
