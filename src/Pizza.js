import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render } from 'react-dom'
import styled from 'styled-components'
import * as yup from 'yup'
import axios from 'axios'
import {Switch, Link, Route} from 'react-router-dom'

const Div = styled.div`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
text-align:center;
`

const DivStyled = styled.div`
display:flex;
justify-content:center;
align-items:center;
text-align:center;
flex-direction:column;
border: 3px solid crimson;
border-radius:5px;
padding:10px;
margin:10px;
`

const Order = styled.button`
color:white;
border:none;
background-color: crimson;
padding:10px;
width:10vw;
margin:10px;
border-radius:5px;
`

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
            setOrder(value.data)
            setForm(formValues)
        })
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

  

    return (
        <Div>
          <h2>Order your Pizza</h2>
            <form onSubmit={onSubmit}>
                <DivStyled>
                <label htmlFor="name">Name: 
                    <input 
                    type="text"
                    name="name"
                    onChange={onChange}
                    value={newForm.name}
                    errors={newError}
                    />
                    <p>{newError.name}</p>
                </label>

                <label htmlFor="size">Size: 
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
                </DivStyled>
                <h2>Toppings</h2>
<DivStyled>
 
    <label>Extra Cheese
        <input 
        type="checkbox"
        name="Extra Cheese"
        onChange={checkboxChange}
        value={newForm.toppings.extracheese === true}
        />
    </label>

    <label>Pineapple
        <input 
        type="checkbox"
        name="Pineapple"
        onChange={checkboxChange}
        value={newForm.toppings.pineapple === true}
        />
    </label>

    <label>Jalapenos
        <input 
        type="checkbox"
        name="Jalapenos"
        onChange={checkboxChange}
        value={newForm.toppings.jalapenos === true}
        />
    </label>

    <label>Pepperoni
        <input 
        type="checkbox"
        name="Pepperoni"
        onChange={checkboxChange}
        value={newForm.toppings.pepperoni === true}
        />
    </label>

    <label>Mushrooms
        <input
        type="checkbox"
        name="Mushrooms"
        onChange={checkboxChange}
        value={newForm.toppings.mushrooms === true}
        />
    </label>
    </DivStyled>
    
    <DivStyled>
                <label htmlFor="special">Special Instructions:
                    <input 
                     type="text"
                     name="special"
                     onChange={onChange}
                     value={newForm.special}
                    />
                </label>
                </DivStyled>
             
                <Order disabled={disabled}>Submit</Order>
            </form>

            <div>
                Order Confirmation
                <DivStyled>
<p>
{displayOrder.name}</p>
<p>{displayOrder.size}</p>
<p>{displayOrder.toppings}</p>
<p>{displayOrder.special}
</p>
</DivStyled>
</div>
            </Div>

   
    )
}

export default Pizza;