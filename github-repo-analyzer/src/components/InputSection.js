import React from "react";

const InputSection = ({ repoUrl, onInputChange, onAnalyzeClick }) => {
  return (
    <div className="input-section">
      <div className="input-group">
        <div className="input-field">
          <label htmlFor="repo-url">GitHub Repository URL</label>
          <input
            type="text"
            id="repo-url"
            placeholder="https://github.com/username/repository"
            value={repoUrl}
            onChange={onInputChange}
          />
        </div>
        <button className="analyze-btn" onClick={onAnalyzeClick}>
          Analyze Repository
        </button>
      </div>
    </div>
  );
};

export default InputSection;
