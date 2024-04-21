import "./SwitchButton.css";

const ToggleSwitch = ({ label, isCheck, onChange, isDisableCheckBox }) => {
  const handleChange = () => {
    onChange(!isCheck);
  };

  return (
    <div className="toggle-switch">
      <label className="toggle-switch__control">
        <input
          type="checkbox"
          className="toggle-switch__checkbox"
          checked={isCheck}
          onChange={handleChange}
          disabled={isDisableCheckBox}
        />
        <span className="toggle-switch__slider"></span>
      </label>
      {label && <span className="toggle-switch__label">{label}</span>}
    </div>
  );
};

export default ToggleSwitch;
