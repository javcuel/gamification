import '../../styles/Button.css';

type ButtonProps = {
  text: String;
};

/* interface ButtonProps {
  text: String;
} */

const Button = ({ text }: ButtonProps) => {
  return <button className="button">{text}</button>;
};

export default Button;
