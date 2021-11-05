import React from 'react';

import './styles.scss'

const FormInput = ({ lable, ...otherProps}) => (
    <div className="form-row">
        {
            lable && (
                <lable>
                    {lable}
                </lable>
            )}
        <input className="form-input" {...otherProps} />
    </div>
);

export default FormInput;