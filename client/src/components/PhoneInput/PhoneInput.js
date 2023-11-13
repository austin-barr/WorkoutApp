import { useState } from 'react'
import PhoneInput2 from 'react-phone-input-2'

const PhoneInput = (props) => {
    const [phoneNumber, setPhoneNumber] = useState('')

    return (
        <PhoneInput2
            specialLabel=''
            prefix=''
            inputClass={props.inputClass}
            containerClass={props.containerClass}
            placeholder='(131) 973-1145'
            disableDropdown={true}
            disableCountryCode={true}
            defaultMask='(...) ...-....'
            alwaysDefaultMask={true}
            country={'us'}
            value={phoneNumber}
            onChange={(value) => {
                setPhoneNumber(value);
                props.onChange(value);
            }}
        />
    )
}

export default PhoneInput