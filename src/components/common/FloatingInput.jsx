import "./FloatingInput.css"

export const FloatingInput = ({id, label, placeholder, type = 'text', ...props}) => {

  return (
    <div className="form-floating mb-3">
      <input type={type} className="form-control input-text-custom" id={id} placeholder={placeholder} {...props} />
      <label className="text-dark" htmlFor={id}>{label}</label>
    </div>
  )
}