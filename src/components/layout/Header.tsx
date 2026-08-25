import { Link } from "react-router";

export default function Header() {
  return (
    <header className="bg-cream-700 border-b">
      <div className="flex justify-center py-4">
        {/* Brand */}
        <Link to="/" className="font-black text-2xl">
          mindfulspace
        </Link>
      </div>
    </header>
  );
}
