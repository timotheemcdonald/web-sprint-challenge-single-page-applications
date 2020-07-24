import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render } from 'react-dom'
import styled from 'styled-components'
import * as yup from 'yup'
import axios from 'axios'
import {Switch, Link, Route} from 'react-router-dom'

const formValues = {
    name:'',
    size:'',
    toppings: {
        extracheese: false,
        pineapple: false,
        jalapenos: false,
        pepperoni: false,
        mushrooms: false
    },
    special:''
}

const formErrors = {
    name:'',
    size:'',
}

const startDisabled = true

function Pizza() {

    const [newForm, setForm] = useState(formValues)
    const [newError, setErrors] = useState(formErrors)
    const [disabled, setDisabled] = useState(startDisabled)
    const [displayOrder, setOrder] = useState([])

    let defaultSchema = yup.object().shape({
        name: yup.string().min(2,'Name too short.').required('That is not a real name. Please try again.'),
        size: yup.string().required('You must select a size.'),
        special: yup.string()
    })

    useEffect( () => {
        defaultSchema.validate(newForm)
        .then(valid => setDisabled(!valid))
    }, [newForm, defaultSchema])

    const validationCheck = (event) => {
        event.persist()
        yup.reach(defaultSchema, event.target.name)
        .validate(event.target.name)
        .then(valid => setErrors(
            {...newError, [event.target.name]:''}
        ))
        .catch(error => setErrors(
        {...newError, [event.target.name]: error.newError[0]}
        ))
    }

    // const getOrder = () => {
    //     axios.get('https://reqres.in/api/users')
    //     .then(value => {
    //         setOrder(value.data)
    //     })
    //     .catch(error => {
    //         console.log('get error')
    //     })
    // }

    // const postOrder = (newDisplayOrder) => {
    //     axios.post('https://reqres.in/api/users', newDisplayOrder)
    //     .then(value => {
       
    //         const newPizzaOrder = value.data
    //         console.log(newDisplayOrder)
    //         console.log(value.data)
    //         setOrder([newPizzaOrder, ...displayOrder])
    //         setOrder(value.data)
    //         setForm(formValues)
    //     })
    //     .catch(error => {
    //         console.log('submit form error')
    //     })
    // }

    // const onSubmit = (event) => {
    //     event.preventDefault()
    //     const newDisplayOrder = {
    //         name:newForm.name,
    //         size:newForm.size,
    //         toppings: Object.keys(newForm.toppings).filter(choice => newForm.toppings[choice]),
    //         special:newForm.special
    //     }
     
    //     postOrder(newDisplayOrder)
    // }

    const onSubmit = (event) => {
        event.preventDefault()
        console.log('submit start')

        const testPizza = {
            name: newForm.name,
            size: newForm.size,
            toppings: Object.keys(newForm.toppings).filter(hb => newForm.toppings[hb]),
            special: newForm.special
        }

        axios.post('https://reqres.in/api/users', testPizza)
        .then(value => {
            /*test*/
            const newTeamMember = value.data
            setOrder([newTeamMember],...displayOrder)
            setOrder(value.data)})
        .catch(error => console.log('error', error))
    }

    const onChange = (event) => {
        const value = event.target.value;
        setForm({...newForm, [event.target.name]: value})
        validationCheck(event)
    }

    const checkboxChange = (event) => {
        const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        setForm({...newForm,
        toppings:{
            ...newForm.toppings,
            [event.target.name]:value,
            }
         })
    }

    // useEffect(() => {
    //     getOrder()
    //   }, [])
  

    return (
        <div>
            This is the Form
            <form onSubmit={onSubmit}>
                <label htmlFor="name">Name
                    <input 
                    type="text"
                    name="name"
                    onChange={onChange}
                    value={newForm.name}
                    errors={newError}
                    />
                    <p>{newError.name}</p>
                </label>

                <label htmlFor="size">Size
                    <select 
                    onChange={onChange}
                    value={newForm.size}
                    name="size"
                    errors={newError}
                    >

                    <option value=''>Select a Size</option>
                    <option value='small'>Small</option>
                    <option value='medium'>Medium</option>
                    <option value='large'>Large</option>
                    <option value='xlarge'>Extra Large</option>
           
                    <p>{newError.size}</p>
                    </select>
                </label>

{/* <div className="toppings">
    <p>Toppings</p> */}

    <p>Toppings</p>
    <label>Extra Cheese
        <input 
        type="checkbox"
        name="extracheese"
        onChange={checkboxChange}
        value={newForm.toppings.extracheese === true}
        />
    </label>

    <label>Pineapple
        <input 
        type="checkbox"
        name="pineapple"
        onChange={checkboxChange}
        value={newForm.toppings.pineapple === true}
        />
    </label>

    <label>Jalapenos
        <input 
        type="checkbox"
        name="jalapenos"
        onChange={checkboxChange}
        value={newForm.toppings.jalapenos === true}
        />
    </label>

    <label>Pepperoni
        <input 
        type="checkbox"
        name="pepperoni"
        onChange={checkboxChange}
        value={newForm.toppings.pepperoni === true}
        />
    </label>

    <label>Mushrooms
        <input
        type="checkbox"
        name="mushrooms"
        onChange={checkboxChange}
        value={newForm.toppings.mushrooms === true}
        />
    </label>
    
                <label htmlFor="special">Special
                    <input 
                     type="text"
                     name="special"
                     onChange={onChange}
                     value={newForm.special}
                    />
                </label>

                <button disabled={disabled}>Submit</button>
            </form>

            <div>
                Order Confirmation
                <div>
<p>
{displayOrder.name}</p>
<p>{displayOrder.size}</p>
<p>{displayOrder.toppings}</p>
<p>{displayOrder.special}
</p>
</div>
</div>
            </div>

   
    )
}

export default Pizza;