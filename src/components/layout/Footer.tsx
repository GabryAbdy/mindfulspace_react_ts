import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-cream-700 border-t">
      <div className="mx-auto max-w-md flex flex-row items-center justify-around">
        <div className="text-sm font-light">© 2026 Gabriele Abd Alla Awad</div>
        <ul className="flex flex-row gap-2 items-center">
          <li>
            <a
              href="https://github.com/GabryAbdy"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Github profile"
              className="inline-flex text-xl h-10 w-10 items-center justify-center rounded-full"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/gabriele-abd-alla-awad-76397a196/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Linkedin profile"
              className="inline-flex text-xl h-10 w-10 items-center justify-center rounded-full"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
