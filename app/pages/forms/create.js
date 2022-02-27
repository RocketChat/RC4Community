import React, { useState } from "react";
import { Button, Dropdown, DropdownButton, Form, FormControl } from "react-bootstrap"
import styles from "../../styles/form.module.css"
import InputGroup from "react-bootstrap/InputGroup"
import { MdDeleteOutline } from 'react-icons/md';


const CreateForm = () => {
    const [formValues, setFormValues] = useState([{ label: "", value: "", type: "text", min:"", max: "", required: false }])
    const [isSwitchOn, setIsSwitchOn] = useState(false)

    let handleChange = (e, i) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        console.log("handleChanf", e.target, i)
        setFormValues(newFormValues);
      }
    
    let addFormFields = () => {
        setFormValues([...formValues, { label: "", value: "", type: "text", min:"", max: "", required: false }])
      }
    
    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }
    
    let handleSubmit = (event) => {
        event.preventDefault();
        alert(JSON.stringify(formValues));
    }

    const handleSelect = (e, i) => {
        console.log("changing", e.target, i)
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }

    const handleSwitch = (e, i) => {
        console.log("changing", e.target, i)
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = !isSwitchOn;
        setFormValues(newFormValues);
        setIsSwitchOn(!isSwitchOn);
    }

    return (
        <form  onSubmit={handleSubmit}>
          {formValues.map((element, index) => (
            <div className="formRow" key={index}>
                <InputGroup>
                    <Form.Check 
                        type="switch"
                        name="required"
                        id="custom-switch"
                        label="Required"
                        inline={true}
                        className={styles.radio}
                        onChange={e => handleSwitch(e, index)}
                    />
                    
                    
                    <Form.Select className={styles.select} name="type" onChange={e => handleSelect(e, index)} value={element.type} aria-label="Default select example">
                        <option value="text">Text</option>
                        <option value="number">Number</option>
                        <option value="email">E-mail</option>
                    </Form.Select>
                    <FormControl aria-label="Text input with dropdown button" name="value" type="text" placeholder="Enter the question" onChange={e => handleChange(e, index)} />
                    {element.type == "number" && <FormControl aria-label="Min. Value" name="min" type="number" placeholder="Min. Value" onChange={e => handleChange(e, index)} />}
                    {element.type == "number" && <FormControl aria-label="Max. Value" name="max" type="number" placeholder="Max. Value" onChange={e => handleChange(e, index)} />}
                    
                    {index ? <Button onClick={() => removeFormFields(index)} variant="danger" id="button-addon1">
                        <MdDeleteOutline />
                    </Button>: null}
                </InputGroup>
              {/* {
                index ? 
                  <Button type="button"  className="button remove" onClick={() => removeFormFields(index)}>Remove</Button> 
                : null
              } */}
            </div>
          ))}
          <div className="button-section">
              <button className="button add" type="button" onClick={() => addFormFields()}>Add</button>
              <button className="button submit" type="submit">Submit</button>
          </div>
      </form>
    )

    // return (
    //     <div className={styles.create}>
    //         <Button variant="primary">Primary</Button>
    //     </div>
    // )
}

export default CreateForm;