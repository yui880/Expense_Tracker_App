import {Text} from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

function RecentExpenses(){
    return (
        <ExpensesOutput expensePeriod="Last 7 Days" />
    )
}

export default RecentExpenses;
