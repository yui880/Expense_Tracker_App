import {StyleSheet, Text, View} from 'react-native';
import {RouteProp, StackNavigationState} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useContext, useLayoutEffect} from 'react';
import IconButton from '../components/UI/IconButton';
import {GlobalStyles} from '../constants/styles';
import Button from '../components/UI/Button';
import {ExpensesContext} from '../store/expenses-context';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/redux/store';
import {
  addExpense,
  deleteExpense,
  updateExpense,
} from '../store/redux/expenses';
import {ExpensesObject} from '../components/ExpensesOutput/ExpensesOutput';

type ManageExpenseScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ManageExpense'
>;

type ManageExpenseScreenRouteProp = RouteProp<
  RootStackParamList,
  'ManageExpense'
>;

type ManageExpenseScreenProps = {
  navigation: ManageExpenseScreenNavigationProp;
  route: ManageExpenseScreenRouteProp;
};

function ManageExpense({route, navigation}: ManageExpenseScreenProps) {
  // const expensesCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const expenses = useSelector((state: RootState) => state.expenses);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = () => {
    // expensesCtx.deleteExpense(editedExpenseId);
    dispatch(deleteExpense(editedExpenseId));
    navigation.goBack();
  };
  const cancelHandler = () => {
    navigation.goBack();
  };
  const confirmHandler = () => {
    if (isEditing) {
      // expensesCtx.updateExpense(editedExpenseId, {
      //   description: 'Test!!!',
      //   amount: 20.99,
      //   date: new Date('2024-05-12'),
      // });
      dispatch(
        updateExpense({
          id: editedExpenseId,
          data: {
            description: 'Test!!!',
            amount: 20.99,
            date: new Date('2024-05-12'),
          },
        }),
      );
    } else {
      // expensesCtx.addExpense({
      //   description: 'Test',
      //   amount: 19.99,
      //   date: new Date('2024-05-11'),
      // });
      dispatch(
        addExpense({
          description: 'Test',
          amount: 19.99,
          date: new Date('2024-05-11'),
        }),
      );
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.button} onPress={cancelHandler} mode="flat">
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
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
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});

export default ManageExpense;
