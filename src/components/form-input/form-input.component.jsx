import React from 'react';
 import './form-input.styles.scss';


const FormInput = ( { handleChange, label, value, ...props} ) => (
    <div className='group'>
        <input className='form-input' onChange={handleChange} value={value} {...props} />
        {
            label? (<label className={`${value  ? 'shrink' : ''} form-input-label`}>{ label }</label>) : null
        }
    </div>
)

export default FormInput;