import React from "react";

const RepoCard = ({ repoData }) => {
  return (
    <div className="result-card repo-info">
      <div className="card-header">
        <div className="card-icon repo-icon">📊</div>
        <div className="card-title">Repository Information</div>
      </div>
      <div className="repo-header">
        <div className="repo-name">{repoData.name}</div>
      </div>
      <div className="repo-description">{repoData.description}</div>
      <div className="repo-stats">
        <div className="stat-item">
          <span>⭐</span>
          <span className="stat-value">{repoData.stargazers_count}</span>
          <span>Stars</span>
        </div>
        <div className="stat-item">
          <span>🍴</span>
          <span className="stat-value">{repoData.forks_count}</span>
          <span>Forks</span>
        </div>
        <div className="stat-item">
          <span>👀</span>
          <span className="stat-value">{repoData.watchers_count}</span>
          <span>Watchers</span>
        </div>
      </div>
    </div>
  );
};

export default RepoCard;
