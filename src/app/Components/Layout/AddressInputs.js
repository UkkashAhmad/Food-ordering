function AddressInputs({addressProps, setAddressProps, disabled =false}) {
  const {phone, streetAddress, postalCode, city, country} = addressProps 
    return (
    <>
    <br/>
      <label>Phone number</label>

      <input
      disabled ={disabled}
        type="tel"
        value={phone || ''}
        onChange={(ev) => setAddressProps('phone', ev.target.value)}
        placeholder="Phone number"
      />
      <label>Street address</label>
      <input
      disabled ={disabled}
        type="text"
        value={streetAddress || ''}
        onChange={(ev) => setAddressProps('streetAddress', ev.target.value)}
        placeholder="Street address"
      />
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label>Postal Code</label>
          <input
          disabled ={disabled}
            type="text"
            value={postalCode || ''}
            onChange={(ev) => setAddressProps('postalCode', ev.target.value)}
            placeholder="Postal code"
          />
        </div>
        <div>
          <label>City</label>
          <input
          disabled ={disabled}
            type="text"
            value={city || ''}
            onChange={(ev) => setAddressProps('city', ev.target.value)}
            placeholder="City"
          />
        </div>
      </div>
      <label>Country</label>
      <input
      disabled ={disabled}
        type="text"
        value={country || ''}
        onChange={(ev) => setAddressProps('country', ev.target.value)}
        placeholder="Country"
      />
    </>
  );
}

export default AddressInputs;
