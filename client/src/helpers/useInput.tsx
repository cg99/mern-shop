import React, { useState } from 'react';

function useInput(initialValue: any) {
    const [value, setValue] = useState(initialValue);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
    }

    return [value, handleChange];
}

export default useInput;