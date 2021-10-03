import React from 'react'


function Cars () {
	let carBrands = [
	 	'Maruti Suzuki','Hyundai','Tata','Mahindra','Toyota','Honda',
	 	'Ambassador','Ashok Leyland','Aston Martin','Audi','Bajaj','Bentley',
	 	'BMW','Bugatti','Cadillac','Chevrolet','Citroen','Chrysler',
	 	'Datsun','Dc','Dodge','Eicher','Ferrari','Fiat','Force','Ford',
	 	'Hummer','Isuzu','Jaguar','Jeep','Kia','Lamborghini','Land Rove',
	 	'Lexus','Renault','Maserati','Mazda','Mercedes-Benz','MG',
	 	'Mini','Mitsubishi','Nissan','Opel','Peugeot','Premier','Rolls-Royce',
	 	'Skoda','Subaru','Tesla','Volkswagen','Volvo','Other Brands'
	]
 	return (	
		<div className="create-ad-cars-container">
			<div className='create-ad-car-brand'>
					<label >Brand *</label>
					<span  className='down-icon-select-car'>
						<svg
			                width="24px"
			                height="24px"
			                viewBox="0 0 1024 1024"
			                data-aut-id="icon"				               
			              >
			                <path d="M85.392 277.333h60.331l366.336 366.336 366.336-366.336h60.331v60.331l-408.981 409.003h-35.307l-409.045-409.003z"></path>
					    </svg>
					</span>
					<select id='create-ad-car-select'required>
							<option disabled selected></option>
							{ 
								carBrands.map(option => {
									return <option key={option} value={option}>{option}</option>
								})
							}
					</select>
				</div>
			<label htmlFor='create-ad-set-year' >Year *</label>
			<div className="create-ad-cars-year">
				<input type='text' className='create-ad-set-year' data-caryear id='create-ad-set-year' required/>
			</div>
			<label htmlFor='create-ad-set-driven' >KM driven *</label>
			<div className="create-ad-cars-driven">
				<input type='text' className='create-ad-set-driven' data-cardriven id='create-ad-set-driven'/>
			</div>
			<label htmlFor='create-ad-set-fuel' >Fuel *</label>
			<div className="create-ad-cars-fuel">
				<div className='create-ad-cars-fuel-choice'>
					<label className='create-ad-cars-fuel-btn'>
						<input className='radioBtn' type='radio' value='CNG & Hybrids' name='carFuel'/>
						<span className='Choice-slider'>CNG & Hybrids</span>
					</label>
					<label className='create-ad-cars-fuel-btn'>
						<input className='radioBtn' type='radio' value='Diesel' name='carFuel'/>
						<span className='Choice-slider'>Diesel</span>
					</label>
						<label className='create-ad-cars-fuel-btn'>
						<input className='radioBtn' type='radio' value='Electric' name='carFuel'/>
						<span className='Choice-slider'>Electric</span>
					</label>
						<label className='create-ad-cars-fuel-btn'>
						<input className='radioBtn' type='radio' value='LPG' name='carFuel'/>
						<span className='Choice-slider'>LPG</span>
					</label>
						<label className='create-ad-cars-fuel-btn'>
						<input className='radioBtn' type='radio' value='Petrol' name='carFuel'/>
						<span className='Choice-slider'>Petrol</span>
					</label>
				</div>
			</div>
			<label >Transmission *</label>
			<div className="create-ad-cars-transmission">
				<div className='create-ad-cars-transmission-choice'>
					<label className='create-ad-cars-transmission-btn'>
						<input className='radioBtn' type='radio' value='Automatic' name='carGear'/>
						<span className='Choice-slider'>Automatic</span>
					</label>
					<label className='create-ad-cars-transmission-btn'>
						<input className='radioBtn' type='radio' value='Manual' name='carGear'/>
						<span className='Choice-slider'>Manual</span>
					</label>

				</div>
			</div>
		</div>
 	)
}
export default Cars;
