import React from 'react';
import Input from '@/components/atoms/Input';
import TextArea from '@/components/atoms/TextArea';
import Select from '@/components/atoms/Select';

const FormField = ({ type = 'text', label, id, value, onChange, error, options, ...props }) => {
    const commonProps = {
        id,
        label,
        value,
        onChange: (e) => onChange(id, e.target.value),
        error,
        ...props
    };

    switch (type) {
        case 'textarea':
            return <TextArea {...commonProps} />;
        case 'select':
            return <Select {...commonProps} options={options} />;
        case 'text':
        case 'date':
        case 'email':
        case 'password':
        default:
            return <Input type={type} {...commonProps} />;
    }
};

export default FormField;