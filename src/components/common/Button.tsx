interface ButtonProps {
  title: string;
}

const style: React.CSSProperties = {
  padding: "5px 10px",
  color: "#FFF",
  background: "#6C72F6",
  margin: "10px",
  border: "1px solid black",
  borderRadius: "8px",
  cursor: "pointer",
};

const Button = ({ title, ...props }: ButtonProps) => {
  return (
    <button style={style} {...props}>
      {title}
    </button>
  );
};

export default Button;
