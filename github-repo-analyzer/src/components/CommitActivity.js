const CommitActivity = ({ commitActivity }) => {
  const topCommitActivity = commitActivity.slice(0, 7);

  return (
    <div className="result-card">
      <div className="card-header">
        <div className="card-icon activity-icon">📊</div>
        <div className="card-title">Commit Activity (7 days)</div>
      </div>
      <div className="activity-chart">
        {topCommitActivity.length > 0 ? (
          topCommitActivity.map((day, index) => (
            <div
              key={index}
              className="chart-bar"
              style={{ height: `${day.total}px` }}
            >
              <div className="chart-bar-label">{day.total}</div>
            </div>
          ))
        ) : (
          <div>No commit activity available for the last 7 days.</div>
        )}
      </div>
    </div>
  );
};

export default CommitActivity;
