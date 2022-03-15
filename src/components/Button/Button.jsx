import style from "./Button.module.scss";

export function Button({
  children,
  bgColor = "default",
  align = "End",
  ...props
}) {
  return (
    <button
      {...props}
      className={`${style.btn} ${style[bgColor]} alignSelf${align}`}
    >
      {children}
    </button>
  );
}
