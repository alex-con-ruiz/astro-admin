
# Component Textfield 
 ### React component for text input handlers:
 
## Example

#### Basic Usage 
```js
import TextField from  '@components/react/TextField';

<TextField
        type='text'
        name='username'
        placeholder='Usuario'
        eventDispatch={inputHandler}
        validationMethod={ValidationMethodObj}
        disabled={false}
        behavior='onBlur'
/>
```
##
### Props
|prop                  | type       | description                     |
|----------------------|------------|---------------------------------|
| **type**             | `string`   | Input HTML type	              |
| **name**             | `string`   | Custom text type                |
| **placeholder**      | `string`   | Text for placeholder and label  |
| **eventDispatch**    | `function` | Callback to dispatch event value|
| **validationMethod** | `object`   | Object to handle validations    |
| **disabled**         | `boolean`  | Disabled input status           |
| **behavior**         | `string`   | HTML Event to use on component  |
##

### type
Suppport `text` `password` `number` `email` types from HTML5 for more info check: [w3schools](https://www.w3schools.com/html/html_form_input_types.asp) for more details.

> **Dev Note:** support for more types are in WIP.

### name
This props recieves a name to add custom text and validate with diferent conditions.

> **Dev Note:** Later will be added a list of custom types names for now just `name=username` is supported.

### eventDispatch
In order tu support any dispatch method the eventDispatch expect a callback that recieves two arguments `value: string;` and `name: string;` for handling the event.

```js
const  inputHandler  = (value:  string, name:  string):  void  => {
	dispatch('INPUT_EVENT', { payload: {[name]: value}});
}

<TextField
    // other props ...
    eventDispatch={inputHandler}
    // other props...
/>
```
### validationMethod
This pros recieves an object to handle validation.

> **Dev Note:** there are just one method for now `onFetchValidation`.

- `onFetchValidation` : this checks wheter a fetch status its ok or error.
```js
// ValidationMethod Type exposed from compentet
import  type { ValidationMethod } from  '@components/react/TextField/types';

const [userFetchStatus, setUserFetchStatus] =  useState<ValidationMethod>({
	method: 'onFetchValidation',
	status: undefined
});

// effects
useEffect(() => {
	const response = await resolveInputService();
	setUserFetchStatus({ ...userFetchStatus, status: response.status});
}, [inputValueFromStore]);

<TextField
    // other props ...
    validationMethod={ValidationMethodObj}
    // other props...
/>
```
### behavior
This props recieves an input  an [HTML EVENT](https://www.w3schools.com/jsref/dom_obj_event.asp) and uses that behavior for funcionality treatment. 