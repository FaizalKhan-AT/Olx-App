import React from 'react';


function Services () {
	let service = [
		'Electronics & Computer','Education & Classes','Drivers & Taxi',
		'Health & Beauty','Other Service'
	];

	return (
		<div className='create-ad-service-container'>
			<div className='create-ad-service-type'>
				<label >Services Type *</label>
				<span  className='down-icon-select-service'>
						<svg
			                width="24px"
			                height="24px"
			                viewBox="0 0 1024 1024"
			                data-aut-id="icon"				               
			              >
			                <path d="M85.392 277.333h60.331l366.336 366.336 366.336-366.336h60.331v60.331l-408.981 409.003h-35.307l-409.045-409.003z"></path>
			            </svg>
				</span>
				<select id='create-ad-service-select'required>
						<option disabled selected></option>
						{ 
							service.map(option => {
								return <option key={option} value={option}>{option}</option>
							})
						}
				</select>
			</div>
		</div>
	)
}

export default Services;
