import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReload = () => {
    window.location.href = '/';
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
          <div className="bg-red-900/20 border border-red-500 rounded-2xl p-8 max-w-md text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Algo salió mal</h2>
            <p className="text-gray-300 mb-4">
              Hubo un error al navegar. Por favor, recarga la página.
            </p>
            <pre className="text-xs text-red-300 mb-4 overflow-auto max-h-32">
              {this.state.error?.message || 'Error desconocido'}
            </pre>
            <div className="flex gap-3 justify-center">
              <button
                onClick={this.handleReload}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all"
              >
                Recargar página
              </button>
              <button
                onClick={this.handleGoHome}
                className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all"
              >
                Ir al inicio
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;