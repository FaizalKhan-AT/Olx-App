import React from 'react';

function Bikes () {
	let bikes = [
		'Motorcycles', 'Scooters', 'Spare Parts','Bicycles'
	];
	let bikeBrand = [
		'Bajaj','Hero','Honda','KTM','Royal Enfield','Suzuki',
		'TVS','Yamaha','Other Brands'
	]
	return (
		<div className='create-ad-bike-container'>
			<div className='create-ad-bike-type'>
				<label >Bike Type *</label>
				<span  className='down-icon-select-bike'>
					<svg
		                width="24px"
		                height="24px"
		                viewBox="0 0 1024 1024"
		                data-aut-id="icon"				               
		              >
		                <path d="M85.392 277.333h60.331l366.336 366.336 366.336-366.336h60.331v60.331l-408.981 409.003h-35.307l-409.045-409.003z"></path>
		            </svg>
				</span>
				<select id='create-ad-bike-select' data-biketype required >
						<option disabled selected></option>
						{ 
							bikes.map(option => {
								return <option key={option} value={option}>{option}</option>
							})
						}
				</select>
			</div>
			<div className='create-ad-bike-type'>
				<label >Brand *</label>
				<span  className='down-icon-select-bike'>
					<svg
		                width="24px"
		                height="24px"
		                viewBox="0 0 1024 1024"
		                data-aut-id="icon"				               
		              >
		                <path d="M85.392 277.333h60.331l366.336 366.336 366.336-366.336h60.331v60.331l-408.981 409.003h-35.307l-409.045-409.003z"></path>
		            </svg>
				</span>
				<select id='create-ad-bike-select' data-bikebrand required>
						<option disabled selected></option>
						{ 
							bikeBrand.map(option => {
								return <option key={option} value={option}>{option}</option>
							})
						}
				</select>
			</div>
			<label>Year *</label>
			<div className="create-ad-bike-year">
				<input type='text' className='create-ad-set-year' data-bikeyear id='create-ad-set-year' required/>
			</div>
			<label>KM driven *</label>
			<div className="create-ad-bike-driven">
				<input type='text' className='create-ad-set-driven' data-bikedriven id='create-ad-set-driven'/>
			</div>
		</div>
	)
}
export default Bikes;