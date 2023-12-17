import React, { useState, useEffect } from "react";
import '../styles/App.css'
import SummaryBlock from "../components/SummaryBlock/SummaryBlock.jsx";
import CategoryList from "../components/CategoryList/CategoryList.jsx";
import Modal from "../components/modal/modal.jsx";
import { getCategoryData } from "../API/category.service.js";
import { getGeneralData, sendTransaction } from "../services/transaction.service.js";

export default function Index() {
  const [categoryFrom, setCategoryFrom] = useState(null)
  const [categoryTo, setCategoryTo] = useState(null)
  const [modalActive, setModalActive] = useState(false)
  const [sumData, setSumData] = useState({})
  
  const [categoryListExpense, setCategoryListExpense] = useState([])
  const [categoryListBank, setCategoryListBank] = useState([])

  async function fetchStartData () {
    const generalData = await getGeneralData()
    setSumData(generalData)

    const catExp = await getCategoryData('expense')
    setCategoryListExpense(catExp)

    const catInc = await getCategoryData('bank')
    setCategoryListBank(catInc)
  }

  

  useEffect(() => {      
      fetchStartData()
    }, [])


  async function createTransaction (e) {
          
      setModalActive(false)
      const amountInput = document.querySelector('.amount')
      const amount = Number(amountInput.value)

      let today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      const yyyy = today.getFullYear();

      today = yyyy + '-' + mm + '-' + dd;

      await sendTransaction('expense', categoryFrom, categoryTo, amount, today)

      console.log('from ' + categoryFrom + ' to ' + categoryTo + '. Amount: ' + amount)
      amountInput.value = "" 
      setSumData({
          balance: sumData.balance - amount,
          expenses: sumData.expenses + amount,
          incomes: sumData.incomes
      })

      for (let i = 0; i < categoryListExpense.length; i++) {
          if (categoryListExpense[i].name === categoryTo) {
            categoryListExpense[i].amount = categoryListExpense[i].amount + amount
            break
          }
      }
      setCategoryListExpense(categoryListExpense)

      for (let i = 0; i < categoryListBank.length; i++) {
        if (categoryListBank[i].name === categoryFrom) {
          categoryListBank[i].amount = categoryListBank[i].amount - amount
          break
        }
    }
    setCategoryListBank(categoryListBank)
  }

  function callback (to, amount) {
    setModalActive(true)

    // console.log(to, amount)
  }

  return (    
    <div className="app">
      <SummaryBlock sumData={sumData} setSumData={setSumData}/>
      <CategoryList 
        group="bank" 
        categoryFrom={categoryFrom}
        setCategoryFrom={setCategoryFrom}
        setCategoryTo={setCategoryTo}
        
        clbAddOperation={createTransaction}
        callback={callback}
        categoryList={categoryListBank}
        setCategoryList={setCategoryListBank}
      />
      <hr style={{margin: '15px 0 15px 0'}}/>
      <CategoryList 
        group="expense" 
        categoryFrom={categoryFrom}
        setCategoryFrom={setCategoryFrom}   
        setCategoryTo={setCategoryTo}
        
        clbAddOperation={createTransaction}
        callback={callback}
        categoryList={categoryListExpense}
        setCategoryList={setCategoryListExpense}
      />
      <Modal active={modalActive} setActive={setModalActive}>
          <div>Введите сумму:</div>
          <input className="amount"/>
          <button onClick={createTransaction}>Добавить</button>
      </Modal>

    </div>
    // <div>Protected Page</div>
  );
}


