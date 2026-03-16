type ToggleAllWeekButtonProps = { allDayInputs: HTMLInputElement[] };

function ToggleAllWeekButton({
  allDayInputs,
}: ToggleAllWeekButtonProps): React.JSX.Element {
  const onAllWeekButtonClick = () => {
    for (const input of allDayInputs) {
      input.checked = !input.checked;
    }
  };

  return (
    <button type="button" onClick={onAllWeekButtonClick}>
      All week
    </button>
  );
}

export default ToggleAllWeekButton;
