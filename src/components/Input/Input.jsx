import style from "./Input.module.scss";

export function Input({ ...props }) {
  return <input {...props} className={style.input} />;
}
