import "../assets/css/App.css";

export function Home() {
  return (
    <div className="app">
      <h1 className="app-title">Words</h1>
      <div className="app-content">
        <p>
          This interactive word cloud visualizes the frequency distribution of
          6,000 randomly generated words fetched from an external API. Each
          word's size is proportional to how often it appears in the dataset,
          with larger text indicating higher frequency. Words are displayed in
          random colors and arranged in a dynamic cloud formation.
        </p>
        <p>
          The application fetches processed word frequency data from a
          Node.js/TypeScript backend server, which aggregates and calculates the
          occurrence count of each unique word. Click the button below to
          generate a new word cloud.
        </p>

        <p>
          If you read so far, it's only fair to say that this while page is
          dedicated to give the app some extra time to load the words from the
          backend.
        </p>
      </div>
    </div>
  );
}
