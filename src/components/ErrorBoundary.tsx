import React from 'react';

const serializeError = (error: any) => {
  if (error instanceof Error) {
    return error.message + '\n' + error.stack;
  }
  return JSON.stringify(error, null, 2);
};

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: any }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 m-4 border border-[#FF4757] bg-[#0A0E11] rounded font-mono">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-[#FF4757] font-bold">[SYSTEM FAILURE]</span>
            <span className="text-neutral-400">Process terminated unexpectedly.</span>
          </div>
          <pre className="mt-2 text-xs text-[#FF4757] overflow-x-auto p-4 bg-black rounded">
            {serializeError(this.state.error)}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}