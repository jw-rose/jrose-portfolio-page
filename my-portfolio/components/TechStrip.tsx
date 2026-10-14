const techs = ['JavaScript', 'React', 'Next.js', 'Node.js', 'MongoDB', 'Drizzle', 'Tailwind CSS'];

export default function TechStrip() {
  return (
    <div className="border-t border-b border-hairline">
      <ul className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-wrap justify-center sm:justify-between gap-x-8 gap-y-3 list-none">
        {techs.map((tech) => (
          <li
            key={tech}
            className="font-mono uppercase text-xs sm:text-sm tracking-wider text-muted2"
          >
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );
}
