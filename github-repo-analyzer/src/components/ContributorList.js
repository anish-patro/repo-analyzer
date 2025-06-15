import React from "react";

const ContributorList = ({ contributors }) => {
  return (
    <div className="result-card">
      <div className="card-header">
        <div className="card-icon contributors-icon">👥</div>
        <div className="card-title">Top 10 Contributors</div>
      </div>
      <div className="contributor-list">
        {contributors.length > 0 &&
          contributors.slice(0, 10).map((contributor, index) => (
            <div key={index} className="contributor-item">
              <div className="contributor-avatar">{contributor.login[0]}</div>
              <div className="contributor-info">
                <div className="contributor-name">{contributor.login}</div>
                <div className="contributor-commits">
                  {contributor.contributions} commits
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ContributorList;
