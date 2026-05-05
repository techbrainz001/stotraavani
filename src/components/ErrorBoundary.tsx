import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', 
          justifyContent: 'center', minHeight: '100vh', padding: '20px',
          textAlign: 'center', backgroundColor: 'var(--bg-primary_premium)',
          color: 'var(--text-primary_premium)'
        }}>
          <h2>Something went wrong</h2>
          <p style={{ marginTop: '10px', color: 'var(--accent-primary_premium)' }}>
            {this.state.error?.message}
          </p>
          <button 
            type="button" 
            className="btn-primary" 
            style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: 'var(--accent-primary_premium)', color: 'white', cursor: 'pointer' }}
            onClick={() => window.location.href = '/'}
          >
            Go to Home Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
