import './Input.css';

export function Inputs(props) {

    return (
        <div className="user-box">
            <input
                defaultValue={props.defaultValue}
                className={props.className}
                type={props.type}
                required={props.required}
                value={props.value}
                onChange={props.onChange}
            />
            <label htmlFor={props.name}> {props.textoLabel} </label>
        </div>
    )
}
