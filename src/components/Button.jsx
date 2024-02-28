export default function Button({ children, href, onClick, type, className }) {
  // This function returns a button wrapped with a div that gives the functionality of both elements
  // Params:
  // - children (string): The text to be displayed on the button.
  // - href (string): If it is not null or undefined, then this will make the button act as an anchor tag and navigate to the
  // - onClick: the function called when the button is clicked
  // - type: A type of button. So it can be accessed in testing. Like a variable name
  // - className: CSS class names for styling
  return (
    <a href={href} type={type}>
      <button onClick={onClick} type={type} className="tile">
        {children}
      </button>
    </a>
  );
}
