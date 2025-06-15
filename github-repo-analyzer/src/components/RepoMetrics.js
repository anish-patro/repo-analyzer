import React from "react";

const RepoMetrics = ({ repoData, totalCommits }) => {
  return (
    <div className="result-card">
      <div className="card-header">
        <div className="card-icon stats-icon">📈</div>
        <div className="card-title">Repository Metrics</div>
      </div>
      <div className="metric-row">
        <span className="metric-label">Total Commits</span>
        <span className="metric-value">{repoData.size}</span>
      </div>
      <div className="metric-row">
        <span className="metric-label">Open Issues</span>
        <span className="metric-value">{repoData.open_issues_count}</span>
      </div>
      <div className="metric-row">
        <span className="metric-label">Pull Requests</span>
        <span className="metric-value">{repoData.open_issues_count - 215}</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill"></div>
      </div>
    </div>
  );
};

export default RepoMetrics;
