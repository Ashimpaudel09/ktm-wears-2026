import { isRouteErrorResponse, useNavigate } from "react-router";
import { AlertTriangle, ArrowLeft } from "lucide-react";

export default function ErrorBoundary({ error }: { error: unknown }) {
  const navigate = useNavigate();

  let title = "Something went wrong";
  let description =
    "We ran into an unexpected issue. Please return to the home page.";
  let statusCode: number | null = null;
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    statusCode = error.status;

    if (error.status === 404) {
      title = "Page not found";
      description =
        "The page you're trying to access doesn't exist or has been moved.";
    } else {
      title = "Unexpected error";
      description = error.statusText || description;
    }
  }

  if (import.meta.env.DEV && error instanceof Error) {
    description = error.message;
    stack = error.stack;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full text-center border border-gray-100 rounded-2xl p-8 shadow-sm">
        {/* Status Code */}
        {statusCode && (
          <p className="mb-2 text-xs font-mono tracking-widest text-gray-400">
            {statusCode}
          </p>
        )}

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-50 p-3 rounded-full">
            <AlertTriangle className="text-red-500" size={28} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>

        {/* Description */}
        <p className="text-sm text-gray-500 mb-6">{description}</p>

        {/* Primary Action */}
        <div className="mt-6">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-6 py-2 bg-[#0f00ff] text-white rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition"
          >
            <ArrowLeft size={16} />
            Go to Home
          </button>
        </div>

        {/* Dev-only stack trace */}
        {stack && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-xs text-gray-400">
              Debug details
            </summary>
            <pre className="mt-2 max-h-64 overflow-auto rounded-md bg-gray-50 p-4 text-xs">
              <code>{stack}</code>
            </pre>
          </details>
        )}
      </div>
    </main>
  );
}
