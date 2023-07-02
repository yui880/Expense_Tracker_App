import {Alert, StyleSheet, Text, View} from 'react-native';
import Input from './Input';
import {useState} from 'react';
import Button from '../UI/Button';
import {ExpensesObject} from '../ExpensesOutput/ExpensesOutput';
import {getFormattedDate} from '../../util/date';
import {GlobalStyles} from '../../constants/styles';

export type ExpenseObjectWithoutId = {
  description: string;
  amount: number;
  date: Date;
};
function ExpenseForm({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}: {
  onCancel: () => void;
  onSubmit: (expenseData: ExpenseObjectWithoutId) => void;
  submitButtonLabel: string;
  defaultValues?: ExpensesObject;
}) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true, // 처음에 입력값이 있던 없던 경고문이 보이면 안됨
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description.toString() : '',
      isValid: true,
    },
  });
  function inputChangedHandler(inputIdentifier: string, enteredValue: string) {
    setInputs(curInputs => {
      return {
        ...curInputs,
        [inputIdentifier]: {value: enteredValue, isValid: true},
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert('Invalid input, Please Check your input values');
      setInputs(curInputs => {
        return {
          amount: {value: curInputs.amount.value, isValid: amountIsValid},
          date: {value: curInputs.date.value, isValid: dateIsValid},
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }
    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          style={styles.rowInput}
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            // onChangeText: inputChangedHandler.bind(this, 'amount'),
            onChangeText: val => inputChangedHandler('amount', val),
            value: inputs.amount.value,
          }}
        />
        <Input
          label="Date"
          style={styles.rowInput}
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: val => inputChangedHandler('date', val),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          autoCorrect: false, // default is true
          onChangeText: val => inputChangedHandler('description', val),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input, Please Check your input values
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} onPress={onCancel} mode="flat">
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});

export default ExpenseForm;
