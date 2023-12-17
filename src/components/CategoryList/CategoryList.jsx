import React, {useState, useEffect} from "react";
import "./CategoryList.css";
import CategoryItem from "../CategoryItem/CategoryItem.jsx";
import IconList from "../iconList/iconList.jsx";
import Modal from "../modal/modal.jsx";
import axios from "axios";
import { addCategory } from "../../API/category.service.js";
import { getAllIcons } from "../../services/icon.service.js";
import { CURRENT_URL } from "../../services/config.js";

export default function CategoryList(props) {
    const [modalActive, setModalActive] = useState(false)
    const [iconList, setIconList] = useState([])
    
    async function loadIcons () {
        if (iconList.length == 0) {
            const iconListTemp = await getAllIcons()
            setIconList(iconListTemp)
            // axios.get(url_icons).then((gettingIcons) => setIconList(gettingIcons))
        }
    }
    
    async function createCategory () {        
        const categoryNameInput = document.querySelector('.category-name-inp.' + props.group)
        const categoryIcon = document.querySelector('.cat-icon.active')
        
        const name = categoryNameInput.value
        const group = props.group
        const filename = categoryIcon.src.split('/').at(-1)
        const position = props.categoryList.length + 1

        await addCategory(name, filename, group, position)

        // debugger
        props.categoryList.push({name: categoryNameInput.value, amount: 0, icon: categoryIcon.src.split('/').at(-1)})
        props.setCategoryList(props.categoryList)
    
        categoryNameInput.value = ""
        categoryIcon.className = 'cat-icon'
        setModalActive(false);
    }

    // function changeCategorySum (name, amount) {
    //     categoryList[name] = categoryList.sum - amount
    //     setCategoryList(categoryList)
    //     props.callback(to, amount)
    // }

    return (
        <div className={"categories " + props.group}>
            {props.categoryList.map(category => 
                <CategoryItem 
                    name={category.name} 
                    sum={category.amount}
                    catFrom={props.categoryFrom} 
                    setCatFrom={props.setCategoryFrom} 
                    setCatTo={props.setCategoryTo}
                    icon_url={CURRENT_URL + "icons/" + category.icon}
                    
                    clbAddOperation={props.clbAddOperation}
                    callback={props.callback}
                />
            )}        
            <button onClick={() => {loadIcons(); setModalActive(true)}}>add</button>
            
            <Modal active={modalActive} setActive={setModalActive}>
                <div>Название категории {props.group}</div>
                <input className={"category-name-inp " + props.group}/>
                <div>Выберите иконку:</div>
                <IconList iconList={iconList}/>
                <button onClick={createCategory}>create</button>
            </Modal>
        </div>
    )
};
