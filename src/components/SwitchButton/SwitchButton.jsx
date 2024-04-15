import "./SwitchButton.css"; // Предполагается, что стили сохранены в этом файле

const ToggleSwitch = ({ label, isChecked, onChange }) => {
  //   const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    onChange(!isChecked);
  };

  return (
    <div className="toggle-switch">
      <label className="toggle-switch__control">
        <input
          type="checkbox"
          className="toggle-switch__checkbox"
          checked={isChecked}
          onChange={handleChange}
        />
        <span className="toggle-switch__slider"></span>
      </label>
      {label && <span className="toggle-switch__label">{label}</span>}
    </div>
  );
};

export default ToggleSwitch;
