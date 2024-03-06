# emc-new-arch

## TO DOs

- [x] Implement API Service
- [x] Setup silent loaders
- [ ] Setup overflow loaders
- [ ] Add store
- [x] Implement API Error handlers
- [x] Login
- [ ] Dashboard
- [ ] Search Client
- [ ] Register client
- [ ] Patient Dashboard
- [ ] Update Client
- [ ] Add Reports
- [ ] Add Data management tools
- [ ] Add User management tools
- [ ] Implement build tools
- [ ] Implement Desktop form builder
- [ ] DDE Integration

## FormBuilder Requirements

1. The input fields should accept validation rules passed as piped strings or an array of strings. for example
`<text-input name="password" rules="required|min:8" />` or `<text-input name="password" rules="['required', 'min:8']" />`

2. The input fields should validate the input value based on the rules on value change

3. Input fields should show errors below them for invalid input values

4. The input fields should have an optional alternative value prop which is a function that takes the input value and returns a computed value

5. The input fields should compute the alternative value on value change

6. The form should emit form data and computed/alternative data objects on submission. Field names should be used as object keys

7. Form submission should only be possible when the form has no errors