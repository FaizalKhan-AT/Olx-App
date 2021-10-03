import React from 'react';


function Sports () {
	let itemType = [
		'Books','Gym & Fitness','Musical Instruments',
		'Sports Equipment','Other Hobbies'
	];

	return (
		<div className='create-ad-sports-container'>
			<div className='create-ad-sports-type'>
				<label >Item Type *</label>
				<span  className='down-icon-select-sports'>
					<svg
		                width="24px"
		                height="24px"
		                viewBox="0 0 1024 1024"
		                data-aut-id="icon"				               
		              >
		                <path d="M85.392 277.333h60.331l366.336 366.336 366.336-366.336h60.331v60.331l-408.981 409.003h-35.307l-409.045-409.003z"></path>
		            </svg>
				</span>
				<select id='create-ad-sports-select'required>
						<option disabled selected></option>
						{ 
							itemType.map(option => {
								return <option key={option} value={option}>{option}</option>
							})
						}
				</select>
			</div>
		</div>
	)
}
export default Sports;
