import { useLocation } from "react-router-dom";

export default function Placeholder() {
  const location = useLocation();
  const pageName = location.pathname.slice(1).replace(/^./, (str) => str.toUpperCase()) || "Page";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{pageName}</h1>
        <p className="text-gray-500 text-lg">
          This page is under construction. Please continue prompting to fill in the content.
        </p>
      </div>
    </div>
  );
}
