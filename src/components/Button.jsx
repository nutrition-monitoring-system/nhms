export default function Button({ children, href, onClick, type }) {
  return (
    <a href={href} type={type}>
      <button
        onClick={onClick}
        type={type}
        className="min-w-fit grid place-items-center rounded-md
            bg-white px-8 py-3 text-sm text-black
            shadow-xl transition-all duration-200 ease-in
            hover:shadow-2xl"
      >
        {children}
      </button>
    </a>
  );
}
