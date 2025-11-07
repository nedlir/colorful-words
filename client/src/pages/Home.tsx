import "../assets/css/App.css";

export function Home() {
  return (
    <div className="app">
      <h1 className="app-title">Word Cloud Visualizer</h1>
      <div className="app-content">
        <p>
          An interactive visualization showcasing 6,000 randomly generated words
          from an external API. Each word's size reflects its frequency in the
          dataset, creating a beautiful, dynamic cloud formation.
        </p>
        <p>
          Built with a modern Node.js/TypeScript backend that processes and
          aggregates word frequencies in real-time. Navigate to the Words page
          to explore the visualization.
        </p>
        <p>
          The text above is a placeholder text, written just to add some "meat"
          to the Home page.
        </p>
      </div>
    </div>
  );
}
