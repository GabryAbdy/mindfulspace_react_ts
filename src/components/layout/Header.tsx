import { Link } from "react-router";

export default function Header() {
  return (
    <header className="bg-grass-300">
      <div className="flex justify-center py-4">
        {/* Brand */}
        <Link to="/" className="font-bold px-4">
          mindfulspace
        </Link>
      </div>
    </header>
  );
}
