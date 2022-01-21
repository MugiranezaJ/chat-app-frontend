import '../assets/css/fields.css'
const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
      <div className="control">
        <label className="field">{label}</label><br/>
        <input className="input" {...input} placeholder={label} type={type}/>
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
)

export default renderField