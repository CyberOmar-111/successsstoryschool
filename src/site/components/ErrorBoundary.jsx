import { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Success Story School homepage failed to render.", error, info);
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <main className="app-error" role="alert" aria-labelledby="app-error-title">
        <section className="app-error-card">
          <img src="/assets/success-story-mark.png?v=3" alt="" width="72" height="72" />
          <p className="eyebrow">Success Story School</p>
          <h1 id="app-error-title">We could not load this page.</h1>
          <p>
            Please refresh the page or return to the school homepage. Student,
            teacher, and office accounts are still available from the links below.
          </p>
          <div className="app-error-actions">
            <a className="action-link primary" href="/">Return home</a>
            <a className="action-link secondary" href="/student">Student account</a>
          </div>
        </section>
      </main>
    );
  }
}
