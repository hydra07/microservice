const ErrorFallback: React.FC<{ error: Error }> = ({ error }) => (
    <div
      role="alert"
      className="p-4 bg-red-100 dark:bg-slate-700 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-100 rounded"
    >
      <h2 className="text-lg font-semibold mb-2">Oops! Something went wrong</h2>
      <p className="mb-2">Error message: {error.message}</p>
      <button
        onClick={() => window.location.reload()}
        className="bg-red-500 dark:bg-red-700 hover:bg-red-600 dark:hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Refresh Page
      </button>
    </div>
  );
  
  export default ErrorFallback;
  