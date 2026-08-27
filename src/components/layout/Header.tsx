import { Link } from "react-router";

export default function Header() {
  return (
    <header className="bg-cream-700 border-b">
      <div className="flex justify-center py-3">
        {/* Brand */}
        <Link to="/" className="font-light text-3xl">
          mindful*space
        </Link>
      </div>
    </header>
  );
}
