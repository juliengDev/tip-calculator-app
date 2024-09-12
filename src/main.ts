import "../css/style.css";

// Types
type InputElement = HTMLInputElement | null;
type ButtonElement = HTMLButtonElement | null;
type OutputElement = HTMLElement | null;

// Selectors
const billInput = document.getElementById("bill") as InputElement;
const peopleInput = document.getElementById("people") as InputElement;
const customTipInput = document.getElementById("custom") as InputElement;
const selectionContainer = document.querySelector(
  ".calculator__input__selection__container"
) as HTMLElement;
const tipPerPersonOutput = document.getElementById(
  "tip-per-person"
) as OutputElement;
const totalPerPersonOutput = document.getElementById(
  "total-per-person"
) as OutputElement;
const resetButton = document.querySelector(
  ".calculator__result__button"
) as ButtonElement;

// Application state
interface CalculatorState {
  billAmount: number;
  tipPercentage: number;
  numberOfPeople: number;
}

const state: CalculatorState = {
  billAmount: 0,
  tipPercentage: 0,
  numberOfPeople: 1,
};

// Utility functions
const parsePositiveFloat = (value: string): number =>
  Math.max(0, parseFloat(value) || 0);
const parsePositiveInt = (value: string): number =>
  Math.max(0, parseInt(value, 10) || 0);

// Calculation function
const calculateTip = (state: CalculatorState) => {
  const tipAmount = state.billAmount * (state.tipPercentage / 100);
  const totalAmount = state.billAmount + tipAmount;
  const tipPerPerson = tipAmount / state.numberOfPeople;
  const totalPerPerson = totalAmount / state.numberOfPeople;

  return {
    tipPerPerson,
    totalPerPerson,
  };
};

// UI update function
const updateUI = (tipPerPerson: number, totalPerPerson: number) => {
  if (tipPerPersonOutput) {
    tipPerPersonOutput.textContent = `$${tipPerPerson.toFixed(2)}`;
  }
  if (totalPerPersonOutput) {
    totalPerPersonOutput.textContent = `$${totalPerPerson.toFixed(2)}`;
  }
  updateResetButtonState();
};

// Main update function
const updateCalculation = (): void => {
  const { tipPerPerson, totalPerPerson } = calculateTip(state);
  updateUI(tipPerPerson, totalPerPerson);

  console.log(`
    Montant de la note: ${state.billAmount.toFixed(2)} $
    Pourcentage de pourboire: ${state.tipPercentage.toFixed(2)}%
    Nombre de personnes: ${state.numberOfPeople}
    Pourboire par personne: ${tipPerPerson.toFixed(2)} $
    Total par personne: ${totalPerPerson.toFixed(2)} $
  `);
};

// Event handler functions
const handleBillInput = (event: Event): void => {
  const input = event.target as InputElement;
  state.billAmount = parsePositiveFloat(input?.value || "0");
  updateCalculation();
};

const handleTipSelection = (event: Event): void => {
  const target = event.target as ButtonElement;
  if (target?.tagName === "BUTTON" && target.textContent?.includes("%")) {
    const buttons = selectionContainer.querySelectorAll("button");
    buttons.forEach((button) => button.classList.remove("selected"));

    target.classList.add("selected");
    state.tipPercentage = parsePositiveFloat(
      target.textContent.replace("%", "")
    );
    if (customTipInput) customTipInput.value = "";
    updateCalculation();
  }
};

const handleCustomTipInput = (event: Event): void => {
  const input = event.target as InputElement;
  const value = parsePositiveFloat(input?.value || "0");
  state.tipPercentage = Math.min(100, value);

  const buttons = selectionContainer.querySelectorAll("button");
  buttons.forEach((button) => button.classList.remove("selected"));

  updateCalculation();
};

const handlePeopleInput = (event: Event): void => {
  const input = event.target as InputElement;
  state.numberOfPeople = Math.max(1, parsePositiveInt(input?.value || "1"));
  updateCalculation();
};

// Reset function
const resetCalculator = (): void => {
  // Reset state
  state.billAmount = 0;
  state.tipPercentage = 0;
  state.numberOfPeople = 1;

  // Reset input fields
  if (billInput) billInput.value = "";
  if (peopleInput) peopleInput.value = "";
  if (customTipInput) customTipInput.value = "";

  // Reset tip selection
  const buttons = selectionContainer.querySelectorAll("button");
  buttons.forEach((button) => button.classList.remove("selected"));

  // Update UI
  updateCalculation();

  console.log("Calculator reset");
};

// Update reset button state
const updateResetButtonState = (): void => {
  if (resetButton) {
    if (
      state.billAmount > 0 ||
      state.tipPercentage > 0 ||
      state.numberOfPeople > 1
    ) {
      resetButton.classList.add("active");
    } else {
      resetButton.classList.remove("active");
    }
  }
};

// Event listeners
billInput?.addEventListener("input", handleBillInput);
selectionContainer?.addEventListener("click", handleTipSelection);
customTipInput?.addEventListener("input", handleCustomTipInput);
peopleInput?.addEventListener("input", handlePeopleInput);
resetButton?.addEventListener("click", resetCalculator);

// Initialization
updateCalculation();
