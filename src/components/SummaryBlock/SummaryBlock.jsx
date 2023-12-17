import React from "react";
import './SummaryBlock.css';

const SummaryBlock = ({sumData}) => {
    
    
    return (
        <div className="sum-block">
            <span>Баланс: {sumData.balance} рублей</span>
            <span>Доходы: {sumData.incomes} рублей</span>
            <span>Расходы: {sumData.expenses} рублей</span>
        </div>
    )
};

export default SummaryBlock;